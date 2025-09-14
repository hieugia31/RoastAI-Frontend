import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("Verifying...");
    const navigate = useNavigate();
    const hasVerified = useRef(false);

    useEffect(() => {
        const verify = async () => {
            if (hasVerified.current) return; 
            hasVerified.current = true;      

            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/verify/${token}`,
                    {
                        method: "GET",
                        credentials: "include", 
                    }
                );
                const data = await res.json();
                console.log(res.ok,"- res.ok",data,"data")
                if (res.ok) {
                    setStatus("✅ Email verified successfully!");
                    setTimeout(() => navigate('/'), 3000);
                } else {
                    setStatus(`❌ Verification failed: ${data.message}`);
                    setTimeout(() => navigate('/login'), 3000);
                }
            } catch (err) {
                setStatus("❌ Something went wrong. Try again later.");
            }
        };
        verify();
    }, [token, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h2>{status}</h2>
            <p>You will be redirected shortly...</p>
        </div>
    );
};

export default VerifyEmail;

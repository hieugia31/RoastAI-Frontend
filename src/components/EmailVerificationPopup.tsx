interface Props {
    message: string;
    onClose: () => void;
}

const EmailVerificationPopup: React.FC<Props> = ({ message, onClose }) => {
    return (
        <div className="absolute inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-11/12 p-6 text-center">
                <h2 className="text-[#000] text-2xl font-bold mb-4 flex items-center justify-center">
                     Verify Your Email
                </h2>
                <p className="text-gray-700 text-md mb-6">{message}</p>
                <button
                    onClick={() => {
                        onClose();
                        window.location.href = "https://mail.google.com/mail/u/0/"; 
                    }}
                    className="px-6 py-2 bg-[#0e0e0efd] text-white rounded-lg font-semibold hover:bg-[#272727] focus:bg-[#3a3a3a] transition"
                >
                    Verify my email now
                </button>
            </div>
        </div>
    );
};

export default EmailVerificationPopup;

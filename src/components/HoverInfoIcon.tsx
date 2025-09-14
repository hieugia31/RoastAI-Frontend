import { useState, useRef } from 'react';

export default function HoverInfoIcon({ icon, label, onClick }: any) {
  const [showPopup, setShowPopup] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={iconRef}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      {icon}
      {showPopup && iconRef.current && (
        <div
          style={{
            position: 'fixed',
            left: iconRef.current.getBoundingClientRect().right + 8 + 'px',
            top: iconRef.current.getBoundingClientRect().top + 'px',
          }}
          className="rounded-md bg-white shadow-sm z-50"
        >
          <h4 className="text-[#757373] text-[12px] font-semibold px-2 py-1">
            {label}
          </h4>
        </div>
      )}
    </div>
  );
}

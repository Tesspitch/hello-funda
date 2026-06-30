import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

export default function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showConfirm, setShowConfirm] = useState(false);

    // อย่าโชว์ปุ่ม Back ในหน้าแรก (Home)
    if (location.pathname === '/') {
        return null;
    }

    const handleBackClick = () => {
        // เงื่อนไขพิเศษ: หน้า dashboard ให้ย้อนไป /select เท่านั้น
        if (location.pathname === '/dashboard') {
            navigate('/select');
            return;
        }

        // หน้าที่ต้องการให้ยืนยันก่อนย้อนกลับ
        if (location.pathname === '/select' || location.pathname === '/mission-equipment') {
            setShowConfirm(true);
        } else {
            navigate(-1);
        }
    };

    const confirmBack = () => {
        setShowConfirm(false);
        
        // เงื่อนไขพิเศษ: หน้า select ให้ย้อนไปหน้า inputname
        if (location.pathname === '/select') {
            navigate('/input-name');
        } else {
            navigate(-1);
        }
    };

    const cancelBack = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <button className="global-back-btn" onClick={handleBackClick} title="ย้อนกลับ">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="back-btn-icon"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* Modal ยืนยันการย้อนกลับ */}
            {showConfirm && (
                <div className="modal-overlay" onClick={cancelBack} style={{ zIndex: 10000 }}>
                    <div className="modal-card animate-pop-in" onClick={(e) => e.stopPropagation()}>
                        <div className="text-5xl mb-4">⚠️</div>
                        <p className="modal-title text-xl font-bold mb-2">ยืนยันการย้อนกลับ</p>
                        <p className="modal-subtitle text-gray-600 mb-6">
                            {location.pathname === '/mission-equipment' 
                                ? "ข้อมูลการเตรียมอุปกรณ์และการจับเวลาจะถูกยกเลิก คุณแน่ใจหรือไม่ที่จะย้อนกลับ?"
                                : "คุณแน่ใจหรือไม่ที่จะย้อนกลับไปหน้าก่อนหน้า?"}
                        </p>
                        <div className="modal-buttons flex gap-3">
                            <button className="modal-btn modal-btn-cancel flex-1 py-3 rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors" onClick={cancelBack}>
                                ยกเลิก
                            </button>
                            <button className="modal-btn modal-btn-confirm flex-1 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-md" onClick={confirmBack}>
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

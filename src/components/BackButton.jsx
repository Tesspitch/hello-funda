import { useState } from 'react';
import { useNavigate, useLocation, useBlocker } from 'react-router-dom';
import '../index.css';

export default function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // For manual UI overrides (PUSH/REPLACE navigations treated as "Back")
    const [uiPendingDest, setUiPendingDest] = useState(null);

    // อย่าโชว์ปุ่ม Back ในหน้าแรก (Home)
    const isHome = location.pathname === '/';

    // Intercept browser back button (POP) on any page except home
    const blocker = useBlocker(
        ({ historyAction, currentLocation }) => {
            if (currentLocation.pathname === '/') return false;
            return historyAction === 'POP';
        }
    );

    const handleBackClick = () => {
        // เงื่อนไขพิเศษเพื่อให้ UI Back ไปที่หน้าที่ต้องการอย่างถูกต้อง
        if (location.pathname === '/dashboard') {
            setUiPendingDest('/select');
        } else if (location.pathname === '/input-name') {
            setUiPendingDest('/');
        } else if (location.pathname === '/select') {
            setUiPendingDest('/input-name');
        } else {
            // หน้าอื่นๆ ใช้ navigate(-1) ซึ่งจะถูก useBlocker จับได้เมื่อเป็น POP
            navigate(-1);
        }
    };

    const confirmBack = () => {
        if (uiPendingDest) {
            navigate(uiPendingDest);
            setUiPendingDest(null);
        } else if (blocker.state === 'blocked') {
            blocker.proceed();
        }
    };

    const cancelBack = () => {
        if (uiPendingDest) {
            setUiPendingDest(null);
        } else if (blocker.state === 'blocked') {
            blocker.reset();
        }
    };

    const isModalOpen = uiPendingDest !== null || blocker.state === 'blocked';

    return (
        <>
            {!isHome && (
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
            )}

            {/* Modal ยืนยันการย้อนกลับ */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={cancelBack} style={{ zIndex: 10000 }}>
                    <div className="modal-card animate-pop-in" onClick={(e) => e.stopPropagation()}>
                        <div className="text-5xl mb-4">⚠️</div>
                        <p className="modal-title text-xl font-bold mb-2">ยืนยันการย้อนกลับ</p>
                        <p className="modal-subtitle text-gray-600 mb-6">
                            ข้อมูลการทำภารกิจหรือสถานะปัจจุบันอาจสูญหาย คุณแน่ใจหรือไม่ที่จะย้อนกลับ?
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

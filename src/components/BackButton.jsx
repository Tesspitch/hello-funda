import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

export default function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    // อย่าโชว์ปุ่ม Back ในหน้าแรก (Home)
    if (location.pathname === '/') {
        return null;
    }

    const handleBack = () => {
        navigate(-1); // ย้อนกลับไปหน้าที่แล้ว
    };

    return (
        <button className="global-back-btn" onClick={handleBack} title="ย้อนกลับ">
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
    );
}

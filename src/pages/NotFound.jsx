import { Link } from "react-router-dom";
import bg from '../assets/img/background1.png';
import logo from '../assets/icons/hellofunda.svg';

export default function NotFound() {
    return (
        <div 
            className="min-h-screen w-full relative flex flex-col font-sans"
            style={{ 
                backgroundImage: `url(${bg})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
                
                {/* Logo */}
                <div className="mb-8 animate-pop-in">
                    <img
                        src={logo}
                        alt="Hello Funda"
                        className="w-[200px] sm:w-[250px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)]"
                    />
                </div>

                {/* Error Card */}
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-jiggle border-t-[12px] border-[#FB8682]">
                    <div className="text-7xl mb-4">🩺</div>
                    <h1 className="text-5xl font-black text-gray-800 mb-2">404</h1>
                    <h2 className="text-xl font-bold text-[#FB8682] mb-4">อ๊ะ! ไม่พบหน้าที่คุณค้นหา</h2>
                    <p className="text-gray-600 mb-8 font-medium">
                        ดูเหมือนว่าคุณจะเดินหลงมาผิดวอร์ดนะ<br/>กลับไปเริ่มต้นที่หน้าแรกกันเถอะ!
                    </p>
                    
                    <Link 
                        to="/"
                        className="w-full py-4 rounded-full font-bold text-white shadow-md bg-gradient-to-r from-[#4A90E2] to-[#3b82f6] hover:shadow-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-wide"
                    >
                        กลับหน้าหลัก
                    </Link>
                </div>
            </div>
        </div>
    );
}

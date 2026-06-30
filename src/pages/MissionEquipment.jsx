import { useLocation, Navigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import bg from '../assets/img/background1.png';

export default function MissionEquipment() {
    const location = useLocation();
    const player = useGameStore((state) => state.player);
    
    // ดึงข้อมูลที่ส่งมาจากหน้า SelectProcedure
    const stateData = location.state;
    const proc = stateData?.proc;
    const diffId = stateData?.diffId;

    // ถ้าไม่มีข้อมูล (ผู้ใช้พิมพ์ URL เข้ามาตรงๆ) ให้เด้งกลับไปหน้าเลือกหัตถการ
    if (!proc) {
        return <Navigate to="/select" replace />;
    }

    return (
        <div 
            className="min-h-screen w-full relative flex flex-col"
            style={{ 
                backgroundImage: `url(${bg})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-24 px-4 w-full max-w-4xl mx-auto h-full">
                
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 w-full border-4" style={{ borderColor: proc.color }}>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        
                        {/* Proc Icon */}
                        <div 
                            className="w-24 h-24 rounded-2xl flex items-center justify-center p-4 shadow-md"
                            style={{ backgroundColor: proc.bgLight }}
                        >
                            <img src={proc.icon} alt={proc.name} className="w-full h-full object-contain" />
                        </div>

                        {/* Proc Details */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: proc.color }}>
                                {proc.name} <span className="text-gray-500 text-xl font-semibold">({proc.nameTh})</span>
                            </h1>
                            <p className="text-gray-600 mb-4">{proc.desc}</p>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-gray-100 text-gray-700">
                                    ระดับ: {diffId === 'intermediate' ? 'Intermediate 🌟🌟' : 'Advance 🌟🌟🌟'}
                                </span>
                                
                                {player?.id && (
                                    <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-orange-100 text-orange-600 border border-orange-200">
                                        Student ID: {player.id}
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ต่อไปก็เป็นส่วนของการเตรียมอุปกรณ์... (ลบ Header เก่าออก) */}
                <div className="mt-8 bg-white/90 rounded-2xl p-6 w-full shadow-md text-center">
                    <h2 className="text-xl font-bold text-gray-700">ส่วนของการเตรียมอุปกรณ์กำลังจะมา...</h2>
                </div>

            </div>
        </div>
    );
}
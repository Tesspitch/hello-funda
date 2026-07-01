import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import bg from '../assets/img/background1.png';

export default function MissionSequence() {
    const location = useLocation();
    const stateData = location.state;
    const proc = stateData?.proc;

    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // จำลองการโหลดข้อมูลก่อนเริ่มด่าน 2
    useEffect(() => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => setIsLoading(false), 400);
            }
            setLoadingProgress(progress);
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // ถ้าไม่มีข้อมูลหัตถการ ให้กลับไปหน้าแรก
    if (!proc) {
        return <Navigate to="/select" replace />;
    }

    // หน้าจอ Loading
    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md px-4">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-6 border-4 border-blue-100 border-t-[#3b82f6] rounded-full animate-spin shadow-sm"></div>
                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2 text-center">กำลังเตรียมภารกิจจัดลำดับ...</h2>
                <p className="text-gray-500 mb-6 text-center text-sm md:text-base">รอสักครู่ ระบบกำลังจัดเตรียมข้อมูลขั้นตอนการทำหัตถการ</p>
                <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-[#4A90E2] to-[#3b82f6] transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                    ></div>
                </div>
                <p className="mt-2 text-sm font-bold text-[#3b82f6]">{loadingProgress}%</p>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen w-full relative flex flex-col font-sans"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 flex flex-col items-center pt-24 pb-10 px-4 w-full max-w-5xl mx-auto h-full">
                <div className="w-full flex justify-between items-center bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm mb-4 border-2" style={{ borderColor: proc.color }}>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold" style={{ color: proc.color }}>{proc.name}</span>
                        <span className="text-gray-500 font-medium hidden md:inline">({proc.nameTh})</span>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] shadow-xl w-full p-6 md:p-8 flex flex-col items-center justify-center text-center border border-blue-50 py-20">
                    <h1 className="text-4xl font-bold text-[#1e3a8a] mb-4">Mission 2 : จัดลำดับขั้นตอน</h1>
                    <p className="text-gray-600 text-lg">เตรียมพบกับภารกิจนี้เร็วๆ นี้...</p>
                </div>
            </div>
        </div>
    );
}
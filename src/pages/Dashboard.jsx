import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import bg from '../assets/img/background1.png';
import logo from '../assets/icons/hellofunda.svg';
import ngIcon from '../assets/icons/ng.svg';
import suctionIcon from '../assets/icons/suction.svg';
import foleyIcon from '../assets/icons/foley.svg';

export default function Dashboard() {
    const navigate = useNavigate();
    const { player, procedures } = useGameStore();

    // Map icons
    const icons = {
        ng_tube: ngIcon,
        suction: suctionIcon,
        foley_catheter: foleyIcon
    };

    const procedureList = Object.values(procedures);

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
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-24 pb-12 px-4 w-full max-w-4xl mx-auto h-full">

                {/* Header Section */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={logo}
                        alt="Hello Funda"
                        className="w-[180px] md:w-[220px] mb-4 drop-shadow-md animate-logo-float"
                    />
                    <div className="bg-white/90 backdrop-blur-sm px-8 py-3 rounded-full shadow-md border-2 border-blue-100">
                        <span className="text-gray-500 font-bold mr-2">Student ID:</span>
                        <span className="text-[#FB8682] font-black text-xl tracking-wider">{player?.id || "N/A"}</span>
                    </div>
                </div>

                {/* Scoreboard Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl w-full p-6 md:p-10 border border-blue-50 relative">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                        <h2 className="text-2xl md:text-3xl font-black text-[#1e3a8a] flex items-center gap-3">
                            สรุปผลคะแนนภารกิจ
                        </h2>
                    </div>

                    {/* Missions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {procedureList.map((proc) => {
                            const isCompleted = proc.status === "completed";
                            return (
                                <div
                                    key={proc.id}
                                    className={`relative rounded-3xl p-6 border-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 ${isCompleted ? 'bg-[#f0f9ff] border-[#4A90E2] shadow-lg' : 'bg-gray-50 border-gray-200 opacity-80'}`}
                                >
                                    {/* Status Badge */}
                                    <div className={`absolute -top-4 px-5 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-colors ${isCompleted ? 'bg-green-500' : 'bg-gray-400'}`}>
                                        {isCompleted ? 'สำเร็จแล้ว ✅' : 'ยังไม่ได้ทำ ⏳'}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm p-4 mb-4 mt-3 border border-gray-100">
                                        <img src={icons[proc.id]} alt={proc.name} className="w-full h-full object-contain" />
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-800 mb-4">{proc.name}</h3>

                                    {/* Score Section */}
                                    <div className="w-full bg-white rounded-2xl p-4 shadow-sm mt-auto border border-gray-50">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">คะแนนรวม</p>
                                        {isCompleted ? (
                                            <div className="flex items-end justify-center gap-1">
                                                <span className="text-4xl font-black text-[#FB8682] leading-none">{proc.score}</span>
                                            </div>
                                        ) : (
                                            <span className="text-2xl font-bold text-gray-300 leading-none">-</span>
                                        )}
                                    </div>

                                    {/* Badge Earned */}
                                    {proc.badgeEarned && (
                                        <div className="absolute -bottom-4 bg-[#facc15] text-white font-bold px-5 py-1.5 rounded-full border-2 border-white shadow-md text-sm animate-pop-in flex items-center gap-1">
                                            <span>⭐</span> ผ่านเกณฑ์
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </div>
    );
}
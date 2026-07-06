import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import bg from '../assets/img/background1.png';
import logo from '../assets/icons/hellofunda.svg';
import { proceduresMetaData } from "../store/proceduresData";

export default function Dashboard() {
    const navigate = useNavigate();
    const { player, procedures } = useGameStore();
    const [selectedProc, setSelectedProc] = useState(null);

    const procedureList = Object.values(procedures).map(p => {
        const meta = proceduresMetaData.find(m => m.id === p.id) || {};
        return { ...p, ...meta };
    });

    const closeModal = () => setSelectedProc(null);

    return (
        <div className="min-h-screen w-full relative flex flex-col font-sans" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            {/* Modal */}
            {selectedProc && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-pop-in border border-gray-100 scrollbar-hide">
                        {/* Modal Header */}
                        <div className="bg-[#FB8682] p-5 md:p-6 text-white flex justify-between items-center relative overflow-hidden shrink-0">
                            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-pattern"></div>
                            <div className="flex items-center gap-3 md:gap-4 relative z-10">
                                <div className="bg-white rounded-full p-2 w-12 h-12 md:w-14 md:h-14 shadow-sm border-2 border-white/50 shrink-0">
                                    <img src={selectedProc.icon} alt="icon" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold leading-tight">{selectedProc.name}</h2>
                                    <p className="text-pink-100 text-xs md:text-sm tracking-wide">รายละเอียดคะแนนแต่ละระดับ</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="text-white hover:text-pink-200 text-3xl md:text-4xl leading-none transition-colors relative z-10 shrink-0">&times;</button>
                        </div>
                        
                        {/* Modal Content - Two Columns */}
                        <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 bg-[#f8fafc]">
                            
                            {/* Intermediate Column */}
                            <div className="bg-white p-4 md:p-5 rounded-2xl border-2 border-pink-100 shadow-sm flex flex-col">
                                <div className="flex flex-col items-center mb-4 md:mb-5 pb-3 border-b-2 border-pink-50">
                                    <span className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">Level</span>
                                    <h3 className="text-lg md:text-xl font-bold text-pink-600">ระดับกลาง (Intermediate)</h3>
                                </div>
                                <div className="flex justify-between mb-3 text-sm md:text-base">
                                    <span className="text-gray-500 font-medium">สถานะ:</span>
                                    <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${selectedProc.intermediate.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {selectedProc.intermediate.status === 'completed' ? 'สำเร็จแล้ว' : 'ยังไม่ได้ทำ'}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm md:text-base">
                                    <span className="text-gray-600">Pre-test:</span>
                                    <span className="font-bold text-gray-800">{selectedProc.intermediate.preTestScore} <span className="text-gray-400 text-xs md:text-sm">/ 10</span></span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm md:text-base">
                                    <span className="text-gray-600">เตรียมอุปกรณ์:</span>
                                    <span className="font-bold text-gray-800">{selectedProc.intermediate.equipmentScore} <span className="text-gray-400 text-xs md:text-sm">/ 40</span></span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm md:text-base">
                                    <span className="text-gray-600">จัดลำดับ:</span>
                                    <span className="font-bold text-gray-800">{selectedProc.intermediate.sequenceScore} <span className="text-gray-400 text-xs md:text-sm">/ 40</span></span>
                                </div>
                                <div className="flex justify-between mb-5 text-sm md:text-base">
                                    <span className="text-gray-600">Post-test:</span>
                                    <span className="font-bold text-gray-800">{selectedProc.intermediate.postTestScore} <span className="text-gray-400 text-xs md:text-sm">/ 10</span></span>
                                </div>
                                <div className="flex justify-between items-end pt-4 border-t-2 border-dashed border-gray-100 mt-auto">
                                    <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Total</span>
                                    <span className="text-3xl md:text-4xl font-black text-[#FB8682] leading-none">{selectedProc.intermediate.score}</span>
                                </div>
                            </div>

                            {/* Advance Column */}
                            <div className="bg-white p-4 md:p-5 rounded-2xl border-2 border-purple-100 shadow-sm flex flex-col relative overflow-hidden">
                                <div className="flex flex-col items-center mb-4 md:mb-5 pb-3 border-b-2 border-purple-50">
                                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">Level</span>
                                    <h3 className="text-lg md:text-xl font-bold text-purple-700">ระดับยาก (Advance)</h3>
                                </div>
                                <div className="flex justify-between mb-3 text-sm md:text-base">
                                    <span className="text-gray-500 font-medium">สถานะ:</span>
                                    <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${selectedProc.advance.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {selectedProc.advance.status === 'completed' ? 'สำเร็จแล้ว' : 'ยังไม่ได้ทำ'}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm md:text-base">
                                    <span className="text-gray-600">Pre-test:</span>
                                    <span className="font-bold text-gray-800">{selectedProc.advance.preTestScore} <span className="text-gray-400 text-xs md:text-sm">/ 10</span></span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm md:text-base">
                                    <span className="text-gray-600">เตรียมอุปกรณ์:</span>
                                    <span className="font-bold text-gray-800">{selectedProc.advance.equipmentScore} <span className="text-gray-400 text-xs md:text-sm">/ 40</span></span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm md:text-base">
                                    <span className="text-gray-600">จัดลำดับ:</span>
                                    <span className="font-bold text-gray-800">{selectedProc.advance.sequenceScore} <span className="text-gray-400 text-xs md:text-sm">/ 40</span></span>
                                </div>
                                <div className="flex justify-between mb-5 text-sm md:text-base">
                                    <span className="text-gray-600">Post-test:</span>
                                    <span className="font-bold text-gray-800">{selectedProc.advance.postTestScore} <span className="text-gray-400 text-xs md:text-sm">/ 10</span></span>
                                </div>
                                <div className="flex justify-between items-end pt-4 border-t-2 border-dashed border-gray-100 mt-auto">
                                    <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Total</span>
                                    <span className="text-3xl md:text-4xl font-black text-[#FB8682] leading-none">{selectedProc.advance.score}</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-24 pb-12 px-4 w-full max-w-5xl mx-auto h-full">

                {/* Header Section */}
                <div className="flex flex-col items-center mb-8">
                    <img src={logo} alt="Hello Funda" className="w-[180px] md:w-[220px] mb-4 drop-shadow-md animate-logo-float" />
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="bg-white/90 backdrop-blur-sm px-8 py-3 rounded-full shadow-md border-2 border-rose-100">
                            <span className="text-gray-500 font-bold mr-2">Student ID:</span>
                            <span className="text-[#FB8682] font-black text-xl tracking-wider">{player?.id || "N/A"}</span>
                        </div>
                        {/* ปุ่มตรวจสอบผลการสอบ */}
                        <Link
                            to="/get-score"
                            className="bg-[#FB8682] text-white px-6 py-3 rounded-full shadow-md font-bold text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 border-2 border-white/50"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            ตรวจสอบประวัติการสอบ
                        </Link>
                    </div>
                </div>

                {/* Scoreboard Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl w-full p-6 md:p-10 border border-rose-50 relative">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                        <h2 className="text-2xl md:text-3xl font-black text-rose-900 flex items-center gap-3">
                            สรุปผลคะแนนภารกิจ
                        </h2>
                    </div>

                    {/* Missions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {procedureList.map((proc) => {
                            const isIntermediateDone = proc.intermediate.status === "completed";
                            const isAdvanceDone = proc.advance.status === "completed";
                            const hasBadge = proc.intermediate.badgeEarned || proc.advance.badgeEarned;
                            const isAnyDone = isIntermediateDone || isAdvanceDone;

                            return (
                                <div
                                    key={proc.id}
                                    onClick={() => setSelectedProc(proc)}
                                    className={`relative rounded-3xl p-6 border-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 cursor-pointer group ${isAnyDone ? 'bg-[#f0f9ff] border-[#4A90E2] shadow-lg hover:shadow-[#4A90E2]/30' : 'bg-gray-50 border-gray-200 opacity-90 hover:opacity-100 hover:border-gray-300 shadow-sm'}`}
                                >
                                    {/* Status Badge */}
                                    <div className={`absolute -top-4 px-5 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-colors flex items-center gap-1.5 ${isAnyDone ? 'bg-green-500' : 'bg-gray-400'}`}>
                                        {isAnyDone ? (
                                            <>
                                                <span>ทำภารกิจแล้ว</span>
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                            </>
                                        ) : (
                                            <>
                                                <span>ยังไม่ได้ทำ</span>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </>
                                        )}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm p-4 mb-4 mt-3 border border-gray-100 transition-transform group-hover:scale-105">
                                        <img src={proc.icon} alt={proc.name} className="w-full h-full object-contain" />
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-800 mb-5">{proc.name}</h3>

                                    <div className="w-full bg-white rounded-xl py-3 px-2 shadow-sm mt-auto border border-rose-100 text-[#FB8682] font-bold text-sm transition-colors group-hover:bg-rose-50 flex items-center justify-center gap-2">
                                        <span>คลิกดูรายละเอียด</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                                    </div>

                                    {/* Badge Earned */}
                                    {hasBadge && (
                                        <div className="absolute -bottom-4 bg-[#facc15] text-white font-bold px-5 py-1.5 rounded-full border-2 border-white shadow-md text-sm animate-pop-in flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            <span>ผ่านเกณฑ์</span>
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
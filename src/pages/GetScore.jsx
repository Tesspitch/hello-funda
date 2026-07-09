import React, { useState } from 'react';
import bg from '../assets/img/background1.png';
import logo from '../assets/icons/hellofunda.svg';

const StudentExamHistory = () => {
    const [studentId, setStudentId] = useState('');
    const [examData, setExamData] = useState(null);
    const [selectedRound, setSelectedRound] = useState(null);
    const [loading, setLoading] = useState(false);

    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxhowzkErQSJr0zWnGZs2_EikB0veV3QnrO_yhHs43Vc-KaixxR7NiAgpuX0wKc87TTSQ/exec';

    const mockLeaderboard = [
        { rank: 1, studentId: "65123456", score: 100, time: 45, procedure: "Suction" },
        { rank: 2, studentId: "65234567", score: 98, time: 50, procedure: "Foley Catheter" },
        { rank: 3, studentId: "65345678", score: 95, time: 48, procedure: "NG Tube" },
        { rank: 4, studentId: "65456789", score: 92, time: 60, procedure: "Suction" },
        { rank: 5, studentId: "65567890", score: 90, time: 55, procedure: "Foley Catheter" },
        { rank: 6, studentId: "65678901", score: 88, time: 65, procedure: "NG Tube" },
        { rank: 7, studentId: "65789012", score: 85, time: 70, procedure: "Suction" },
        { rank: 8, studentId: "65890123", score: 82, time: 75, procedure: "Foley Catheter" },
        { rank: 9, studentId: "65901234", score: 80, time: 80, procedure: "NG Tube" },
        { rank: 10, studentId: "65012345", score: 78, time: 85, procedure: "Suction" },
    ];

    React.useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${scriptUrl}?action=leaderboard`);
                const data = await response.json();

                if (data.status === 'success' && data.data) {
                    setLeaderboard(data.data);
                } else {
                    // Fallback to mock data if API is not updated yet
                    setLeaderboard(mockLeaderboard);
                }
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
                setLeaderboard(mockLeaderboard);
            } finally {
                setLoadingLeaderboard(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const fetchHistory = async () => {
        if (!studentId) return;
        setLoading(true);
        setExamData(null);
        setSelectedRound(null);

        try {
            const response = await fetch(`${scriptUrl}?studentId=${studentId}`);
            const data = await response.json();

            if (data.status === 'success') {
                setExamData(data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (totalSeconds) => {
        if (totalSeconds === undefined || totalSeconds === null) return '-';
        const num = Number(totalSeconds);
        if (isNaN(num)) return totalSeconds; // Fallback if it's already formatted or invalid
        const mins = Math.floor(num / 60);
        const secs = Math.floor(num % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen w-full relative flex flex-col font-sans" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            <div className="relative z-10 flex flex-col items-center pt-24 pb-12 px-4 w-full max-w-5xl mx-auto h-full">

                {/* Header Section */}
                <div className="flex flex-col items-center mb-8">
                    <img src={logo} alt="Hello Funda" className="w-[180px] md:w-[220px] mb-4 drop-shadow-md animate-logo-float" />
                </div>

                {/* Scoreboard Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl w-full max-w-3xl p-6 md:p-10 border border-rose-50 relative">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                        <h2 className="text-2xl md:text-3xl font-black text-rose-900 flex items-center gap-3">
                            <svg className="w-8 h-8 text-[#FB8682]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            ตรวจสอบผลการสอบ
                        </h2>
                    </div>

                    {/* ส่วนค้นหา */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="กรอกรหัสนิสิต"
                            className="flex-1 border-2 border-rose-100 bg-rose-50/30 p-3 rounded-2xl focus:outline-none focus:border-[#FB8682] focus:ring-2 focus:ring-[#FB8682]/20 text-gray-700 text-lg transition-all"
                        />
                        <button
                            onClick={fetchHistory}
                            disabled={loading || !studentId}
                            className="bg-[#FB8682] text-white px-8 py-3 rounded-2xl shadow-md font-bold text-lg hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    กำลังค้นหา...
                                </>
                            ) : 'ค้นหา'}
                        </button>
                    </div>

                    {/* ส่วน Leaderboard (แสดงเมื่อยังไม่ได้ค้นหา) */}
                    {!examData && !loading && (
                        <div className="animate-pop-in">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-rose-800 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Leaderboard (Top 10)
                                </h3>
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">อันดับคะแนนสูงสุด</span>
                            </div>

                            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[500px]">
                                        <thead>
                                            <tr className="bg-rose-50 text-rose-800 text-sm">
                                                <th className="p-4 font-bold text-center w-16">อันดับ</th>
                                                <th className="p-4 font-bold">รหัสนิสิต</th>
                                                <th className="p-4 font-bold">หัตถการ</th>
                                                <th className="p-4 font-bold text-center">เวลา</th>
                                                <th className="p-4 font-bold text-right">คะแนนรวม</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loadingLeaderboard ? (
                                                <tr>
                                                    <td colSpan="5" className="p-8 text-center text-gray-500">กำลังโหลดข้อมูล Leaderboard...</td>
                                                </tr>
                                            ) : leaderboard.map((item, idx) => (
                                                <tr key={idx} className="border-b border-gray-50 hover:bg-rose-50/50 transition-colors">
                                                    <td className="p-4 text-center">
                                                        {item.rank === 1 ? (
                                                            <div className="w-8 h-8 mx-auto bg-gradient-to-br from-yellow-300 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold shadow-md shadow-yellow-200/50">1</div>
                                                        ) : item.rank === 2 ? (
                                                            <div className="w-8 h-8 mx-auto bg-gradient-to-br from-gray-300 to-gray-400 text-white rounded-full flex items-center justify-center font-bold shadow-md shadow-gray-200/50">2</div>
                                                        ) : item.rank === 3 ? (
                                                            <div className="w-8 h-8 mx-auto bg-gradient-to-br from-orange-300 to-orange-400 text-white rounded-full flex items-center justify-center font-bold shadow-md shadow-orange-200/50">3</div>
                                                        ) : (
                                                            <div className="w-8 h-8 mx-auto text-gray-500 flex items-center justify-center font-bold bg-gray-50 rounded-full">{item.rank}</div>
                                                        )}
                                                    </td>
                                                    <td className="p-4 font-bold text-gray-700">{item.studentId}</td>
                                                    <td className="p-4 text-gray-500 text-sm">{item.procedure}</td>
                                                    <td className="p-4 text-center text-gray-500 text-sm">{formatTime(item.time)}</td>
                                                    <td className="p-4 text-right font-black text-[#FB8682] text-lg">{item.score}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* ส่วนแสดงภาพรวม (สอบกี่ครั้ง) */}
                    {examData && (
                        <div className="mb-6 animate-pop-in">
                            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                                <div className="text-center sm:text-left">
                                    <p className="text-gray-500 font-medium mb-1">รหัสนิสิต</p>
                                    <p className="text-2xl font-black text-rose-700">{examData.studentId}</p>
                                </div>
                                <div className="text-center sm:text-right">
                                    <p className="text-gray-500 font-medium mb-1">เข้าสอบทั้งหมด</p>
                                    <p className="text-2xl font-black text-[#FB8682]">{examData.totalAttempts} ครั้ง</p>
                                </div>
                            </div>

                            {examData.totalAttempts > 0 && (
                                <div className="mb-6">
                                    <p className="font-bold text-gray-700 mb-3">เลือกรอบการสอบเพื่อดูรายละเอียด:</p>
                                    <div className="flex flex-wrap gap-3">
                                        {examData.history.map((attempt) => (
                                            <button
                                                key={attempt.round}
                                                onClick={() => setSelectedRound(attempt)}
                                                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${selectedRound?.round === attempt.round
                                                    ? 'bg-[#FB8682] text-white shadow-pink-200 border-none'
                                                    : 'bg-white text-gray-600 border-2 border-gray-100 hover:border-pink-300 hover:text-pink-500'
                                                    }`}
                                            >
                                                รอบที่ {attempt.round}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ส่วนแสดงรายละเอียดของรอบที่เลือก */}
                    {selectedRound && (
                        <div className="bg-white rounded-2xl p-6 border-2 border-rose-100 shadow-sm mt-4 animate-pop-in relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FB8682] to-pink-500"></div>
                            <h2 className="text-xl font-bold text-rose-800 mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                รายละเอียดการสอบ (รอบที่ {selectedRound.round})
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">หัตถการ</p>
                                        <p className="font-bold text-gray-800 text-xl">{selectedRound.procedureName}</p>
                                    </div>
                                    <div className="mt-2 sm:mt-0 text-left sm:text-right">
                                        <p className="text-gray-500 text-sm font-medium mb-1">ระดับความยาก</p>
                                        <span className="bg-pink-100 text-pink-700 font-bold px-3 py-1 rounded-full text-sm">
                                            {selectedRound.difficulty === 'advance' ? 'Advance (ยาก)' : selectedRound.difficulty === 'intermediate' ? 'Intermediate (กลาง)' : selectedRound.difficulty || 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <p className="text-gray-500 text-sm font-medium mb-2">รายละเอียดคะแนน</p>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-600 text-sm">Pre-test:</span>
                                        <span className="font-bold">{selectedRound.preTestScore !== undefined ? selectedRound.preTestScore : '-'}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-600 text-sm">เตรียมอุปกรณ์:</span>
                                        <span className="font-bold">{selectedRound.equipmentScore !== undefined ? selectedRound.equipmentScore : '-'}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-600 text-sm">จัดลำดับขั้นตอน:</span>
                                        <span className="font-bold">{selectedRound.sequenceScore !== undefined ? selectedRound.sequenceScore : '-'}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600 text-sm">Post-test:</span>
                                        <span className="font-bold">{selectedRound.postTestScore !== undefined ? selectedRound.postTestScore : '-'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                        <span className="text-gray-800 font-bold">คะแนนรวม:</span>
                                        <span className="font-black text-[#FB8682] text-2xl">{selectedRound.totalScore}</span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col h-full justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-2">รายละเอียดเวลา</p>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-gray-600 text-sm">เวลาเตรียมอุปกรณ์:</span>
                                            <span className="font-bold">{selectedRound.equipmentTimeSpent !== undefined ? formatTime(selectedRound.equipmentTimeSpent) : '-'} นาที</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600 text-sm">เวลาจัดลำดับขั้นตอน:</span>
                                            <span className="font-bold">{selectedRound.sequenceTimeSpent !== undefined ? formatTime(selectedRound.sequenceTimeSpent) : '-'} นาที</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                            <span className="text-gray-800 font-bold">เวลาที่ใช้รวม:</span>
                                            <span className="font-bold text-gray-800 text-lg">{selectedRound.totalTimeSpent !== undefined ? formatTime(selectedRound.totalTimeSpent) : '-'} <span className="text-gray-500 font-normal text-sm">นาที</span></span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                                        <span className="text-gray-500 text-sm font-medium">สถานะ</span>
                                        <span className={`font-black text-xl ${selectedRound.isPass === 'ผ่าน' ? 'text-green-500' : 'text-rose-500'}`}>
                                            {selectedRound.isPass}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentExamHistory;
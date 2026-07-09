import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import bg from '../assets/img/background1.png';

const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    let videoId = null;
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
        return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&fs=1` : null;
};

export default function VideoReview() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const stateData = location.state;
    const proc = stateData?.proc;
    const diffId = stateData?.diffId;

    if (!proc) {
        return <Navigate to="/select" replace />;
    }

    const videos = proc.videos?.length > 0 ? proc.videos : (proc.video ? [{ title: proc.name, path: proc.video }] : []);
    const currentVideo = videos[currentVideoIndex];
    const ytEmbedUrl = currentVideo ? getYouTubeEmbedUrl(currentVideo.path) : null;

    const handleNext = () => {
        navigate("/quiz", { state: { type: 'post', proc, diffId }, replace: true });
    };

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
            <div className="relative z-10 flex flex-col items-center pt-24 pb-12 px-4 w-full max-w-5xl mx-auto h-full flex-1">
                {/* Top Info Bar */}
                <div className="w-full flex justify-between items-center bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm mb-6 border-2" style={{ borderColor: proc.color }}>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold" style={{ color: proc.color }}>{proc.name}</span>
                        <span className="text-gray-500 font-medium hidden md:inline">({proc.nameTh})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-700">
                            Video Review
                        </span>
                    </div>
                </div>

                <div className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl w-full p-6 md:p-10 border border-gray-100 flex flex-col items-center flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">วิดีโอทบทวนขั้นตอนการทำหัตถการ</h2>
                    
                    {videos.length > 1 && (
                        <div className="relative w-full max-w-[280px] mx-auto mb-8">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center justify-between px-6 py-3 bg-white border-2 rounded-2xl focus:outline-none shadow-sm hover:shadow-md transition-all text-gray-800 font-bold"
                                style={{ borderColor: isDropdownOpen ? proc.color : '#e5e7eb' }}
                            >
                                <span className="flex-1 text-center" style={{ color: proc.color }}>
                                    {currentVideo?.title}
                                </span>
                                <svg 
                                    className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                                    style={{ color: proc.color }}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            {isDropdownOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsDropdownOpen(false)}
                                    ></div>
                                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden transform origin-top transition-all py-2">
                                        {videos.map((vid, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setCurrentVideoIndex(idx);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-center px-4 py-3 font-bold transition-colors ${
                                                    currentVideoIndex === idx 
                                                    ? 'bg-opacity-10' 
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                                style={currentVideoIndex === idx ? { backgroundColor: `${proc.color}15`, color: proc.color } : {}}
                                            >
                                                {vid.title}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Video Placeholder or Player */}
                    <div className="w-full max-w-4xl bg-black rounded-2xl flex items-center justify-center aspect-video mb-10 border-4 border-dashed border-gray-300 relative overflow-hidden group select-none" onContextMenu={(e) => e.preventDefault()}>
                        {currentVideo?.path ? (
                            <>
                                {ytEmbedUrl ? (
                                    <iframe 
                                        key={currentVideo.path}
                                        src={ytEmbedUrl} 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded-xl"
                                    ></iframe>
                                ) : (
                                    <video 
                                        key={currentVideo.path}
                                        src={currentVideo.path} 
                                        controls 
                                        className="w-full h-full object-cover rounded-xl"
                                        controlsList="nodownload"
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-gray-200/50 flex flex-col items-center justify-center text-gray-500 transition-colors group-hover:bg-gray-200/70">
                                <svg className="w-20 h-20 mx-auto mb-4 text-gray-400 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <p className="font-bold text-xl md:text-2xl mb-2 text-gray-600">วิดีโอจะถูกเพิ่มในภายหลัง</p>
                                <p className="text-md text-gray-500 bg-white/50 px-4 py-1 rounded-full shadow-sm">{proc.name}</p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex w-full max-w-sm mx-auto mt-auto">
                        <button 
                            onClick={handleNext}
                            className="w-full py-4 rounded-xl font-bold text-white transition-all shadow-md hover:scale-105 active:scale-95 text-lg flex items-center justify-center gap-2"
                            style={{ backgroundColor: proc.color }}
                        >
                            ไปทำ Post-test
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

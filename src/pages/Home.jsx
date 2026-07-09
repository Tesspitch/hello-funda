import { Link } from 'react-router-dom';
import startBtn from '../assets/icons/startBtn.svg';
import nurse from '../assets/img/nurse.svg';
import logo from '../assets/icons/hellofunda.svg';
import bg from '../assets/img/background1.png';
import numsuenLogo from '../assets/icons/NUMSUENLOGO.webp';

export default function Home() {
    return (
        <div
            className="relative w-full h-screen h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* โลโก้ hellofunda */}
            <div className="z-20 animate-logo-float mb-[-30px] sm:mb-[-40px] md:mb-[-50px] lg:mb-[-60px] [@media(max-height:500px)]:mb-[-10px] [@media(max-height:500px)]:md:mb-[-20px]">
                <img
                    src={logo}
                    alt="Hello Funda"
                    className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[550px] [@media(max-height:500px)]:w-[200px] [@media(max-height:500px)]:md:w-[250px] max-w-[90vw] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)]"
                />
            </div>

            {/* ตัวละครพยาบาล */}
            <div className="z-10 pointer-events-none">
                <img
                    src={nurse}
                    alt="nurse"
                    className="h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[65vh] [@media(max-height:500px)]:h-[40vh] [@media(max-height:500px)]:md:h-[50vh] w-auto max-w-[90vw] object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-nurse-breathe"
                />
            </div>

            {/* ปุ่ม START */}
            <div className="z-30 mt-[-40px] sm:mt-[-50px] md:mt-[-60px] lg:mt-[-80px] [@media(max-height:500px)]:mt-[-10px] [@media(max-height:500px)]:md:mt-[-20px]">
                <Link
                    to="/input-name"
                    className="relative block transition-transform duration-300 hover:scale-110 active:scale-95 group"
                >
                    <img
                        src={startBtn}
                        alt="START"
                        className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] [@media(max-height:500px)]:w-[160px] [@media(max-height:500px)]:md:w-[200px] max-w-[80vw] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] cursor-pointer animate-btn-pulse"
                    />
                    {/* Shine Effect Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            WebkitMaskImage: `url(${startBtn})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            maskImage: `url(${startBtn})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center'
                        }}
                    >
                        <div className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 transform -skew-x-12 animate-shine"></div>
                    </div>
                </Link>
            </div>

            {/* ปุ่มประวัติการสอบ (วงกลมเล็กมุมขวาล่าง) */}
            <Link
                to="/get-score"
                title="ตรวจสอบผลการสอบ"
                className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 bg-[#FB8682] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#f4605b] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/50"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </Link>
            {/* License Text (มุมซ้ายล่าง) */}
            <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 text-white/90 font-medium text-xs sm:text-sm drop-shadow-md bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none border border-white/10 flex items-center gap-2">
                <img src={numsuenLogo} alt="NUMSUEN" className="h-8 sm:h-9 w-auto object-contain" />
                <span>คณะพยาบาลศาสตร์ มหาวิทยาลัยมหาสารคาม</span>
            </div>
        </div>
    );
}
import { Link } from 'react-router-dom';
import startBtn from '../assets/icons/startBtn.svg';
import nurse from '../assets/img/nurse.svg';
import logo from '../assets/icons/hellofunda.svg';
import bg from '../assets/img/background1.png';

export default function Home() {
    return (
        <div
            className="relative w-full h-screen h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* โลโก้ hellofunda */}
            <div className="z-20 animate-logo-float mb-[-30px] sm:mb-[-40px] md:mb-[-50px] lg:mb-[-60px]">
                <img
                    src={logo}
                    alt="Hello Funda"
                    className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[550px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)]"
                />
            </div>

            {/* ตัวละครพยาบาล */}
            <div className="z-10 pointer-events-none">
                <img
                    src={nurse}
                    alt="nurse"
                    className="h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[65vh] w-auto object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-nurse-breathe"
                />
            </div>

            {/* ปุ่ม START */}
            <div className="z-30 mt-[-40px] sm:mt-[-50px] md:mt-[-60px] lg:mt-[-80px]">
                <Link
                    to="/input-name"
                    className="block transition-transform duration-300 hover:scale-110 active:scale-95"
                >
                    <img
                        src={startBtn}
                        alt="START"
                        className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] cursor-pointer animate-btn-pulse"
                    />
                </Link>
            </div>
        </div>
    );
}
import { Link } from 'react-router-dom';
import startBtn from '../assets/icons/startBtn.svg';
import nurse from '../assets/img/nurse.svg';
import logo from '../assets/icons/hellofunda.svg';
import bg from '../assets/img/background1.png';

export default function Home() {
    return (
        <div
            className="relative w-full h-screen h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >

            {/* ========================================= */}
            {/* === MOBILE / TABLET (< lg): Stack แนวตั้ง === */}
            {/* ========================================= */}
            <div className="flex lg:hidden flex-col items-center justify-center h-full px-4 gap-15">

                {/* โลโก้ hellofunda */}
                <img
                    src={logo}
                    alt="Hello Funda"
                    className="w-[323px] sm:w-[425px] md:w-[553px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-logo-float translate-x-4"
                />

                {/* ตัวละครพยาบาล */}
                <img
                    src={nurse}
                    alt="nurse"
                    className="h-[48vh] sm:h-[55vh] md:h-[60vh] w-auto object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-nurse-breathe"
                />

                {/* ปุ่ม START */}
                <Link
                    to="/input-name"
                    className="transition-transform duration-300 hover:scale-110 active:scale-95"
                >
                    <img
                        src={startBtn}
                        alt="START"
                        className="w-[280px] sm:w-[340px] md:w-[400px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] cursor-pointer animate-btn-pulse"
                    />
                </Link>
            </div>

            {/* ========================================= */}
            {/* === DESKTOP (lg+): Layout ซ้าย-ขวา === */}
            {/* ========================================= */}

            {/* ตัวละครพยาบาล: ซ้ายของกึ่งกลาง, ขอบล่างล้นจอ */}
            <div className="hidden lg:flex absolute bottom-[-8%] left-[8%] xl:left-[10%] h-full items-end pointer-events-none">
                <img
                    src={nurse}
                    alt="nurse"
                    className="h-[105vh] xl:h-[115vh] w-auto object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-nurse"
                />
            </div>

            {/* โลโก้ + ปุ่ม: ขวาของกึ่งกลาง, จัดกลางแนวตั้ง */}
            <div className="hidden lg:flex absolute top-1/2 right-[22%] xl:right-[20%] -translate-y-1/2 flex-col items-center gap-1">

                {/* โลโก้ hellofunda */}
                <img
                    src={logo}
                    alt="Hello Funda"
                    className="w-[500px] xl:w-[620px] 2xl:w-[720px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-logo"
                />

                {/* ปุ่ม START */}
                <Link
                    to="/input-name"
                    className="transition-transform duration-300 hover:scale-110 active:scale-95"
                >
                    <img
                        src={startBtn}
                        alt="START"
                        className="w-[280px] xl:w-[340px] 2xl:w-[400px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] cursor-pointer animate-btn"
                    />
                </Link>
            </div>

        </div>
    );
}
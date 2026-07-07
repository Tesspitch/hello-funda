import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/pages/SimulationScore.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add html2canvas import
content = content.replace(
    'import { ethicsData } from "../store/proceduresData";',
    'import { ethicsData } from "../store/proceduresData";\nimport html2canvas from "html2canvas";'
);

// 2. Add handleDownloadImage and captureRef
content = content.replace(
    'const procEthics = proc ? ethicsData[proc.id] : null;',
    `const procEthics = proc ? ethicsData[proc.id] : null;
    const captureRef = useRef(null);

    const handleDownloadImage = async () => {
        if (!captureRef.current) return;
        try {
            const canvas = await html2canvas(captureRef.current, { scale: 2, useCORS: true });
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = \`score-\${playerId || 'result'}.png\`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error capturing image:', error);
        }
    };`
);

// 3. Add captureRef to the main score card container. 
content = content.replace(
    '<div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">',
    '<div ref={captureRef} className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">'
);

// 4. Add playerId to the Ethics header
content = content.replace(
    '<p className="text-lg opacity-90 relative z-10">สิ่งสำคัญที่พึงระลึกเสมอ</p>',
    `<p className="text-lg opacity-90 relative z-10">สิ่งสำคัญที่พึงระลึกเสมอ</p>
                        <div className="mt-4 relative z-10">
                            <span className="bg-black bg-opacity-20 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
                                รหัสนิสิต: {playerId || "ไม่ระบุ"}
                            </span>
                        </div>`
);

// 5. Add playerId to the Score Summary header
content = content.replace(
    '<p className="text-lg opacity-90 relative z-10">{isPass ? "ยินดีด้วย! คุณผ่านการทดสอบ" : "พยายามอีกนิด! คุณทำได้"}</p>',
    `<p className="text-lg opacity-90 relative z-10">{isPass ? "ยินดีด้วย! คุณผ่านการทดสอบ" : "พยายามอีกนิด! คุณทำได้"}</p>
                    <div className="mt-4 relative z-10">
                        <span className="bg-black bg-opacity-20 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
                            รหัสนิสิต: {playerId || "ไม่ระบุ"}
                        </span>
                    </div>`
);

// 6. Replace Dashboard Button with Action Buttons
const actionBtnsStr = `{/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6" data-html2canvas-ignore="true">
                        <button
                            onClick={handleDownloadImage}
                            className="flex-1 py-4 rounded-xl font-bold text-lg border-2 text-gray-700 shadow-sm hover:bg-gray-50 transform transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                            style={{ borderColor: proc.color }}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            บันทึกผล
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex-1 py-4 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 flex items-center justify-center"
                            style={{ backgroundColor: proc.color }}
                        >
                            กลับสู่หน้าหลัก
                        </button>
                    </div>`;

content = content.replace(/\{\/\* Dashboard Button \*\/\}\s*<button[\s\S]*?กลับสู่หน้าหลัก \(Dashboard\)[\s\S]*?<\/button>/m, actionBtnsStr);

fs.writeFileSync(file, content, 'utf8');
console.log('Patched SimulationScore.jsx cleanly');

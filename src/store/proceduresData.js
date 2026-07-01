import n18 from "../assets/img/foley/n18.jpg";
import nipro from "../assets/img/foley/nipo.jpg";

////////////////////
////  SUCTION  ////
//////////////////
/// TRUE ///
import sterile_glove from "../assets/img/suction/1_sterile_glove.webp";
import clean_glove from "../assets/img/suction/2_clean_glove.webp";
import nns from "../assets/img/suction/3_nns.webp";
import cotton_bud from "../assets/img/suction/4_5cotton.webp";
import ambu_bag from "../assets/img/suction/5_ambubag.webp";
import syring5cc from "../assets/img/suction/6_syring5cc.webp";
import flow_meter from "../assets/img/suction/7_flowmeter.webp";
import chada from "../assets/img/suction/8_chada.webp";
import sterile_water from "../assets/img/suction/9_sterile_water.webp";
import handgel from "../assets/img/suction/10_handgel.webp";
import suction_line from "../assets/img/suction/11_suction_line.webp";
import cotton_ball from "../assets/img/suction/12_5_hard_cotton.webp";
import stethoscope from "../assets/img/suction/13_stethoscope.webp";
import kidney_basin from "../assets/img/suction/14_kidney_basin.webp";
import glass from "../assets/img/suction/15_glass.webp";
import alcohol_70 from "../assets/img/suction/16_70_alcohol.webp";
/// FALSE ///


// ตั้งเวลา (นาที) สำหรับแต่ละหัตถการและระดับความยาก
// equipment = เวลาเลือกอุปกรณ์, sequence = เวลาเรียงลำดับหัตถการ
export const timeConfig = {
    ng_tube: {
        intermediate: { equipment: 4, sequence: 8 },
        advance: { equipment: 2, sequence: 6 }
    },
    suction: {
        intermediate: { equipment: 5, sequence: 12 },
        advance: { equipment: 3, sequence: 8 }
    },
    foley_catheter: {
        intermediate: { equipment: 5, sequence: 12 },
        advance: { equipment: 3, sequence: 8 }
    }
};

// ข้อมูลอุปกรณ์สำหรับแต่ละหัตถการ
export const equipmentData = {
    suction: [
        { id: 1, name: "ถุงมือ Sterile", img: sterile_glove, isCorrect: true },
        { id: 2, name: "ถุงมือสะอาด", img: clean_glove, isCorrect: true },
        { id: 3, name: "0.9% NSS", img: nns, isCorrect: true },
        { id: 4, name: "ไม้พันสำลี 5 ก้าน", img: cotton_bud, isCorrect: true },
        { id: 5, name: "Ambu Bag", img: ambu_bag, isCorrect: true },
        { id: 6, name: "Syring 5 cc", img: syring5cc, isCorrect: true },
        { id: 7, name: "Flow Meter", img: flow_meter, isCorrect: true },
        { id: 8, name: "ชฎา", img: chada, isCorrect: true },
        { id: 9, name: "Sterile water 10 cc", img: sterile_water, isCorrect: true },
        { id: 10, name: "เจลแอลกอฮอล์ล้างมือ", img: handgel, isCorrect: true },
        { id: 11, name: "สาย Suction", img: suction_line, isCorrect: true },
        { id: 12, name: "สำลีแห้ง 5 ก้อน", img: cotton_ball, isCorrect: true },
        { id: 13, name: "Stethoscope", img: stethoscope, isCorrect: true },
        { id: 14, name: "ถาดรูปไต", img: kidney_basin, isCorrect: true },
        { id: 15, name: "แก้วน้ำ", img: glass, isCorrect: true },
        { id: 16, name: "70% Alcohol", img: alcohol_70, isCorrect: true }
    ],
    foley_catheter: [

    ],
    ng_tube: [

    ]
};

export const sequenceData = {
    suction: [

    ],
    foley_catheter: [

    ],
    ng_tube: [

    ]

}
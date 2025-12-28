import  type { Acid } from "./types";

export const MOCK_ACIDS: Acid[] = [
    {
        ID: 1,
        Name: "HCl",
        NameExt: "Соляная кислота",
        Info: "Раствор хлороводорода в воде, сильная одноосновная кислота.",
        Hplus: 1,
        MolarMass: 36.46,
        Img: ""
    },
    {
        ID: 2,
        Name: "H2SO4",
        NameExt: "Серная кислота",
        Info: "Сильная двухосновная кислота, отвечающая высшей степени окисления серы (+6).",
        Hplus: 2,
        MolarMass: 98.07,
        Img: ""
    },
    {
        ID: 3,
        Name: "HNO3",
        NameExt: "Азотная кислота",
        Info: "Сильная одноосновная кислота. Смешивается с водой в любых соотношениях.",
        Hplus: 1,
        MolarMass: 63.01,
        Img: ""
    }
];
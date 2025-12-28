export interface Acid {
    ID: number;
    Name: string;
    NameExt: string;
    Info: string;
    Hplus: number;
    MolarMass: number;
    Img: string;
}

export interface AcidListResponse {
    Acids: Acid[];
}

export interface CarbonateInfo {
    CarbonateID: number;
    AcidCount: number;
}
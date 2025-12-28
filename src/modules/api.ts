import type { Acid, AcidListResponse, CarbonateInfo } from "./types";
import { MOCK_ACIDS } from "./mock";
import { dest_api } from "../target_config";

export const getAcids = async (search: string = ''): Promise<Acid[]> => {
    try {
        const response = await fetch(`${dest_api}/acids?search=${search}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data: AcidListResponse = await response.json();
        return data.Acids || [];
    } catch (error) {
        console.warn("API Error, using mock data:", error);
        return MOCK_ACIDS.filter(acid =>
            acid.Name.toLowerCase().includes(search.toLowerCase()) ||
            acid.NameExt.toLowerCase().includes(search.toLowerCase())
        );
    }
};

export const getAcidById = async (id: number | string): Promise<Acid | undefined> => {
    try {
        const response = await fetch(`${dest_api}/acids/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.warn("API Error, using mock data:", error);
        return MOCK_ACIDS.find(acid => acid.ID === Number(id));
    }
};

export const getCurrentCarbonate = async (): Promise<CarbonateInfo | null> => {
    try {
        const response = await fetch(`${dest_api}/carbonates/current`);

        if (response.status === 403) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Failed to fetch carbonate info");
        }

        return await response.json();
    } catch (error) {
        console.warn("API Error (getCurrentCarbonate):", error);
        return null;
    }
};
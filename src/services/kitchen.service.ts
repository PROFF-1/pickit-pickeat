import { Kitchen } from "@/types/type";
import { apiUrl } from "@/utils/request";


export const getAllKitchens = async (): Promise<Kitchen[]> => {
    try {
        const response = await apiUrl.get('/kitchens');
        return response.data;
    } catch (error) {
        console.error("Error fetching kitchens:", error);
        throw error;
    }
}
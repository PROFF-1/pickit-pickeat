import {Food, RootObject} from "../types/type";
import { apiUrl } from "@/utils/request";




export const getAllfoods = async (): Promise<Food[]> => {
    try  {
        const response = await apiUrl.get<Food[]>('/foods');
        return response.data;
    } catch (error) {
        console.error("Error fetching foods:", error);
        throw error;
    }
}
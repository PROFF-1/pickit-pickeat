import {Coupon, RootObject} from "../types/type";
import { apiUrl } from "@/utils/request";




export const getAllcoupons = async (): Promise<Coupon[]> => {
    try  {
        const response = await apiUrl.get<Coupon[]>('/coupons');
        return response.data;
    } catch (error) {
        console.error("Error fetching foods:", error);
        throw error;
    }
}
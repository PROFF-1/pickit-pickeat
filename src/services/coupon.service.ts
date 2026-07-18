import {Coupon, Kitchen, RootObject} from "../types/type";
import { apiUrl } from "@/utils/request";




export const getAllcoupons = async (): Promise<Coupon[]> => {
    try  {
        const response = await apiUrl.get<Coupon[]>('/coupons');
        return response.data;
    } catch (error) {
        console.error("Error fetching coupons:", error);
        throw error;
    }
}

export const getKitchenForCoupon = async (coupon: Coupon): Promise<Kitchen> => {
    try {
        const response = await apiUrl.get<Kitchen>(`/kitchens/${coupon.kitchenId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching kitchen for coupon:", error);
        throw error;
    }
}


// export const getKitchenIdByCoupon = async (): Promise<string> => {
//     try  {
//         const response = await apiUrl.get<Coupon[]>('/coupons');
//         const kitchenId = response.data.at(0)?.kitchenId;
//         return kitchenId?.toString() || '';
//     } catch (error) {
//         console.error("Error fetching kitchen ID:", error);
//         throw error;
//     }
// }

// export const getKitchenNameById = async (kitchenId: string): Promise<string> => {
//     try  {
//         const response = await apiUrl.get(`/kitchens/${kitchenId}`);
//         const kitchenName = response.data.name;
//         return kitchenName || '';
//     } catch (error) {
//         console.error("Error fetching kitchen name:", error);
//         throw error;
//     }
// }
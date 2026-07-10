import { getAllcoupons } from "@/services/coupon.service";
import { useQuery } from "@tanstack/react-query";
import { Coupon } from "@/types/type";
import { useCouponStore } from "@/stores/foodStore";


export function useCoupon() {
    return useQuery<Coupon[]>({
        queryKey: ['coupons'],
        queryFn: async () => {
            const coupons = await getAllcoupons();
            useCouponStore.getState().setCoupons(coupons);
            return coupons;
        },
    });
}
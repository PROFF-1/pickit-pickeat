import { getAllcoupons, getKitchenForCoupon } from "@/services/coupon.service";
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

export function getKitchenByCoupon(coupon: Coupon) {
    return useQuery({
        queryKey: ['kitchen', coupon.kitchenId],
        queryFn: async () => {
            const kitchen = await getKitchenForCoupon(coupon);
            return kitchen;
        },
    });
}
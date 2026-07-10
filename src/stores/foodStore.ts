import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Coupon, Food} from "../types/type";



interface FoodStore {
    foodItems: Food[];
    setFoodItems: (value: Food[]) => void;
}

interface CouponStore {
    coupons: Coupon[];
    setCoupons: (value: Coupon[]) => void;
}

export const useFoodStore = create<FoodStore>()(persist(
    (set) => ({
        foodItems: [],
        setFoodItems: (value: Food[]) => set({ foodItems: value }),
    }),
    {
        name: "food-storage",
        storage: createJSONStorage(() => AsyncStorage),
    }
));


export const useCouponStore = create<CouponStore>()(persist(
    (set)=>(
        {
            coupons:[],
            setCoupons :(value: Coupon[])=> set({coupons: value})
        }
    ),{
        name: "coupon-storage",
        storage: createJSONStorage(()=>AsyncStorage)
    }
))
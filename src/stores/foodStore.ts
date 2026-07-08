import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Food} from "../types/type";



interface FoodStore {
    foodItems: Food[];
    setFoodItems: (value: Food[]) => void;
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
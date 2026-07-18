import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Kitchen} from "../types/type";


interface KitchenStore {
    kitchenItems: Kitchen[];
    setKitchenItems: (value: Kitchen[]) => void;
}


export const useKitchenStore = create<KitchenStore>()(persist(
    (set) => ({
        kitchenItems: [],
        setKitchenItems: (value: Kitchen[]) => set({ kitchenItems: value }),
    }),
    {
        name: "kitchen-storage",
        storage: createJSONStorage(() => AsyncStorage),
    }
));
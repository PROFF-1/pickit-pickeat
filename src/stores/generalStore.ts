import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GeneralStore {
    hasCompletedOnboarding: boolean;
    setHasCompletedOnboarding: (value: boolean) => void;
    resetHasCompletedOnboarding: () => void;
   
}
interface inputValueStore {
    inputValue: string;
    setInputValue: (value: string) => void;
    resetInputValue: () => void;
}


    export const useGeneralStore = create<GeneralStore>()(persist(
    (set) => ({
        hasCompletedOnboarding: false,
        setHasCompletedOnboarding: (value: boolean) => set({ hasCompletedOnboarding: value }),
        resetHasCompletedOnboarding: () => set({ hasCompletedOnboarding: false }),
    }),
    {
        name: "general-storage",
        storage: createJSONStorage(() => AsyncStorage),
    }
));


    export const useInputValueStore = create<inputValueStore>((set) => ({
        inputValue: "",
        setInputValue: (value: string) => set({ inputValue: value }),
        resetInputValue: () => set({ inputValue: "" }),
    }));





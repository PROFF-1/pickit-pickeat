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
    countryCode: string;
    setCountryCode: (value: string) => void;
    callingCode: string;
    setCallingCode: (value: string) => void;
     error: string;
    setError: (value: string) => void;

}


interface otpStore {
    otp: string;
    setOtp: (value: string) => void;
    error: string | null;
    setError: (value: string | null) => void;
    number: string | null;
    setNumber: (value: string | null) => void;
}


    export const useGeneralStore = create<GeneralStore>()(persist(
    (set) => ({
        hasCompletedOnboarding: true,
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
        countryCode: "US",
        setCountryCode: (value: string) => set({ countryCode: value }),
        callingCode: "1",
        setCallingCode: (value: string) => set({ callingCode: value }),
        error: "",
        setError: (value: string) => set({ error: value }),
    }));


    export const useOtpStore = create<otpStore>((set) => ({
        otp: "",
        setOtp: (value: string) => set({ otp: value }),
        error: "" ,
        setError: (value: string | null) => set({ error: value }),
        number: "",
        setNumber: (value: string | null) => set({ number: value })
    }));





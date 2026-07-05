import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GeneralStore {
    hasCompletedOnboarding: boolean;
    setHasCompletedOnboarding: (value: boolean) => void;
    resetHasCompletedOnboarding: () => void;
   
}
interface inputPhoneValueStore {
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


interface userProfileStore {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
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


    export const usePhoneInputValueStore = create<inputPhoneValueStore>((set) => ({
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


    export const useUserProfileStore = create<userProfileStore>((set) => ({
        firstName: "",
        setFirstName: (value: string) => set({ firstName: value }),
        lastName: "",
        setLastName: (value: string) => set({ lastName: value }),
        email: "",
        setEmail: (value: string) => set({ email: value }),
    }));



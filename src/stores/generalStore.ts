import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CountryCode } from "react-native-country-picker-modal";

interface GeneralStore {
    hasCompletedOnboarding: boolean;
    setHasCompletedOnboarding: (value: boolean) => void;
    resetHasCompletedOnboarding: () => void;
   
}
interface inputPhoneValueStore {
    inputValue: string;
    setInputValue: (value: string) => void;
    resetInputValue: () => void;
    countryCode: CountryCode;
    setCountryCode: (value: CountryCode) => void;
    callingCode: string;
    setCallingCode: (value: string) => void;
     error: string;
    setError: (value: string) => void;
    variant: string;
    setVariant: (value: string) => void;

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


interface userLocationStore {
    location: any;
    setLocation: (value: any) => void;
    errorMsg: string;
    setErrorMsg: (value: string) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}


interface userAddressStore {
    location: userLocationStore,
    buildingType: string,
    setBuildingType: (value: string) => void,
    Apt: string,
    BusinessName: string,
    setApt: (value: string) => void,
    setBusinessName: (value: string) => void,
    deliveryInstructions: string,
    setDeliveryInstructions: (value: string) => void,
    delieveryOption: string,
    setDelieveryOption: (value: string) => void,
    errorMsg: string,
    setErrorMsg: (value: string) => void,
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
        countryCode: "US" as CountryCode,
        setCountryCode: (value: CountryCode) => set({ countryCode: value }),
        callingCode: "1",
        setCallingCode: (value: string) => set({ callingCode: value }),
        error: "",
        setError: (value: string) => set({ error: value }),
        variant: "primary",
        setVariant: (value: string) => set({ variant: value }),
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



    export const useLocationStore = create<userLocationStore>()(persist(
    (set) => ({
        location: {},
        setLocation: (value: any) => set({ location: value }),
        errorMsg: "",
        setErrorMsg: (value: string) => set({ errorMsg: value }),
        loading: true,
        setLoading: (value: boolean) => set({ loading: value }),
    }),
    {
        name: "user-location-storage",
        storage: createJSONStorage(() => AsyncStorage),
    }
));



export const useAddressStore = create<userAddressStore>()(persist((set) => ({
    location: useLocationStore.getState(),
    buildingType: "",
    setBuildingType: (value: string) => set({ buildingType: value }),
    Apt: "",
    setApt: (value: string) => set({ Apt: value }),
    BusinessName: "",
    setBusinessName: (value: string) => set({ BusinessName: value }),
    deliveryInstructions: "",
    setDeliveryInstructions: (value: string) => set({ deliveryInstructions: value }),
    delieveryOption: "",
    setDelieveryOption: (value: string) => set({ delieveryOption: value }),
    errorMsg: "",
    setErrorMsg: (value: string) => set({ errorMsg: value }),
}), {
    name: "user-address-storage",
    storage: createJSONStorage(() => AsyncStorage),

}));




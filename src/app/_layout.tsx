import "../../global.css";
import { Stack } from "expo-router";
import { useGeneralStore } from "../stores/generalStore";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";

export default function RootLayout() {

  // const { hasCompletedOnboarding, resetHasCompletedOnboarding } = useGeneralStore(useShallow((state) => ({
  //   hasCompletedOnboarding: state.hasCompletedOnboarding,
  //   resetHasCompletedOnboarding: state.resetHasCompletedOnboarding,
  // })));

  // useEffect(() => {
  //   if (hasCompletedOnboarding) {
  //     resetHasCompletedOnboarding();
  //   }
  // }, [hasCompletedOnboarding, resetHasCompletedOnboarding]);


    return (
      <Stack>
        <Stack.Screen name="Index" options={{
          headerShown: false,
         }} />
        <Stack.Screen name="(user)" options={{
          headerShown: false,
         }} />
      </Stack>
    );
}
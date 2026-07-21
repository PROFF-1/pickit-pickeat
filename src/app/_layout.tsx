import "../../global.css";
import { Stack } from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";



// import { useGeneralStore } from "../stores/generalStore";
// import { useShallow } from "zustand/shallow";
// import { useEffect } from "react";

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



  const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false,
         }} />
        <Stack.Screen name="(user)" options={{
          headerShown: false,
         }} />
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
         }} />
      </Stack>
      </QueryClientProvider>
    );
}
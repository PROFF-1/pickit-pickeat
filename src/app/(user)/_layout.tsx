import {Stack} from "expo-router";


export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen name="Index" options={{
        headerShown: false,
       }} />
       <Stack.Screen name="userphoneauth" options={{
        headerShown: false,
       }} />
       <Stack.Screen name="otpverification" options={{
        headerShown: false,
       }} />
    </Stack>
  );
}
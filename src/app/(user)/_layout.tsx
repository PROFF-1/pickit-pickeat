import {Stack} from "expo-router";


export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false,
       }} />
       <Stack.Screen name="userphoneauth" options={{
        headerShown: false,
       }} />
       <Stack.Screen name="otpverification" options={{
        headerShown: false,
       }} />
        <Stack.Screen name="inputprofile" options={{
        headerShown: false,
       }} />
       <Stack.Screen name="userLocation" options={{
        headerShown: false,
       }} />
       <Stack.Screen name="deliveryAddress" options={{
        headerShown: false,
       }} />
    </Stack>
  );
}
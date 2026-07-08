import { Tabs } from "expo-router";
import * as Expo from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 0,
            height: 60,
        },
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: '#808080',
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, size }) => (
          <Expo.Ionicons name="home" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="search" options={{
        title: "Search",
        tabBarIcon: ({ color, size }) => (
          <Expo.Ionicons name="search" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({ color, size }) => (
          <Expo.Ionicons name="person" size={size} color={color} />
        ),
      }} />
    </Tabs>
  );
}
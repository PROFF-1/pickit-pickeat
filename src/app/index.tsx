import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import pickitpickeatLogo from "../assets/pickitpickeatLogo.png";
import React, {useState} from 'react'
import Button from '@/components/shared/button';
import { layout } from '@/constants/layout';
import {router} from "expo-router";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;


export default function Index() {

    const [outline, setOutline]= useState<"user" | "vendor" | "rider" | "admin" | null>(null);

    const roleSelctionButtons = [
        {
            title: "User",
            onPress: () => {
                setOutline("user");
                router.push("/(user)/Index");
              },
        },
        {
            title: "Vendor",
            onPress: () => {
                setOutline("vendor");},
        },
        {
            title: "Rider",
            onPress: () => {
                setOutline("rider");},
        },
        {
            title: "Admin",
            onPress: () => {
                setOutline("admin");},
        }
    ]
  return (
    <View style={styles.container}>
      <Image
        source={pickitpickeatLogo}
        resizeMode="cover"
        style={{
          height: 0.3 * screenHeight,
          width: 0.4 * screenWidth
        }}
      />
      <View style={styles.buttonsContainer}>
        {roleSelctionButtons.map((button, index) => (
          <Button
            key={index}
            title={button.title}
            variant="secondary"
            onPress={button.onPress}
            style={[styles.userButton, { borderWidth:outline === button.title.toLowerCase() ? 2 : 0 }]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0.1 * screenHeight,
    backgroundColor: "#FFFFFF"
  },
  userButton: {
    paddingVertical: 0.02 * screenHeight,
    paddingHorizontal: 0.35 * screenWidth,
    marginTop: 0.02 * screenHeight,
    borderColor: layout.colors.primary,
  },
    buttonsContainer: {
    marginTop: 0.15 * screenHeight,
  },
})
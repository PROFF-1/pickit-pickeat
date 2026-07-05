import { StyleSheet, Text, View,Dimensions  } from 'react-native'
import React from 'react'
import { layout } from '@/constants/layout'

const screenWidth = Dimensions.get("window").width;

interface headerProps{
    title?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: null | React.ReactNode;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
}

export default function Header({ title, leftIcon, rightIcon, onLeftIconPress, onRightIconPress }: headerProps) {
  return (
    <View style={styles.headerContainer}>
      {leftIcon && <View onTouchStart={onLeftIconPress}>{leftIcon}</View>}
      <Text style={styles.headerTitle}>{title || "Header"}</Text>
      {rightIcon && <View onTouchStart={onRightIconPress}>{rightIcon}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: screenWidth * 0.05,
        width: "100%",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: layout.weight.light,
        color: layout.text.black,
        width: "40%",
    },
})
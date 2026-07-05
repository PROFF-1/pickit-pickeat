import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { layout } from '@/constants/layout';
import React from 'react'


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface buttonProps{
    title: string,
    style?: object,
    variant: "primary" | "secondary" | "outlined";
    textStyle?: object;
    onPress?: () => void;
    leftIcon?: React.ReactNode;
    leftIconStyle?: object;

}

type buttonVariant = "primary" | "secondary" | "outlined";


    const variantStyle : Record<buttonVariant, object> ={
        primary: {
            backgroundColor: layout.colors.primary,
        },
        secondary :{
            backgroundColor: layout.colors.quatenary
        },
        outlined: {
            backgroundColor: layout.colors.tertiary
        }
    }

    const variantTextStyle : Record<buttonVariant, object> ={
        primary: {
            color: layout.text.white
        },
        secondary :{
            color: layout.text.colored
        },
        outlined: {
            color: layout.text.colored
        }
    }


export default function Button({title, variant, style, textStyle, onPress, leftIcon, leftIconStyle}: buttonProps) {


  return (
    <TouchableOpacity
     style ={[
        styles.defaultButtonStyle,
        variantStyle[variant],
        style

     ]}
     onPress={onPress}
    >
        {leftIcon && <View style={leftIconStyle}>{leftIcon}</View>}
      <Text
        style={[
            styles.buttonTextStyle,
            variantTextStyle[variant],
            textStyle
        ]}
      
      >{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    defaultButtonStyle: {
        paddingHorizontal: 0.27 * screenWidth,
        paddingVertical: 0.02 * screenHeight,
        borderRadius: 15,
        flexDirection: "row",
    },
    buttonTextStyle: {
        fontWeight: layout.weight.light,
        fontSize: layout.size.base,
    }
})
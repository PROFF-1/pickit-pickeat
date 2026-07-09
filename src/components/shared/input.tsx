import { StyleSheet, Text, View, TextInput, Animated, Easing, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { layout } from '@/constants/layout'
import { usePhoneInputValueStore } from '@/stores/generalStore'



interface InputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
    inputContainerStyle?: object;
    variant?: String |"primary" | "multiLine" | "error" ;
}

const { width, height } = Dimensions.get('window');

export default function Input({ placeholder, value, onPress, leftIcon, rightIcon, onLeftIconPress, onRightIconPress, onChangeText, inputContainerStyle, variant }: InputProps) {
  
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const transY = useRef(new Animated.Value(0));
   variant = usePhoneInputValueStore((state) => state.variant);
   const {setVariant} = usePhoneInputValueStore();

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(transY.current, {
      toValue: -15,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease
    }).start();
    if(variant=="error" && variant !== "multiLine") {
      setVariant("primary");
    }else{
      setVariant("multiLine");
    }
  }

  const transX= transY.current.interpolate({
    inputRange: [-30, 0],
    outputRange: [0, 0],
    extrapolate: 'clamp',
  });

  const handleBlur = () => {
    setIsFocused(false);
    if (!inputValue || !inputValue.trim()) {
      Animated.timing(transY.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }

  const handleChangeText = (text: string) => {
    setInputValue(text);  
    onChangeText && onChangeText(text); 
  }
  
  return (
    <View>

    <View style={[
        styles.container,
          isFocused ?
          {
            backgroundColor: layout.colors.white_background,
            borderColor: layout.colors.primary,
            borderWidth: 1.5,} :{
            backgroundColor: layout.colors.quatenary,
            borderColor: layout.colors.white_background,
            borderWidth: 1.5,
            },
            inputContainerStyle

    ]}>
      <Animated.View style={[
        styles.lableContainer,
        {
          transform: [
            { translateY: transY.current },
            { translateX: transX }
          ]
        }
      ]}>
        <Text style={styles.lable}>
          {placeholder}
        </Text>
      </Animated.View>
      <TextInput placeholder={placeholder} value={inputValue} 
       style={[
        styles.input, 
        variant === "error" && { borderColor: "red" },        
       ]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholderTextColor="transparent"
      onChangeText={handleChangeText}
      multiline={variant === "multiLine"}
      />
      
    </View>
    {variant === "error" && (
        <Text style={styles.errorText}>Input Field cannot be empty</Text>
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    justifyContent : "center",
    marginVertical: 10,

  },
  input: {
    padding: 20,
    paddingTop: 25,
    paddingBottom: 10,
    marginTop: 7,
    fontSize: layout.size.sm_base,
    color: layout.text.black,
    fontWeight: layout.weight.regular,

    
  },
  lableContainer:{
    position: "absolute",
    padding:20,
  },
  lable:{
    color: layout.text.grey,
    fontSize: layout.size.sm,
    fontWeight: layout.weight.slim
  },
  errorText: {
    color: 'red',
    fontSize: layout.size.sm,
    fontWeight: layout.weight.slim,
    marginTop: 5,
  }
})
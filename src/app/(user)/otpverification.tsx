import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import { OtpInput } from "react-native-otp-entry";
import { layout } from '@/constants/layout';
import { router } from 'expo-router';
import Button from '@/components/shared/button';
import AsyncStorage from '@react-native-async-storage/async-storage';



const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
export default function otpverification() {

    const [number, setNumber] = useState<string | null>("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");




    const getNumber = async () => {
        try {
          const phoneNumber = await AsyncStorage.getItem('phoneNumber');
          const callingCode = await AsyncStorage.getItem('callingCode');
          if (phoneNumber !== null && callingCode !== null) {
            setNumber(`+${callingCode}${phoneNumber}`);
          }
        }catch(error){
            console.error('Error retrieving phone number:', error);
        }
    };

    const getOtp = async () => {
        try {
            const otp = await AsyncStorage.getItem('otp');
            if (otp !== null) {
                setOtp(otp);
            }
        } catch(error){
            console.error('Error retrieving OTP:', error);
        }
    };

    useEffect(() => {
        getNumber();
        getOtp();
    }, []);

  return (
    <View style={styles.container}>
      <OtpInput
        numberOfDigits={4}
        focusColor="green"
        autoFocus={false}
        hideStick={true}
        placeholder=""
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onFocus={() => console.log("Focused")}
        onBlur={() => console.log("Blurred")}
        onTextChange={(text) => console.log("Text changed:", text)}
        onFilled={(text) => {
            if (text.length === 4 && text === otp) {
                    console.log("OTP is correct");
                    router.push("/(user)/Index");
                } else {
                    setError("Incorrect OTP. Please try again.");
                }
        }}
        textInputProps={{
            accessibilityLabel: "One-Time Password",
        }}
        textProps={{
            accessibilityRole: "text",
            accessibilityLabel: "OTP digit",
            allowFontScaling: false,
        }}
        theme={{
            containerStyle: styles.otpcontainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            placeholderTextStyle: styles.placeholderText,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
            disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
        }}
        />
        {
            error ? <Text style={{color: "red", marginTop: 10}}>{error}</Text> : null
        }
        <Text style={styles.instructionText}>Enter the four digit code sent to {number}</Text>
        <Button title="Continue" variant="primary"
                style={
                  styles.continueButton
                }
                onPress={() => {
                    router.push("/(user)/otpverification");
                }}
                
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: screenHeight * 0.25,
        backgroundColor: layout.colors.white_background,
    },
    otpcontainer: {
     padding: 10,
     borderRadius: 5,
     flexDirection: "row",
     justifyContent: "space-between",
     width: screenWidth*0.8,
    },
    pinCodeContainer:{
    backgroundColor: layout.colors.quatenary,
    borderRadius: 5,
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,

    },
    pinCodeText:{
        color: layout.text.colored,
        fontSize: layout.size.lg,
        fontWeight: layout.weight.bold  
    },
    focusStick:{
        width: 2,
        backgroundColor: layout.colors.primary,
        height: 30,
    },
    activePinCodeContainer:{
        borderColor: layout.colors.primary,
        borderWidth: 1,
        backgroundColor: layout.colors.white_background,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText:{
        color: layout.text.colored,

    },
    filledPinCodeContainer:{
        backgroundColor: layout.colors.white_background,
        borderWidth: 1,
        borderColor: layout.colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    disabledPinCodeContainer:{
        borderWidth: 0,

    },
    instructionText:{
        marginTop: 25,
        fontSize: layout.size.sm,
        color: layout.text.grey,
        textAlign: "center",
        width: screenWidth * 0.6,
    },
    continueButton:{
        position: "absolute",
        bottom: 0.08 * screenHeight,
        paddingHorizontal: 0.30 * screenWidth,
    },

    })
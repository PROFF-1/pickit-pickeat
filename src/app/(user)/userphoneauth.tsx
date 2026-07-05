import { Dimensions, StyleSheet, Text, View,Image, TextInput } from 'react-native'
import React,{useState} from 'react'
import pickitpickeatLogo from "../../assets/pickitpickeatLogo.png";
import {layout} from '../../constants/layout';
import Button from '../../components/shared/button';
import {router} from "expo-router";
import {useInputValueStore} from "../../stores/generalStore";
import CountryPicker from "react-native-country-picker-modal";
import * as Expo  from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function userphoneauth() {
  const { 
    inputValue, 
    setInputValue, 
    countryCode, 
    setCountryCode, 
    callingCode, 
    setCallingCode,
    error,
    setError
    } = useInputValueStore();



  const storeNumber = async () => {

    const formattedNumber = inputValue.startsWith("0") && (inputValue.trim().length == 10) ? inputValue.trim().slice(1) : inputValue.trim();
    try {
      await AsyncStorage.setItem('phoneNumber', formattedNumber);
      await AsyncStorage.setItem('callingCode', callingCode);
      await AsyncStorage.setItem('otp', "1234");
    } catch (error) {
      console.error('Error storing phone number:', error);
    }
  };
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
      <Text style={styles.title}>PickEAT PickIT</Text>
      <View style={styles.numberFieldContainer}>
        <View style={styles.countryPickerContainer}>
            <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlagButton={false}
            withFlag
            withCountryNameButton={false}
            withCallingCodeButton={true}
            withAlphaFilter
            withCallingCode={true}
            withEmoji
            onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
            }}
            />
            <Expo.MaterialIcons name="arrow-drop-down" size={24} color={layout.text.black} />
        </View>
        <View style={styles.inputContainer}>
        </View>
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, error ? { borderColor: "red", borderWidth: 1 } : null]}
                placeholder="Enter your phone number"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="phone-pad"
                onFocus={() => setError("")}
            />
        </View>
      </View>
      {
        error ? <Text style={{color: "red", marginTop: 10}}>{error}</Text> : null
      }
      <Text style={styles.agreementText}>
        By continuing you agree to our 
        <Text style={styles.linkText}>Terms</Text> and <Text style={styles.linkText}>Conditions</Text> and the <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
      <Button title="Continue" variant="primary"
        style={
          styles.continueButton
        }
        onPress={() => {
            storeNumber();
            if(inputValue.trim() !== "" && inputValue.trim().length >= 9 && inputValue.trim().length <= 10){
            router.push("/(user)/otpverification");
            setError("");
            }else{
                setError("Please enter phone number");
            }
        }}
        
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0.025 * screenHeight,
    backgroundColor: layout.colors.white_background,
  },
  title: {
    fontSize: layout.size.lg,
    color: layout.text.colored,
    fontWeight: layout.weight.thick,
    marginTop: -0.03 * screenHeight,
  },
  inputContainer: {
    height: 60,

  },
  input: {
    height: "100%",
    paddingHorizontal: 10,
    width: 0.6 * screenWidth,
    backgroundColor: layout.colors.quatenary,
    color: layout.text.colored,
    borderRadius: 5,

  },
  numberFieldContainer: {
    marginTop: 0.05 * screenHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    },
    countryPickerContainer: {
      marginRight: 10,
      width: 0.2 * screenWidth,
      height: 60,
      backgroundColor: layout.colors.quatenary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 15,
    },
    continueButton:{
        position: "absolute",
        bottom: 0.08 * screenHeight,
        paddingHorizontal: 0.30 * screenWidth,
    },
    agreementText: {
        position: "absolute",
        bottom: 0.18 * screenHeight,
        width: "100%",
        textAlign: "center",
        color: layout.text.grey,
        fontSize: layout.size.xs,
    },
    linkText: {
        color: layout.colors.primary,
    }
})
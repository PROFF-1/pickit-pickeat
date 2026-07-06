import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Dimensions} from 'react-native'
import React from 'react'
import Input from '@/components/shared/input'
import { SafeAreaView } from 'react-native-safe-area-context'
import { layout } from '@/constants/layout'
import Header from '@/components/shared/header'
import { router } from 'expo-router'
import * as Expo from '@expo/vector-icons';
import Button from '@/components/shared/button'
import { useUserProfileStore } from '@/stores/generalStore'
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function InputProfile() {

  const { firstName, setFirstName, lastName, setLastName, email, setEmail } = useUserProfileStore();


  const storeUserProfile = async () => {
    try {
      await AsyncStorage.setItem('userBasicDeatils', JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email
      }));
    } catch (error) {
      console.error('Error storing user profile:', error);
    }
  }

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  }
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
    <SafeAreaView style={
        styles.container
      }>
       
      <Header title='Complete Profile' 
        leftIcon={<Expo.MaterialIcons name="arrow-back" size={24} color="black" />}
        onLeftIconPress={() => router.back()}
        rightIcon
      />
       <Text style={styles.addressText}>
          Let us know how to properly address you
        </Text>
      <Input placeholder='First Name' 
        value={firstName} onChangeText={setFirstName} 
      />
      <Input placeholder='Last Name'
        value={lastName} onChangeText={setLastName}
      />
      <Input placeholder='Email' 
        value={email} onChangeText={setEmail}
      />
       <Button title="Continue" variant="primary"
              style={
                styles.continueButton
              }
              onPress={() => {
                storeUserProfile();
                router.push("/(user)/userLocation");
              }}
              
      />
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: "#fff",
  },
  addressText: {
    fontSize: layout.size.sm,
    color: layout.text.grey,
    fontWeight: layout.weight.light,
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.02,
    textAlign: "left",
    width: screenWidth * 0.85,
  },

  continueButton:{
    position: "absolute",
    bottom: 0.08 * screenHeight,
    paddingHorizontal: 0.30 * screenWidth,
  },

})
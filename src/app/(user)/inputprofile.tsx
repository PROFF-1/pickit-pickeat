import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Dimensions} from 'react-native'
import React from 'react'
import Input from '@/components/shared/input'
import { SafeAreaView } from 'react-native-safe-area-context'
import { layout } from '@/constants/layout'
import Header from '@/components/shared/header'
import { router } from 'expo-router'
import * as Expo from '@expo/vector-icons';
import Button from '@/components/shared/button'


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function InputProfile() {



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
      <Input placeholder='First Name' />
      <Input placeholder='Last Name' />
      <Input placeholder='Email' />
       <Button title="Continue" variant="primary"
              style={
                styles.continueButton
              }
              onPress={() => {
                  router.push("/(user)/inputprofile");
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
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import pickItpickEatSplashImage from "../../assets/pickItpickEatSplashImage.png";
import pickitpickeatLogo from "../../assets/pickitpickeatLogo.png";
import Button from "../../components/shared/button";
import {layout} from "../../constants/layout";
import {router} from "expo-router";
import {useGeneralStore} from "../../stores/generalStore";
import { useShallow } from "zustand/shallow";


 const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

export default function Index() {

  const { setHasCompletedOnboarding } = useGeneralStore(useShallow((state) => ({
    setHasCompletedOnboarding: state.setHasCompletedOnboarding,
  })));


  
 
  return (
    <View style={styles.screenContainer}>
      <View
      />
      <Image
        source={pickItpickEatSplashImage}
        resizeMode="contain"
        style={{
          height:"100%",
        }}
      />
      <View style={styles.logoContainer}>
       <Image
        source={pickitpickeatLogo}
        resizeMode="contain"
        style={{
          height: "100%"
        }}
        
      />
      </View>
      <View style={
          styles.textContainer
        }>
      <Text style={styles.slug}> 
        Taking Orders For Fast Deliveries
      </Text>
      </View>
      <Button title="Get Started" variant="primary" 
      style={
          styles.continueButton
        }
        onPress={() => {
          router.push("/(user)/userphoneauth");
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    position: "relative",
  },
  logoContainer:{
    position: "absolute",
    top: 45,
    right: 12,
    height: 100,
    width: 100,
    alignItems:"center",
    justifyContent: "center"
  },
  continueButton:{
    position: "absolute",
    bottom: 0.1 * screenHeight,
  },
  textContainer:{
    position: "absolute",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0.2* screenHeight,
    left: 0.1 * screenWidth,

  },
  slug:{
    fontSize: layout.size.lg,
    color: layout.text.white,
    fontWeight: layout.weight.bold
  }

})


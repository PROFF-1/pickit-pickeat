import Button from '@/components/shared/button';
import Header from '@/components/shared/header';
import Input from '@/components/shared/input';
import { layout } from '@/constants/layout';
import { useLocationStore } from '@/stores/generalStore';
import * as Expo from '@expo/vector-icons';
import Mapbox, { Camera, MapView } from '@rnmapbox/maps';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAddressStore} from "../../stores/generalStore";
import { usePhoneInputValueStore } from '@/stores/generalStore';


Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? '');


const screenWidth = Dimensions.get("window").width;
const screenHeight= Dimensions.get("window").height;

 export default function DeliveryAddress() {

  const {buildingType, setBuildingType, Apt, setApt, BusinessName, setBusinessName, deliveryInstructions, setDeliveryInstructions, delieveryOption, setDelieveryOption} = useAddressStore();
  const {variant, setVariant} = usePhoneInputValueStore();
  const [basicDetails, setBasicDetails] = useState<{firstName: string, lastName: string, email: string} | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("1");



  interface deliveryOptions {
    id: string;
    option: string;
  }

  const handleOptionSelect = (optionId: string) => {
    const selected = deliveryOptions.find(option => option.id === optionId);
    if (selected) {
      setSelectedOption(selected.id);
          setDelieveryOption(selected.option);

    }
  }


    const enlarge= useRef(new Animated.Value(1)).current;

    const location = useLocationStore((state) => (state.location));
    const setLocation = useLocationStore((state) => state.setLocation);

const [center, setCenter] = useState<[number, number]>([
  location?.coords?.longitude ?? -0.1692515,
  location?.coords?.latitude ?? 5.6505357
]);
    const cameraRef = useRef<Mapbox.Camera>(null);

    const handleEnlarge = () => {
      Animated.loop(
        Animated.sequence([
        Animated.timing(enlarge, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: true,
        }),
        Animated.timing(enlarge, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        })

      ])).start();
    }

    useEffect(() => {
        handleEnlarge();
        AsyncStorage.getItem('userBasicDeatils').then((value) => {
          if (value) {
            const userDetails = JSON.parse(value);
            setBasicDetails(userDetails);
            console.log('Retrieved user details:', userDetails);
          } else {
            console.log('No user details found in AsyncStorage.');
          }
        });
    }, []);

    const storeUpdatedUserInfo = async () => {
      try {
        if (basicDetails) {
          const updatedDetails = {
            ...basicDetails,
            buildingType: buildingType,
            Apt: Apt,
            BusinessName: BusinessName,
            deliveryInstructions: deliveryInstructions,
            delieveryOption: delieveryOption ,
          };
          await AsyncStorage.setItem('userBasicDeatils', JSON.stringify(updatedDetails));
          console.log('Updated user details stored successfully:', updatedDetails);
        } else {
          console.error('No basic details available to update.');
        }
      } catch (error) {
        console.error('Error storing updated user details:', error);
      }
    };


   useEffect(() => {
  if (location?.coords?.latitude && location?.coords?.longitude) {
    const coords: [number, number] = [location.coords.longitude, location.coords.latitude];
    setCenter(coords);
    cameraRef.current?.flyTo(coords, 1000);
  }
}, [location]);

    const handleMapIdle = (state: any) => {
      const [lng, lat] = state.properties.center;
      const newCoords: [number, number] = [lng, lat];
      setCenter(newCoords);
      setLocation({
        coords: {
          longitude: lng,
          latitude: lat,
          accuracy: 0,
          altitude: 0,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0,
        },
        mocked: false,
        timestamp: Date.now(),
      });
      console.log('New location:', newCoords);
    };


//     const handleMapPress = (feature: any) => {
//   const { geometry } = feature;
//   const newCoords: [number, number] = [geometry.coordinates[0], geometry.coordinates[1]];
//   setCenter(newCoords);
//   console.log('New location:', newCoords);
// };


    const deliveryOptions: deliveryOptions[] =[
      {
        id: "1",
        option: "Hand it to me directly"
      },
      {
        id: "2",
        option: "Hand it to me or whoever is available"
      },
      {
        id: "3",
        option: "Leave it at my door"
      },
    ]
    

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Header title='Set Delievery Address' 
                  leftIcon={<Expo.MaterialIcons name="arrow-back" size={24} color="black" />}
                  onLeftIconPress={() => router.back()}
                  rightIcon
                  titleStyle={styles.headerTitle}
              />
       <View style={styles.mapContainer}>
         <MapView
           style={styles.map}
           styleURL="mapbox://styles/mapbox/standard"
           onMapIdle={handleMapIdle}
         >
              <Camera
                ref={cameraRef}
                zoomLevel={17}
                centerCoordinate={center}
                animationMode="flyTo"
              />
            </MapView>
         <View style={styles.markerOverlay} pointerEvents="none">
           <Animated.View style={[styles.markerContainer, { transform: [{ scale: enlarge }] }]}>
             <Animated.View style={styles.markerInnerContainer}>
               <Expo.MaterialIcons name="location-on" size={34} color="red" />
             </Animated.View>
           </Animated.View>
         </View>
       </View>
       <Text style={styles.markerText}>
        Move the pin to your building entrance to help your courier find you faster
       </Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      
      <Input 
       placeholder="Building Type"
       value={buildingType}
       onChangeText={setBuildingType}
       variant={variant}
       inputContainerStyle={{ marginTop: 0 }}
      />
      <Input 
       placeholder="Apt/Suite/Building floor"
       value={Apt}
       onChangeText={setApt}
       variant={variant}
       inputContainerStyle={{ marginTop: 0 }}
      />
      <Input 
       placeholder="Business/ Building Name"
       value={BusinessName}
       onChangeText={setBusinessName}
       variant={variant}
       inputContainerStyle={{ marginTop: 0 }}
      />

      <View style={styles.deliveryOptionsContainer}>

      {
        deliveryOptions.map((option) => (
          <TouchableOpacity key={option.id} onPress={() => handleOptionSelect(option.id)} style={{marginVertical: 10}}>
            {selectedOption === option.id ? (
              <View style={{flexDirection: "row", alignItems: "center",borderBottomWidth: 1, borderBottomColor: layout.colors.secondary, paddingBottom: 10}}>
                <Expo.MaterialIcons name="radio-button-checked" size={24} color={layout.colors.primary} />
                <Text style={{fontSize: layout.size.sm, fontWeight: layout.weight.light, color: layout.text.black}}>
                  {option.option}
                </Text>
              </View>
            ) : (
              <View style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: layout.colors.secondary, paddingBottom: 10}}>
                <Expo.MaterialIcons name="radio-button-unchecked" size={24} color={layout.colors.primary} />
                <Text style={{fontSize: layout.size.sm, fontWeight: layout.weight.light, color: layout.text.black}}>
                  {option.option}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))
      }

      </View>


      <Text style={styles.delieveryMessage}>
        Instructions for delivery person
      </Text>


      <Input
        placeholder="Delivery Instructions"
        value={deliveryInstructions}
        onChangeText={setDeliveryInstructions}
        variant= {variant}
        inputContainerStyle={styles.messageContainer}
      />

      <Button title="Set Address" variant="primary"
              style={
                styles.continueButton
              }
              onPress={() => {
                if(!Apt || !BusinessName || !buildingType || !delieveryOption || !deliveryInstructions) {
                    setVariant("error");
                  } else {
                    setVariant("primary");
                    storeUpdatedUserInfo();
                router.push("../(tabs)");
              }
              }}
              
              />
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: layout.colors.white_background,
    },  
    scrollContainer: {
      alignItems: "center", 
      justifyContent: "flex-start", 
      width: screenWidth, 
      paddingBottom: 20
    },
    mapContainer: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.3,
    },
    map: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.3,
    },
    markerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
     markerContainer: {
    backgroundColor: 'rgba(9, 255, 0, 0.2)',
    padding: 16,
    borderRadius:999,
  },
  markerInnerContainer: {
    backgroundColor: 'rgba(9, 255, 0, 0.5)',
    padding: 4,
    borderRadius: 999,
  },
  headerTitle: {
    width: screenWidth * 0.6,
    textAlign: "center",
  },
  markerText: {
    fontSize: layout.size.xs,
    color: layout.text.grey,
    textAlign: "center",
    marginVertical: 8,
  },
  deliveryOptionsContainer: {
    width: screenWidth * 0.85,
    marginTop: 8,
  },
  delieveryMessage: { 
    marginTop: screenHeight * 0.02,
    width: screenWidth * 0.85,
  },
  messageContainer: { 
    marginTop: 0, 
    height: screenHeight * 0.15, 
    justifyContent: "flex-start", 
    alignItems: "flex-start"
   },
   continueButton:{
        paddingHorizontal: 0.30 * screenWidth,
    },
})
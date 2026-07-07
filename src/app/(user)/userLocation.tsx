import GeocoderInput, { GeocoderResult } from '@/components/shared/GeoInput';
import Header from '@/components/shared/header';
import { layout } from '@/constants/layout';
import * as Expo from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useLocationStore } from '@/stores/generalStore';
import { useShallow } from 'zustand/shallow';


Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? '');

const screenWidth = Dimensions.get('window').width;
export default function UserLocationScreen() {


    const { location, setLocation, errorMsg, setErrorMsg, loading, setLoading } = useLocationStore(useShallow((state) => ({
        location: state.location,
        setLocation: state.setLocation,
        errorMsg: state.errorMsg,
        setErrorMsg: state.setErrorMsg,
        loading: state.loading,
        setLoading: state.setLoading,
    })));
  const cameraRef = useRef<Mapbox.Camera>(null);
  const [center, setCenter] = useState<[number, number]>([-0.187, 5.6037]); // Accra

  const handleSelect = (result: GeocoderResult) => {
    const [lng, lat] = result.center;
    setCenter([lng, lat]);
    cameraRef.current?.flyTo([lng, lat], 1000);
  };



  const getCurrentLocation = async () => {
      // 1. Request foreground location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      // 2. Fetch current coordinates
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      setLocation(currentLocation);
      setLoading(false);
      
      console.log('Current Location:', location.coords);
      router.push('/(user)/deliveryAddress');
    }


  return (
    <SafeAreaView style={styles.container}>
     

      {/* Geocoder floats over the map */}
       <Header title='Complete Profile' 
            leftIcon={<Expo.MaterialIcons name="arrow-back" size={24} color="black" />}
            onLeftIconPress={() => router.back()}
            rightIcon
        />
      <View style={styles.geocoderContainer}>
        <GeocoderInput
          placeholder="Search location..."
          onSelect={handleSelect}
          proximity={center}   // bias results toward current map center
          country="gh"        
        />
      </View>

      <Pressable style={styles.chooseButton} onPress={() => router.push('/(user)/inputprofile')}>
        <Expo.Entypo name="location" size={20} color={layout.colors.primary} style={styles.icon} />
        <Text style={styles.chooseButtonText}>
            Choose From Map
        </Text>
    </Pressable>
    <View style={styles.line}/>

    <TouchableOpacity style={styles.currentLocation} onPress={() =>{
        getCurrentLocation();
    }}>
        <Expo.MaterialIcons name="location-on" size={20} color={layout.colors.primary} style={styles.icon} />
        <View>
        <Text style={styles.chooseButtonText}>
            Use Current Location
        </Text>
        <Text style={styles.currentLocationText}>
            Use Current Location
        </Text>
        </View>
    </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: layout.colors.white_background,
     alignItems: 'center',
     },
  geocoderContainer: {
    width: screenWidth * 0.9,
  
  },
    chooseButton: {
        marginTop: 20,
        width: screenWidth * 0.9,
        paddingVertical: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentLocation: {
        width: screenWidth * 0.9,
        paddingVertical: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    chooseButtonText: {
        fontSize: layout.size.sm,
        color: layout.text.grey,
        fontWeight: layout.weight.slim,
    },
    currentLocationText: {
        color: layout.text.black,
        fontWeight: layout.weight.light,
    },
    line:{
        width: screenWidth * 0.9,
        height: 2,
        backgroundColor: layout.colors.secondary,
    }
});
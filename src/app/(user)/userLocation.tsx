import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import Mapbox, { MapView, Camera } from '@rnmapbox/maps';
import GeocoderInput, { GeocoderResult } from '@/components/shared/GeoInput';
import { layout } from '@/constants/layout';
import Header from '@/components/shared/header';
import { router } from 'expo-router';
import * as Expo from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/shared/button';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? '');

const screenWidth = Dimensions.get('window').width;
export default function UserLocationScreen() {
  const cameraRef = useRef<Mapbox.Camera>(null);
  const [center, setCenter] = useState<[number, number]>([-0.187, 5.6037]); // Accra

  const handleSelect = (result: GeocoderResult) => {
    const [lng, lat] = result.center;
    setCenter([lng, lat]);
    cameraRef.current?.flyTo([lng, lat], 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <MapView style={styles.map} styleURL="mapbox://styles/mapbox/standard">
        <Camera
          ref={cameraRef}
          zoomLevel={13}
          centerCoordinate={center}
          animationMode="flyTo"
        />
      </MapView> */}

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

    <Pressable style={styles.currentLocation} onPress={() => router.push('/(user)/inputprofile')}>
        <Expo.MaterialIcons name="location-on" size={20} color={layout.colors.primary} style={styles.icon} />
        <View>
        <Text style={styles.chooseButtonText}>
            Use Current Location
        </Text>
        <Text style={styles.currentLocationText}>
            Use Current Location
        </Text>
        </View>
    </Pressable>
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
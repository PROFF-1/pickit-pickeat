import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import {useFoodStore} from "../../stores/foodStore";
import {useFood} from "../../hooks/use-food";
import {SafeAreaView} from "react-native-safe-area-context";
import * as Expo from "@expo/vector-icons";

interface Listing {
  id: number;
  avatar: string;
  storeImage: string;
  businessName: string;
  VendorType: string;
  rating: number;
}

export default function FoodFeed() {

      useFood()

  const {foodItems} = useFoodStore();



  useEffect(() => {
    // Uses the dynamic network IP from your .env file
    // const backendUrl = `${process.env.EXPO_PUBLIC_API_URL}/dishes`;
    // console.log("Fetching listings from:", backendUrl);
    
    // fetch(backendUrl)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setListings(data);
    //   })
    //   .catch((err) => console.error("Network Error Connection:", err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableWithoutFeedback>
          <View>
            <Expo.FontAwesome5 name="user-circle" size={24} color="black" />
          </View>
          <Text>
            Welcome
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
   backgroundColor: '#f5f5f5', 
   paddingTop: 50 
  },
  card: { 
    backgroundColor: '#fff', 
    margin: 10, 
    padding: 15, 
    borderRadius: 10 
  },
  image: { 
    width: '100%', 
    height: 150, 
    borderRadius: 8 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  category: { 
    color: 'gray', 
    fontSize: 14 
  }
});

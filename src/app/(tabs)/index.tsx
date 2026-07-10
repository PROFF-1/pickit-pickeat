import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native';
import {useFoodStore} from "../../stores/foodStore";
import {useFood} from "../../hooks/use-food";
import {SafeAreaView} from "react-native-safe-area-context";
import * as Expo from "@expo/vector-icons";
import { layout } from '@/constants/layout';
import {useCouponStore} from "@/stores/foodStore";
import { useCoupon, getKitchenByCoupon } from '@/hooks/use-coupon';
import { Coupon } from '@/types/type';

interface Listing {
  id: number;
  avatar: string;
  storeImage: string;
  businessName: string;
  VendorType: string;
  rating: number;
}

const screenWidth = Dimensions.get('window').width;

function CouponCard({item}: { item: Coupon}){
  const {data : kitchen} = getKitchenByCoupon(item);

  return (
    <View style={styles.discountCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.discountImage} />
      <View style={styles.discountTextContainer}>
        <Text>{kitchen?.businessName}</Text>
      <Text style={styles.discountText} ellipsizeMode='tail'>{item.spendAmount}</Text>
      </View>
    </View>
  );
}
export default function FoodFeed() {
  
  const {foodItems} = useFoodStore();
  const {coupons} = useCouponStore();
      useFood()
      useCoupon()


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
      <View style={styles.header}>
        <Pressable style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBackground}>
            <Expo.FontAwesome5 name="user-circle" size={18} color="white" />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>
            Welcome
          </Text>
        </Pressable>
        <Pressable style={styles.headerRight}>
          <TouchableOpacity>
          <Expo.FontAwesome name="bell" size={28} color={layout.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity>
          <Expo.Entypo name="mail" size={28} color={layout.colors.primary} />
          </TouchableOpacity>
        </Pressable>
      </View>
      <View style={styles.foodList}>

      <FlatList
        data={foodItems.slice(0, 10)} // Display only the first 10 items
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title} ellipsizeMode='tail'>{item.title}</Text>
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        
      
      />
      </View>
      <View style={styles.discountCardHolder}>
      <Text>Special Offers for you</Text>
      <FlatList
        data={coupons.slice(0, 10)} // Display only the first 10 items
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CouponCard item={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
   backgroundColor: layout.colors.white_background, 
   justifyContent: 'flex-start',
  },
  foodList: {
    height: screenWidth * 0.50,
  },
  card: { 
    backgroundColor: '#fff', 
    margin:5, 
    padding: 5, 
    borderRadius: 10,
    flex: 1,
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
  },
  image: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 8 
  },
  title: { 
    fontSize: layout.size.sm, 
    fontWeight: layout.weight.regular, 
    color: layout.text.grey,
    marginTop: 10 
  },
  category: { 
    color: 'gray', 
    fontSize: 14 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: layout.colors.quatenary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: screenWidth * 0.3,
    backgroundColor: layout.colors.quatenary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  iconBackground: {
    backgroundColor: layout.colors.primary,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: layout.size.sm_base,
    fontWeight: layout.weight.bold,
    color: layout.text.black,
  },
  discountCardHolder: {
    paddingHorizontal: 10,
    height: screenWidth * 0.65,
  },
  discountCard: {
    margin:5,
    borderRadius: 10,
    flex: 1,
    width: screenWidth * 0.7,
    height: screenWidth * 0.45,
  },
  discountImage: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 8 
  },
  discountText: { 
    fontSize: layout.size.sm, 
    fontWeight: layout.weight.regular, 
    color: layout.text.grey,
    marginTop: 10 
  },
  discountTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgb(255, 0, 0)',
    padding: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    width: '100%',
    height: '30%',
  }
});

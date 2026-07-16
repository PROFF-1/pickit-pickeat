import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, Dimensions, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {useFoodStore} from "../../stores/foodStore";
import {useFood} from "../../hooks/use-food";
import {SafeAreaView} from "react-native-safe-area-context";
import * as Expo from "@expo/vector-icons";
import { layout } from '@/constants/layout';
import {useCouponStore} from "@/stores/foodStore";
import { useCoupon, getKitchenByCoupon } from '@/hooks/use-coupon';
import { Coupon } from '@/types/type';
import Svg, { Polygon, Path } from 'react-native-svg';
import Input from '../../components/shared/input';
import {useKitchenStore} from "@/stores/kitchenStore";
import { useKitchen } from '@/hooks/use-Kitchen';
import { useShallow } from 'zustand/shallow';



const screenWidth = Dimensions.get('window').width;

function CouponCard({item}: { item: Coupon}){
  const {data : kitchen} = getKitchenByCoupon(item);

  return (
    <TouchableOpacity style={styles.discountCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.discountImage} />


      <View style={styles.spendSaveTextContainer}>
      <Text style={styles.discountText}>{`Spend $${item.spendAmount}, Save $${item.saveAmount}`}</Text>
    </View>
      <View style={styles.discountTextContainer}>
        <Svg
    height="125%"
    width="55%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    style={{ position: 'absolute', right: -35, bottom: 0, }}
  >
    
    <Polygon
      points="30,0 100,0 100,100 0,100"
      fill="#36f730"
    />
  </Svg>
        <Svg
    height="165%"
    width="55%"
    transform="translate(0, 10)"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    style={{ position: 'absolute', right: -90, bottom: 0 }}
  >
    <Polygon
      points="0,0 100,0 40,100"
      fill="#228b22"
    />
  </Svg>
  <Image source={require('../../assets/Star 2.jpg')} style={styles.starImage} />
  <Text style={styles.percentageSign}>{`%${item.discountPercentage} \n OFF`}</Text>

        <View style={styles.kitchenNameContainer}>
        <Text style={styles.kitchenName} ellipsizeMode="tail" numberOfLines={1}>{kitchen?.businessName}</Text>
        </View>
        <Text style={styles.deliveryInfo}>{`$${item.deliveryFee.toFixed(2)} delivery fee | ${item.deliveryTime} mins`}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default function FoodFeed() {
  
  useFood()
  useCoupon()
  useKitchen()
  const {foodItems} = useFoodStore();
  const {coupons} = useCouponStore();
  const {kitchenItems} = useKitchenStore();


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
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <SafeAreaView style={styles.container}>
      {/*Header Section */}
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


      {/*Search Section */}
      <View style={styles.searchSection}>
      <Input placeholder="Search for available foods"
        inputContainerStyle={styles.searchInput} 
         leftIcon={<Expo.Feather name="search" size={20} color={layout.colors.primary} />}
         rightIcon={<Expo.Feather name="mic" size={20} color={layout.colors.primary} />}
        />
      </View>

      {/*Food List Section */}
      <View style={styles.foodList}>

      <FlatList
        data={foodItems.slice(0, 10)} // Display only the first 10 items
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title} ellipsizeMode='tail'>{item.title}</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        
      
      />
      </View>
      {/*Discount Card Section */}  
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

      {/*Kitchen List Section */}
      <View style={styles.kitchenList}>
        <FlatList
          data={kitchenItems.slice(0, 10)} // Display only the first 10 items
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chefCard}>
              <Image source={{ uri: item.avatar }} style={styles.chefImage} />
              <Text style={styles.title} ellipsizeMode='tail'>{item.username}</Text>
            </TouchableOpacity>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
   backgroundColor: layout.colors.white_background, 
   justifyContent: 'flex-start',
  },
  foodList: {
    height: screenWidth * 0.45,
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
    paddingHorizontal: screenWidth * 0.02,
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

  searchSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  searchInput: {
    width: screenWidth * 0.95,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: layout.colors.tertiary,
  },
  discountCardHolder: {
    paddingHorizontal: 10,
    height: screenWidth * 0.55,
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
  kitchenNameContainer: {
    width: '70%',
  },
  discountText: { 
    fontSize: layout.size.sm_base, 
    fontWeight: layout.weight.bold, 
    color: layout.text.grey,
  },
  discountTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#ECFED6',
    padding: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    width: '100%',
    height: '30%',
    overflow: 'hidden',
  },
  starImage: {
    position: 'absolute',
    top: 7,
    right: 35,
    width: 40,
    height: 40,
    borderRadius: 99,
  },
  percentageSign: {
    position: 'absolute',
    top: 12,
    right: 42,
    fontSize: layout.size.sm,
    fontWeight: layout.weight.bold,
    color: layout.text.white,
  },
  spendSaveTextContainer: {
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: '#ECFED6',
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
    width: '60%',
    height: '20%',
    overflow: 'hidden',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  kitchenName: {
    fontSize: layout.size.sm_base,
    fontWeight: layout.weight.bold,
    color: layout.text.black,
  },
  deliveryInfo: {
    fontSize: layout.size.xs,
    fontWeight: layout.weight.light,
    color: layout.text.grey,
  },
  kitchenList: {
    height: screenWidth * 0.27,
    
  },
  chefCard: {
    margin:5,
    borderRadius: 99,
    flex: 1,
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
  chefImage: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
  },
});

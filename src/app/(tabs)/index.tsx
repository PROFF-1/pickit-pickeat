import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, Dimensions, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
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
const screenHeight = Dimensions.get('window').height;

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

  const categories = ['All', 'Home Cooked', 'Bakery', 'Groceries', 'Restaurant Overstock', 'Vegan']
  
  useFood()
  useCoupon()
  useKitchen()
  const {foodItems} = useFoodStore();
  const {coupons} = useCouponStore();
  const {kitchenItems} = useKitchenStore();
  const [isLiked, setIsLiked] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredFoodItems, setFilteredFoodItems] = useState(foodItems);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("All");


  const handleLikePress = (id: number) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(itemId => itemId !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  }

  const handleSearch=(text: string) => {
    
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredFoodItems(foodItems);
      return;
    }

    const filtered = foodItems.filter((item)=>{
      const ItemData= item.title.toLowerCase();
      const textData= text.toLowerCase();
      return ItemData.includes(textData);
    })


    console.log("Searching for:", text);
    setFilteredFoodItems(filtered);
  }


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
      setSearchTriggered(false);
    }}>
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
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
        onChangeText={(value) => handleSearch(value)}
        value={searchText}
         leftIcon={<Expo.Feather name="search" size={20} color={layout.colors.primary} />}
         rightIcon={searchTriggered ? 
          <TouchableOpacity style={styles.closeButton} onPress={()=>{
            setSearchTriggered(false);
            setSearchText('');
          }
          }>
         <Expo.MaterialIcons name="close" size={20} color={layout.colors.primary} /> 
         </TouchableOpacity> : 
         <TouchableOpacity style={styles.filterButton}>
          <Text>Filter</Text>
         <Expo.Ionicons name="filter" size={20} color={layout.colors.primary} />
         </TouchableOpacity>
         }
         onPress={() => {
          setSearchTriggered(true);
         }}
        />
      </View>

      {
        searchTriggered ? (
          searchText === '' ? 
          <TouchableWithoutFeedback style={styles.searchView} onPress={() => {
            Keyboard.dismiss();
            setSearchTriggered(false);
          }}>
            <Image source={require('../../assets/noSearch.jpg')} style={styles.noSearchImage}
             resizeMode="contain"
            />
            
          </TouchableWithoutFeedback> : (
          <View style={styles.searchView}>
            <Text style={{ fontSize: layout.size.sm_base, fontWeight: layout.weight.bold, color: layout.text.grey, alignSelf: 'center', marginVertical: 10 }}>
              Search Results for "{searchText}"
            </Text>
             <View style={styles.categoryFilterButtonContainer}>
            {/* {
              categories.map((category) => (
               
                <TouchableOpacity 
                  key={category}
                  style={[styles.categoryFilterButton, { backgroundColor: selectedCategory === category ? layout.colors.primary : layout.colors.quatenary }]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={{ color: selectedCategory === category ? layout.text.white : layout.text.black }}>
                    {category}
                  </Text>
                </TouchableOpacity>
                
              ))
            } */}

            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  key={item}
                  style={[styles.categoryFilterButton, { backgroundColor: selectedCategory === item ? layout.colors.primary : layout.colors.quatenary }]}
                  onPress={() =>{
                    setSelectedCategory(item);
                    setSearchText(item);
                  }}
                >
                  <Text style={{ color: selectedCategory === item ? layout.text.white : layout.text.black }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            </View>
            <FlatList 
              data={filteredFoodItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.searchedFoodcard}>
                  <View style={styles.overlay} />
                  <Image source={{ uri: item.imageUrl }} style={styles.searchedFoodimage} />
                  <Text style={styles.searchedFoodtitle} ellipsizeMode='tail'>{item.category}</Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
            />
          </View>
        )) :
        (
          <>

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
      <Text style={styles.sectionTitle}>Special Offers for you</Text>
      <View style={styles.discountCardHolder}>
      <FlatList
        data={coupons.slice(0, 10)} // Display only the first 10 items
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CouponCard item={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      
      />
      </View>

      {/*Kitchen chef List Section */}
      <Text style={styles.sectionTitle}>Featured Sellers</Text>
      <View style={styles.kitchenChefList}>
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
      {/*Kitchen List Section */}
      <Text style={styles.sectionTitle}>Kitchens near you</Text>
      <View style={styles.kitchenList}>
        <FlatList
          data={kitchenItems.slice(0, 5)} // Display only the first 5 items
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.kitchenCard}>
              {/*Kitchen Image Section */}
              <Image source={{ uri: item.avatar }} style={styles.kitchenImage} />
              {/*Kitchen Name and Arrival Time Section */}
              <View style={styles.NameContainer}>
              <Text style={styles.kitchenTitle} ellipsizeMode='tail'>{item.businessName}</Text>
              <Text style={styles.arrivalTime}>{`Arrival: ${item.arrivalTime.from} - ${item.arrivalTime.to} mins`}</Text>
              </View>
              {/*Kitchen Rating Section */}
              <View style={styles.kitchenRatingSection}>
                {/* Display the rating as stars */}
                <View style={styles.ratingContainerUpper}>
                  <View style={styles.rating}>
                    <Expo.FontAwesome name="star" size={16} color={layout.colors.primary} />
                    <Text>{item.rating}</Text>
                  </View>
                  <TouchableOpacity style={styles.like} onPress={() => handleLikePress(item.id)}>
                    <Expo.Entypo name={likedItems.includes(item.id) ? "heart" : "heart-outlined"} size={16} color= "green" />
                  </TouchableOpacity>
                </View>
                <View style={styles.ratingContainerLower}>
                {/*display delivery fee */}
                <Text style={styles.deliveryFee}>{`Delivery Fee: ${item.deliveryFee.toFixed(2)}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={false}
        />
      </View>
      </>
        )
    }
      </ScrollView>
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
    // marginTop: 10 
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
    backgroundColor: layout.colors.white_background,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width:74,
    borderRadius: 5,
    backgroundColor: layout.colors.quatenary,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height:40,
    width:40,
    borderRadius: 999,
    backgroundColor: layout.colors.quatenary,
  },
  discountCardHolder: {
    height: screenWidth * 0.55,
    paddingHorizontal: 10,
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

  sectionTitle: {
    fontSize: layout.size.sm_base,
    fontWeight: layout.weight.bold,
    color: layout.text.grey,
    marginTop: 10,
    paddingHorizontal: 10,
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
  kitchenChefList: {
    height: screenWidth * 0.3,
    marginVertical: screenHeight * 0.03,
    
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
  kitchenList: {
    // height: screenHeight * 0.5,
  },
  kitchenCard: {
    margin:15,
    borderRadius: 10,
    width: screenWidth ,
    height: screenWidth * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  arrivalTime: {
    fontSize: layout.size.xs,
    fontWeight: layout.weight.light,
    color: layout.text.grey,
  },
  kitchenImage: {
    width: '25%',
    height: '100%',
    borderRadius: 8,
  },
  kitchenTitle: {
    fontSize: layout.size.sm_base,
    fontWeight: layout.weight.bold,
    color: layout.text.black,
  },
  NameContainer: {
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '40%',
  },
  kitchenRatingSection: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    width: '35%',
  },
  ratingContainerUpper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainerLower: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: layout.colors.quatenary,
    justifyContent: 'space-between',
    width: 50,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  like: {
    marginLeft: 15,
  },
  deliveryFee: {
    fontSize: layout.size.sm,
    fontWeight: layout.weight.light,
    color: layout.text.grey,
  },

  searchView: {
    width: screenWidth,
    flex: 1,
    height: screenHeight ,
  },

  searchedFoodcard: {
    marginVertical:10,
    marginHorizontal:10,
    borderRadius: 10,
    flex: 1,
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
  },
  searchedFoodimage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  searchedFoodtitle: {
    fontSize: layout.size.sm_base,
    fontWeight: layout.weight.bold,
    color: layout.text.white,
    zIndex: 2,
    position: 'absolute',
    left: "40%",
    width: "50%",
    top: "40%",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity as needed
    borderRadius: 10,
    zIndex: 1,
  },
  noSearchImage: {
    width: "100%",
    height: "100%",
    alignSelf: 'center',
    marginTop: screenHeight * 0.1,
  },
  categoryFilterButton: {
  
   justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  categoryFilterButtonContainer: {
     flexDirection: 'row',
   alignItems: 'center',
   width: '100%',
   justifyContent: 'center',
   marginVertical: 10,
  },


});

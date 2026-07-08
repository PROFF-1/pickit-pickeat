import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

interface Listing {
  id: number;
  businessName: string;
  storeImage: string;
  VendorType: string;
  rating: number;
  businessAddress: string;
}
export default function FoodFeed() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    // Uses the dynamic network IP from your .env file
    const backendUrl = `${process.env.EXPO_PUBLIC_API_URL}/kitchens`;
    console.log("Fetching listings from:", backendUrl);
    
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        console.log("Fetched listings:", data);
      })
      .catch((err) => console.error("Network Error Connection:", err));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.storeImage }} style={styles.image} />
                <Text style={styles.title}>{item.businessName}</Text>
                <Text style={styles.category}>{item.VendorType}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
  card: { backgroundColor: '#fff', margin: 10, padding: 15, borderRadius: 10 },
  image: { width: '100%', height: 150, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  category: { color: 'gray', fontSize: 14 }
});

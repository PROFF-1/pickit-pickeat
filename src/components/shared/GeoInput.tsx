import { layout } from '@/constants/layout';
import * as Expo from '@expo/vector-icons';
import { useCallback, useRef, useState } from 'react';
import {
    ActivityIndicator, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

export interface GeocoderResult {
  id: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
  text: string;
}

interface GeocoderInputProps {
  placeholder?: string;
  onSelect: (result: GeocoderResult) => void;
  proximity?: [number, number]; // [lng, lat]
  country?: string;             // e.g. "GH"
}

// Ghana geographic center — used as proximity fallback so results bias toward Ghana
const GHANA_CENTER: [number, number] = [-1.0232, 7.9465];

export default function GeocoderInput({
  placeholder = 'Search location...',
  onSelect,
  proximity,
  country = 'gh',
}: GeocoderInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocoderResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (text: string) => {
    if (text.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);

    try {
      const effectiveProximity = proximity ?? GHANA_CENTER;
      const params = new URLSearchParams({
        q: text,
        limit: '6',
        lang: 'en',
        countrycode: country.toLowerCase(),
        lon: String(effectiveProximity[0]),
        lat: String(effectiveProximity[1]),
      });

      const response = await fetch(
        `https://photon.komoot.io/api?${params}`
      );
      const data = await response.json();

      const mapped: GeocoderResult[] = (data.features || []).map((f: any) => {
        const p = f.properties;
        const parts = [p.name, p.street, p.city ?? p.district, p.state, p.country]
          .filter(Boolean);
        return {
          id: `${p.osm_type}${p.osm_id}`,
          text: p.name,
          place_name: parts.join(', '),
          center: f.geometry.coordinates as [number, number],
        };
      });

      setResults(mapped);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [proximity, country]);

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(text), 400);
  };

  const handleSelect = (item: GeocoderResult) => {
    setQuery(item.place_name);
    setResults([]);
    setShowResults(false);
    Keyboard.dismiss();
    onSelect(item); // coordinates already in item.center
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* Input Row */}
      <View style={styles.inputRow}>
        <Expo.MaterialIcons name="search" size={20} color={layout.colors.primary} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleChangeText}
          returnKeyType="search"
          onSubmitEditing={() => search(query)}
        />
        {loading && (
          <ActivityIndicator size="small" color="#555" style={styles.icon} />
        )}
        {!loading && query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.icon}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Results Dropdown */}
      {showResults && results.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.resultItem,
                  index === results.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.resultTitle} numberOfLines={1}>
                  {item.text}
                </Text>
                <Text style={styles.resultSubtitle} numberOfLines={1}>
                  {item.place_name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* No results */}
      {showResults && results.length === 0 && !loading && query.length > 2 && (
        <View style={styles.dropdown}>
          <Text style={styles.noResults}>No results found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    width: '100%'
 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 12,
   
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    fontSize: 15,
    color: '#111',

  },
  icon: { paddingLeft: 8 },
  clearText: { fontSize: 14, color: '#999' },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 240,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    overflow: 'hidden',
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultTitle: { fontSize: 14, fontWeight: '600', color: '#111' },
  resultSubtitle: { fontSize: 12, color: '#888', marginTop: 2 },
  noResults: { padding: 16, color: '#888', textAlign: 'center' },
});
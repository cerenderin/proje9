import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Plus } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';

type MapCenter = {
  lat: number;
  lng: number;
};

export default function MapScreen() {
  const [mapCenter, setMapCenter] = useState<MapCenter>({ lat: 41.0082, lng: 28.9784 });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Bölge Ara"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: mapCenter.lat,
            longitude: mapCenter.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: mapCenter.lat,
              longitude: mapCenter.lng,
            }}
            title="Mama İstasyonu"
            description="Aktif İstasyon"
          />
        </MapView>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Plus color="white" size={24} />
        <Text style={styles.addButtonText}>İstasyon Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    zIndex: 1,
  },
  searchInputContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    marginTop: -8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#e65c00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

type NativeMapProps = {
  center?: {
    lat: number;
    lng: number;
  };
};

export default function NativeMap({ center }: NativeMapProps) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: center?.lat ?? 41.0082,
          longitude: center?.lng ?? 28.9784,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: center?.lat ?? 41.0082,
            longitude: center?.lng ?? 28.9784,
          }}
          title="Mama İstasyonu"
          description="Aktif İstasyon"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
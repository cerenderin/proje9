import React from 'react';
import { View, StyleSheet } from 'react-native';

type WebMapProps = {
  center?: {
    lat: number;
    lng: number;
  };
};

export default function WebMap({ center }: WebMapProps) {
  return (
    <View style={styles.container}>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${center?.lat ?? 41.0082},${center?.lng ?? 28.9784}`}
        style={{
          border: 0,
          width: '100%',
          height: '100%',
        }}
        allowFullScreen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function GarmentCard({item, onPress}: any) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress && onPress(item)}>
      <Image source={{uri: item.image}} style={styles.image} resizeMode="cover" />
      <View style={styles.meta}>
        <Text style={styles.title}>{item.brand} · {item.title}</Text>
        <Text style={styles.price}>₹{item.price}{item.discount ? `  (${item.discount}% off)` : ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 480,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#111',
    alignSelf: 'center'
  },
  image: {width: '100%', height: '78%'},
  meta: {padding: 12},
  title: {color: '#fff', fontWeight: '600', marginBottom: 6},
  price: {color: '#ddd'}
});

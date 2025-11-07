
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Button} from 'react-native';
import { addToWishlist } from '../services/storage';

export default function ProductDetail({route}: any) {
  const {item} = route.params;
  return (
    <ScrollView style={{backgroundColor:'#0F0F10'}}>
      <Image source={{uri: item.image}} style={{width:'100%', height:360}} />
      <View style={{padding:16}}>
        <Text style={{color:'#fff', fontSize:20, fontWeight:'700'}}>{item.brand} · {item.title}</Text>
        <Text style={{color:'#ddd', marginTop:10}}>₹{item.price} {item.discount ? ` (${item.discount}% off)` : ''}</Text>
        <Text style={{color:'#B6BDC6', marginTop:12}}>Rating: {item.rating}</Text>
        <View style={{marginTop:20}}>
          <Button title="Add to Wishlist" onPress={async ()=> { await addToWishlist(item.id); alert('Saved to wishlist'); }} />
        </View>
      </View>
    </ScrollView>
  );
}

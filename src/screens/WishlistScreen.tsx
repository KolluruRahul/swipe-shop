
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import { loadWishlist, removeFromWishlist } from '../services/storage';
import { GARMENTS } from '../api/mockData';
import GarmentCard from '../components/GarmentCard';

export default function WishlistScreen({navigation}: any) {
  const [list, setList] = useState<any[]>([]);
  useEffect(()=>{ refresh(); }, []);
  async function refresh() {
    const ids = await loadWishlist() || [];
    const items = GARMENTS.filter(g => ids.includes(g.id));
    setList(items);
  }
  return (
    <View style={{flex:1, backgroundColor:'#0F0F10'}}>
      <FlatList
        contentContainerStyle={{padding:16}}
        data={list}
        keyExtractor={i=>i.id}
        renderItem={({item})=> (
          <View style={{marginBottom:16}}>
            <GarmentCard item={item} onPress={(it:any)=> navigation.navigate('Product', {item: it})} />
            <Button title="Remove" onPress={async ()=> { await removeFromWishlist(item.id); refresh(); }} />
          </View>
        )}
        ListEmptyComponent={<View style={{padding:20}}><Text style={{color:'#fff'}}>No items</Text></View>}
      />
    </View>
  );
}

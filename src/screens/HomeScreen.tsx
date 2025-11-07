
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated, PanResponder, Dimensions, Button} from 'react-native';
import GarmentCard from '../components/GarmentCard';
import { GARMENTS } from '../api/mockData';
import { addToWishlist, loadWishlist, removeFromWishlist } from '../services/storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({navigation}: any) {
  const [data, setData] = useState(GARMENTS);
  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => { /* placeholder for prefetch */ }, []);

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({x: gesture.dx, y: gesture.dy});
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        swipe('right');
      } else if (gesture.dx < -120) {
        swipe('left');
      } else {
        Animated.spring(position, {toValue:{x:0,y:0}, useNativeDriver: true}).start();
      }
    }
  })).current;

  function swipe(dir: 'left'|'right') {
    Animated.timing(position, {toValue:{x: dir==='right' ? SCREEN_WIDTH : -SCREEN_WIDTH, y:0}, duration:200, useNativeDriver: true}).start(() => {
      const next = index + 1;
      setIndex(next);
      position.setValue({x:0,y:0});
    });
  }

  const current = data[index];
  if (!current) {
    return (
      <View style={styles.empty}>
        <Text style={{color:'#fff', fontSize:18}}>You're all caught up</Text>
        <Button title="Restart" onPress={() => setIndex(0)} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{flex:1, justifyContent:'center'}}>
        <Animated.View style={[styles.animatedCard, {transform: [{translateX: position.x}, {translateY: position.y}, {rotate: position.x.interpolate({inputRange:[-300,0,300], outputRange:['-15deg','0deg','15deg']})}]}]} {...panResponder.panHandlers}>
          <GarmentCard item={current} onPress={(it: any)=> navigation.navigate('Product', {item: it})} />
        </Animated.View>
      </View>
      <View style={styles.controls}>
        <Button title="Dislike" onPress={() => swipe('left')} />
        <Button title="Wishlist" onPress={async ()=> { await addToWishlist(current.id); alert('Saved to wishlist'); }} />
        <Button title="Like" onPress={() => swipe('right')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#0F0F10', paddingTop:40},
  animatedCard: {alignItems:'center'},
  controls: {flexDirection:'row', justifyContent:'space-around', padding:16},
  empty: {flex:1, backgroundColor:'#0F0F10', justifyContent:'center', alignItems:'center'}
});

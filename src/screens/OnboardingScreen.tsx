
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { savePrefs } from '../services/storage';

const CATEGORIES = ['Tshirts','Shirts','Jeans','Jackets','Shoes','Accessories'];

export default function OnboardingScreen({navigation}: any) {
  const [selected, setSelected] = useState<string[]>([]);
  function toggle(cat: string) {
    setSelected(s => s.includes(cat) ? s.filter(x => x!==cat) : [...s,cat]);
  }
  async function finish() {
    if (selected.length < 1) {
      alert('Pick at least 1 preference to continue');
      return;
    }
    await savePrefs(selected);
    navigation.replace('Home');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Tell us what you like</Text>
      <Text style={styles.sub}>Pick a few categories — we’ll use them to seed your deck.</Text>
      <ScrollView contentContainerStyle={styles.chips}>
        {CATEGORIES.map(c => {
          const active = selected.includes(c);
          return (
            <TouchableOpacity key={c} onPress={() => toggle(c)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={{color: active ? '#000' : '#fff'}}>{c}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View style={{margin:20}}>
        <Button title="Finish" onPress={finish} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#0F0F10', padding:20},
  h1: {color:'#fff', fontSize:22, fontWeight:'700', marginTop:20},
  sub: {color:'#B6BDC6', marginTop:8},
  chips: {flexDirection:'row', flexWrap:'wrap', marginTop:20},
  chip: {padding:10, borderRadius:20, backgroundColor:'#1E2023', margin:6},
  chipActive: {backgroundColor:'#6A5AE0'}
});


import React from 'react';
import {View, Text, Button} from 'react-native';
import { resetPrefs } from '../services/storage';

export default function ProfileScreen() {
  return (
    <View style={{flex:1, backgroundColor:'#0F0F10', padding:20}}>
      <Text style={{color:'#fff', fontSize:20, fontWeight:'700'}}>Profile</Text>
      <View style={{marginTop:20}}>
        <Button title="Reset Recommendations (clear prefs)" onPress={async ()=> { await resetPrefs(); alert('Preferences cleared'); }} />
      </View>
    </View>
  );
}

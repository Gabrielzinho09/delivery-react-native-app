import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { RolesItem } from './Item';
import useViewModel from './ViewModel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/MainStackNavigator';


interface Props extends StackScreenProps<RootStackParamList, 'RolesScreen'>{};

export const RolesScreen = ({navigation}: Props) => {

  const { user } = useViewModel();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;


  const [mode, setMode] = useState<any>('horizontal-stack');
  const [snapDirection, setSnapDirection] = useState<'left'|'right'>('left');

  const sortedRoles = user?.roles
  ? user.roles.sort((a, b) => a.id.localeCompare(b.id)) // Ordena alfabéticamente
  : [];


  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View>
      <FlatList
        data={sortedRoles}
        renderItem={({ item }) => <RolesItem rol={item} height={350} width={width - 90} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      />

        {/* <Carousel
          loop={false}
          width={width}
          height={height / 2}
          autoPlay={false}
          data={ sortedRoles }
          scrollAnimationDuration={1000}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={ ({item}) => <RolesItem rol={ item } height={ 380 } width={ width - 100 } navigation={navigation}/>}
          modeConfig={{
            snapDirection,
            stackInterval: 30
          }}
          mode={mode}
          /> */}
    </View>
  </GestureHandlerRootView>
  )
}

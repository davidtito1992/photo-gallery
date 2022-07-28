import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Detail from './Detail';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import union from '../../assets/union.png'

const Title = (props)=> (
  <View  style={styles.titleContainer}>
     <TouchableOpacity style={styles.imageContainer} >
    <Image 
    style={styles.image}
    source={union}
    />
    </TouchableOpacity>
    <Text
      style={styles.titleText}>
        Discover
    </Text>
  </View>
);

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShadowVisible: false,
          headerTitle: props => <Title {...props} />
        }}
      />
       <Stack.Screen
        name="Detail"
        component={Detail}
        options={({ navigation, route }) => ({
          headerShown:false,
        })}
      />
      {/*
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: { backgroundColor: 'black' },
          headerTitle: (
            <Text
              style={{
                fontSize: 24,
                color: 'rgb(255,232,31)',
                textAlign: 'center',
              }}>
            </Text>
          ),
          headerTitleStyle: {
            alignSelf: 'center',
          },
          headerTintColor: 'rgb(255,232,31)',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default Screens;

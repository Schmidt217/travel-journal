/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../assets/colors';
import {
  ExploreStackNavigator,
  HomeStackNavigator,
  ProfileStackNavigator,
  TripsStackNavigator,
} from './StackNavigator';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    // this will turn the 'pill to yellow'
    // to make it 'transparent, you can make it same color as your background
    ...DefaultTheme.colors,
    secondaryContainer: 'yellow',
  },
};

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={Colors.white}
      inactiveColor={Colors.cream}
      shifting={true}
      theme={theme}
      barStyle={{ backgroundColor: Colors.deepBlue }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="home" color={color} size={30} />
          ),
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="account" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="My Trips"
        component={TripsStackNavigator}
        options={{
          tabBarLabel: 'My Trips',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="map" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStackNavigator}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="airplane" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

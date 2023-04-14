import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from '../assets/colors';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import ExploreScreen from '../screens/ExploreScreen';

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const TripsStack = createNativeStackNavigator();
const ExploreStack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.darkBlue,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          color: colors.white,
        },
      }}>
      <HomeStack.Screen name="Sum Trip" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.darkBlue,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          color: colors.white,
        },
      }}>
      <ProfileStack.Screen name="Sum Trip" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export const TripsStackNavigator = () => {
  return (
    <TripsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.darkBlue,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          color: colors.white,
        },
      }}>
      <TripsStack.Screen name="Sum Trip" component={MyTripsScreen} />
    </TripsStack.Navigator>
  );
};

export const ExploreStackNavigator = () => {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.darkBlue,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          color: colors.white,
        },
      }}>
      <ExploreStack.Screen name="Sum Trip" component={ExploreScreen} />
    </ExploreStack.Navigator>
  );
};

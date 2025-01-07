import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import React, { useState, useRef, useEffect,createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';

import Login from './src/Login';
import HomeScreen from './src/HomePage/Home.js';
import Dining from './src/Components/Dining/Dining';
import GlanceMain from './src/Components/Today_at_glance/GlanceMain';
import Reservations from './src/Components/Dining/Reservations';
import MenuAndHours from './src/Components/Dining/MenuAndHours';
import Calendar from './src/Components/Dining/Calendar.js';
import Events from './src/Components/Events/Events.js';
import RecentNews from '@/src/Components/Dining/RecentNews';
import Statements from '@/src/Components/Statements/Statements';
import Profile from '@/src/Components/Profile/Profile';
import MyContext from './src/UserContext';



// const UserContext = createContext();


const Colors = {
  primary: '#5773A2', // Primary color
  white: '#fff', // White color
};

const Stack = createStackNavigator();

// Back button component
const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 5 }}>
    <Image
      source={require('./src/images/back_icon.png')}
      style={{ width: 30, height: 20 }}
    />
  </TouchableOpacity>
);

export default function App() {
  // Define username and setUsername state
  const [username, setUsername] = useState('Guest'); // Add initial value for username

  return (
    // <UserContext.Provider value={{ username, setUsername }}>
      <GluestackUIProvider mode="light">
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: Colors.white,
                ...TransitionPresets.ScaleFromCenterAndroid,
              }}
            >
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'Home',
                  headerLeft: ({ navigation }) => (
                    <BackButton onPress={() => navigation.goBack()} />
                  ),
                  headerShown: false,
                }}
              />
                <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Dining" component={Dining} />
              <Stack.Screen name="Today At Glance" component={GlanceMain} />
              <Stack.Screen name="Reservations" component={Reservations} options={{
          title: 'Dining Reservation',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
        }} />
              <Stack.Screen name="MenuAndHours" component={MenuAndHours} />
              <Stack.Screen name="Calendar" component={Calendar} />
              <Stack.Screen name="Events" component={Events} />
              <Stack.Screen name="RecentNews" component={RecentNews} />
              <Stack.Screen name="Statements" component={Statements} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </GluestackUIProvider>
    // </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

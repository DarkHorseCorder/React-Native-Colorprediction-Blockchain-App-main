import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { useEffect } from "react";

import Betting from "./src/pages/Betting";
import Recharge from "./src/pages/Recharge";
import Withdraw from "./src/pages/Withdraw";
import Promotion from "./src/pages/Promotion";
import Bonus from "./src/pages/Bonus";
import History from "./src/pages/History";
import Login from './src/pages/Auth/Login';
import Register from './src/pages/Auth/Register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return <Tab.Navigator
    initialRouteName="Betting"
    screenOptions={({ navigation }) => ({
      headerShown: false,
      tabBarStyle:{backgroundColor: '#000', borderTopWidth: 0}
    })}
    tabBarOptions={{
      activeTintColor: '#A24BDB',
      inactiveTintColor: '#1B1A1A',
   }}
  >
    <Tab.Screen
      name="Betting"
      component={Betting}
      options={{
        tabBarLabel: 'Betting',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="trophy-outline" color={color} size={size} />
        ),
        headerShown: false
      }}
    />
    <Tab.Screen
      name="Promotion"
      component={Promotion}
      options={{
        tabBarLabel: 'Promotion',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="gift-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Recharge"
      component={Recharge}
      options={{
        tabBarLabel: 'Recharge',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="card-bulleted-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Withdraw"
      component={Withdraw}
      options={{
        tabBarLabel: 'Withdraw',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="card-bulleted-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarButton: () => null,
        tabBarVisible: false,  
      }}
    />
    <Tab.Screen
      name="Bonus"
      component={Bonus}
      options={{
        tabBarButton: () => null,
        tabBarVisible: false,  
      }}
    />
  </Tab.Navigator>
}

import SERVER_URL from './src/config/config';
import { setAuthToken } from './src/config/config';
axios.defaults.baseURL = SERVER_URL+"/api";
axios.interceptors.response.use(
  function(successRes) {
    return successRes;
  }, 
  function(error) {
    if (error.response.status === 401) {
      store.dispatch({type: 'LOGOUT'});
      store.dispatch({type: 'STOP_LOADING'});
    }
    return error;
  }
);
import store from './src/store';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={({ navigation }) => ({
            headerShown: false
          })}>
          <Stack.Screen name="Navigation" component={BottomNavigator} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
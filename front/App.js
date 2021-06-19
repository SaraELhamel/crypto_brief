import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SignUpScreen from "./screens/SignIn";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import profil from "./screens/User";
import home from "./screens/home"
import CryptoDetails from "./screens/crypto_det"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerNav() {
  return(
      <Drawer.Navigator   drawerStyle={{
          backgroundColor: 'white',
          width: 150,
          

        
        }}   drawerContentOptions={{
          activeTintColor: '#fff',
         
        }} initialRouteName="home">
          <Drawer.Screen name="home" component={home} />
          <Drawer.Screen name="profil" component={profil}/>
          
        </Drawer.Navigator>
      
      
      )
    
  }

function App() {
    return (

    
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignUpScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
    
    
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{
                title: "Inscription",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "black",
                },
              }}
            /> 
     <Stack.Screen   name="DrawerNav" component={DrawerNav} 
         options={{
         title: "Cryptocurrency List",
         headerTintColor:'white',
         headerStyle:{
           backgroundColor: '#000000',
           
         }, 
       }}/>  
            <Stack.Screen
              name="profil"
              component={profil}
              options={{
                title: "Inscription",
                headerTintColor: "purple",
                headerStyle: {
                  backgroundColor: "black",
                },
              }}
            /> 
                 <Stack.Screen
              name="home"
              component={home}
              options={{
                title: "Inscription",
                headerTintColor: "#ed3b45",
                headerStyle: {
                  backgroundColor: "#000000",
                },
              }}
            /> 

<Stack.Screen
              name="CryptoDetails"
              component={CryptoDetails}
              options={{
                title: "Inscription",
                headerTintColor: "#ed3b45",
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            /> 
    
          </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
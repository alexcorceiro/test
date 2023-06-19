import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UpdateBirthScreen from "../pages/birth/BirthUpdate";
import BirthDetailScreen from "../pages/birth/BirthDetails";
import BirthListScreen from "../pages/birth/BirthList";



const StackBirth = createStackNavigator();

function BirthStackNavigator() {
  return (
    <StackBirth.Navigator initialRouteName="BirthList" screenOptions={{ headerShown: false }}>
      <StackBirth.Screen name="BirthList" component={BirthListScreen} />
      <StackBirth.Screen name="BirthDetail" component={BirthDetailScreen} />
      <StackBirth.Screen name="UpdateBirth" component={UpdateBirthScreen}/>
      {/* <StackBirth.Screen name="AddBirth" component={AddBirthScreen}/> */}
    </StackBirth.Navigator>
  );
}

export default BirthStackNavigator;
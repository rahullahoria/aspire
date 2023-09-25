import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SpendingLimitScreen from '../screens/SpendingLimit/SpendingLimit.screen';
import Tabs from './tabs';



const stackParent = createNativeStackNavigator();



const stack = () => {
    return (
        <stackParent.Navigator
        initialRouteName='Tabs'
        screenOptions={{
            headerShown: false,
        }}
      >
        <stackParent.Screen
          name="Tabs"
          component={Tabs}
        />
        <stackParent.Screen
          name="SpendingLimit"
          component={SpendingLimitScreen}
        />
      </stackParent.Navigator>
    )
}

export default stack


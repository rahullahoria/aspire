import React from 'react';
import { StyleSheet} from 'react-native';

import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store/store';
import NavStack from './nav/stack';
import LoadingIndicator from './shared/components/LoadingIndicator/LoadingIndicator.component';
import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';
import { Text } from 'react-native-elements';



export default function App() {

  const [fontsLoaded] = useFonts({
    'AvenirNext-Bold': require('./assets/fonts/Avenir_Next_Pro/AvenirNextLTPro-Bold.otf'),
    'AvenirNext-Demi': require('./assets/fonts/Avenir_Next_Pro/AvenirNextLTPro-Demi.otf'),
    'AvenirNext-Medium': require('./assets/fonts/Avenir_Next_Pro/AvenirNextLTPro-Medium.otf'),
    'AvenirNext-Regular': require('./assets/fonts/Avenir_Next_Pro/AvenirNextLTPro-Regular.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {/* <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: 30 }}>Inter SemiBoldItalic</Text>
      <Text style={{ fontFamily: 'AvenirNext-Medium', fontSize: 30 }}>Inter SemiBoldItalic</Text>
      <Text style={{ fontFamily: 'AvenirNext-Regular', fontSize: 30 }}>Inter SemiBoldItalic</Text> */}
      
      <StatusBar style="light" />
      <NavigationContainer>
        <SafeAreaProvider>
            {/* <Tabs /> */}
            <LoadingIndicator />
            <NavStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

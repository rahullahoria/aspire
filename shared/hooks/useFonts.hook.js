import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    AvenirNextLTProBold: require('../../assets/fonts/AvenirNextLTPro-Bold.otf'),
    AvenirNextRegular: require('../../assets/fonts/AvenirNextLTPro-Regular.otf'),
  });
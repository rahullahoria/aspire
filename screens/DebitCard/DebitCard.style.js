import {StyleSheet} from 'react-native';
import {  Dimensions } from 'react-native'
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'relative',
        paddingRight: 24,
    },
    text: {
        color: "blue",
    },
    background: {
      backgroundColor: '#0C365A',
      flex:1
    },
    behind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        backgroundColor: 'white',
    },
})
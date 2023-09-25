import {StyleSheet} from 'react-native';



export const styles = StyleSheet.create({
    loadingOverlay:{
        height:"100%", 
        width:"100%", 
        backgroundColor: 'rgba(0,0,0,0.25)', 
        position:'absolute', 
        alignContent:'center', 
        justifyContent:'center',
        zIndex: 9999
    },
})
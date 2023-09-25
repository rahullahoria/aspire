import React from 'react'
import {  View, SafeAreaView, Image, Dimensions, TouchableOpacity, Text } from 'react-native'

import tw from 'tailwind-react-native-classnames'
import SpendingLimitBottomComponent from '../../shared/components/SpendingLimitBottomComponent'

import {styles} from './SpendingLimit.style';



const {height} = Dimensions.get('screen');

const SpendingLimitScreen = (props) => {
    const paddingTop = (height > 700) ? 48 : 20;//Based on an observation in a bezelless android device
    return (
        <SafeAreaView style={styles.background}>
            <View style={[tw `p-0`, {flexDirection: 'column'}]}>
                <View style={{paddingLeft:24, paddingRight: 24, paddingTop: paddingTop, height: height/5, flexDirection: 'column'}}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.pop();
                            }}
                        >
                            <Image
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: "contain",
                                    marginLeft:0,
                                }}
                                source={require("../../assets/arrowLeft.png")}
                            />
                        </TouchableOpacity>
                        <View style={{flex:1}}>
                            {/* A Space bar in between */}
                        </View>
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: "contain",
                                marginRight:0,
                            }}
                            source={require("../../assets/Logo.png")}
                        />
                    </View>
                    <Text style={{fontFamily: 'AvenirNext-Bold', color:'white', fontWeight:'bold', fontSize:24, flex: 1, height: 33}}>Spending limit</Text>
                </View>
                <SpendingLimitBottomComponent props={props}/>
            </View>
        </SafeAreaView>
    )
}

export default SpendingLimitScreen
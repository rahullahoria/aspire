import React, { useEffect, useState } from 'react'
import {  View, SafeAreaView, Image, Dimensions, Alert } from 'react-native'
import { Text } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

import CardOptions from '../../shared/components/CardOptions';
import { selectAvailableBalance, selectCurrencyUnits, setCompleteCardDetails } from '../../store/slices/debitCard.slice';
import { selectAppColorSolid, setAppColorSolid, setIsLoadingIndicatorDisplayed, setLoadingIndicatorText} from '../../store/slices/app.slice';
import { setUserId } from '../../store/slices/user.slice';

import { useDispatch, useSelector, useStore } from 'react-redux';
import debitCardDetailsAPI from '../../shared/apis/debitCard.api';

import {styles} from './DebitCard.style';

const { height} = Dimensions.get('screen');


const DebitCardControlCenterScreen = (props) => {
    const store = useStore();
    const dispatch = useDispatch();
    let state = store.getState()
    let currency = useSelector(selectCurrencyUnits);
    let availableBalance = useSelector(selectAvailableBalance);
    let appColorSolid = useSelector(selectAppColorSolid);

    const [cardDetails, setCardDetails] = useState([]);

    const manageLoadingIndicator = (displayFlag, message) => {
        dispatch(
            setIsLoadingIndicatorDisplayed({
                isLoadingIndicatorDisplayed: displayFlag,
            })
        )
        dispatch(
            setLoadingIndicatorText({
                loadingIndicatorText: message,
            })
        )
    }

    const cardDetailsApi = async (userId) => {

        try {
            if(userId == null){
                return;
            }
            const response = await debitCardDetailsAPI.get(userId+"")
            .then()
            .catch((error) => {
                console.log("error",error.message);
                manageLoadingIndicator(false, "");
                return createOneButtonAlert("Error", "Error Encountered in fetching data");
                }
            );
    
            console.log("response", userId, response);
            
            manageLoadingIndicator(false, "");
            if(response.status != 200){
                return;
            }
            else{
                let tempCardDetails = response.data;
                if(tempCardDetails.cardNumber != null){
                    dispatch(
                        setCompleteCardDetails(response.data)
                    );
                    
                    dispatch(
                        setAppColorSolid({
                            appColorSolid: "#01D167",
                        })
                    )
                    setCardDetails(response.data);  // The API returns just card details JSON in case of successfull query
                }
                else{
                    return createOneButtonAlert("Error", "No Cards Registered for the your ID");
                }
            }
        } catch (error) {
            console.log("error",error.message);
        }
        
    }

    const setUserIdByLocalStorage = () => {
        
        // this can be loaded by localstorage or user slice
        const userId = 1;
        dispatch(
            setUserId({
                userId: userId,
            })
        )
        manageLoadingIndicator(true, "Fetching Debit Card Details");
        cardDetailsApi(1);
    }

    useEffect(() => {
        setUserIdByLocalStorage();
    }, []);


    const createOneButtonAlert = (title, message) =>
        Alert.alert(
            title,
            message,
            [
                {
                text: "OK",
                onPress: () => {},
                }
            ]
    );
    const paddingTop = (height > 700) ? 48 : 20;//Based on an observation in a bezelless android device
    return (
        <SafeAreaView style={styles.background}>
            <View style={tw `p-0`}>
                <View style={{paddingLeft:24, paddingTop: paddingTop}}>
                    <View style={styles.container}>
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: "contain",
                            }}
                            source={require("../../assets/Logo.png")}
                        />
                    </View>
                    <Text style={{fontFamily: 'AvenirNext-Bold', color:'white', fontWeight:'bold', fontSize:24}}>Debit Card</Text>
                    <Text style={{fontFamily: 'AvenirNext-Medium', color:'white', fontSize:14, marginTop: 22}}>Available balance</Text>
                    <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
                        {/* View For Displaying Currency and available balance amount */}
                        <View style={{backgroundColor:appColorSolid, width:40, height:22, borderRadius: 4, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontFamily: 'AvenirNext-Bold', color:'white', fontWeight:'bold', fontSize:12}}>
                                {currency}
                            </Text>
                        </View>
                        <Text style={{fontFamily: 'AvenirNext-Bold', color:'white', fontWeight:'bold', fontSize:24, paddingLeft:10}}>
                                {availableBalance}
                        </Text>
                    </View>
                </View>
            </View>
            <CardOptions props={props}/>
          
        </SafeAreaView>
    )
}

export default DebitCardControlCenterScreen;
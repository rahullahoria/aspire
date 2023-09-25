import React from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import { LinearProgress } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector, useStore } from 'react-redux';
// import MenuItems from './MenuItems';
import CardView from './CardView/CardView.component';
import { selectCardNumber, selectCurrencyUnits, selectWeeklySpendingLimit, selectWeeklySpendingLimitExhausted, setWeeklySpendingLimit, setWeeklySpendingLimitExhausted } from '../../store/slices/debitCard.slice';
import { selectAppColorSolid, setAppColorSolid, setIsLoadingIndicatorDisplayed, setLoadingIndicatorText} from '../../store/slices/app.slice';
import { selectUserId } from '../../store/slices/user.slice';
import debitCardDetailsAPI from '../apis/debitCard.api';

const {width, height} = Dimensions.get('screen');

const CARD_WIDTH = (width-48);  //Ensures that the currency notation and the card's left end align just like the mock up
const CARD_HEIGHT = 0.6*CARD_WIDTH; // Aspect Ratio of the card is 0.6 [h/w]

const POP_UP_HEIGHT = (height >= 844) ? 0.73*height : 0.66*height;



const renderSpendingLimitBar = (renderFlag, limitExhausted, totalLimit, currencyUnits, appColorSolid) => {
    if(renderFlag === true){
        return (
            <View style={{backgroundColor: 'white'}}>
                <View style={{height: 39, marginLeft: 24, marginRight: 24, marginTop: 24}}>
                    <View style={{marginBottom: 6, flexDirection: 'row', marginLeft: 0, marginRight: 0, alignContent:'space-between'}}>
                        {/* View for heading and numerical representation of limit*/}
                        <Text style={{fontFamily: 'AvenirNext-Medium',color:'black', fontWeight:'400', fontSize:13, alignSelf:'flex-start', flex: 1}}>Debit card spending limit</Text>
                        <View style={{alignSelf:'flex-end', flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'AvenirNext-Bold', color:appColorSolid, fontWeight:'600', fontSize:12}}>{currencyUnits}{limitExhausted}</Text>
                            <Text style={{fontFamily: 'AvenirNext-Medium', color:'#22222233', fontWeight:'300', fontSize:12}}> | {currencyUnits}{totalLimit}</Text>
                        </View>
                    </View>
                    <LinearProgress
                        color={appColorSolid}
                        trackColor={appColorSolid+'10'}
                        variant='determinate'
                        value={limitExhausted/totalLimit}
                        style={{
                            height: 15,
                            borderRadius: 30,
                            marginBottom: 0,
                        }}
                    />
                </View>
            </View>
        );
    }
    else{
        return (<View style={{display:'none'}}></View>);
    }
}

const renderButton = (buttonState) => {
    if(buttonState == -1){
        //No Button Present
        return (<View style={{display:'none'}}></View>);
    }
    else if(buttonState == 0){
        return (
            <View style={{
                alignItems: 'flex-end',
                flex:1
            }}>
                <Image
                    style={{
                        width: 34,
                        height: 20,
                    }}
                    source={require("../../assets/toggle.png")}
                    resizeMode='contain'
                />
            </View>
        );
    }
    else if(buttonState == 1){
        return (
            <View style={{
                alignItems: 'flex-end',
                flex:1
            }}>
                <Image
                    style={{
                        width: 34,
                        height: 20,
                    }}
                    source={require("../../assets/activeToggle.png")}
                    resizeMode='contain'
                />
            </View>
        );
    }
}

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

    

const CardOptions = (props) => {
    const store = useStore();
    const dispatchEvent = useDispatch();

    let state = store.getState()

    let spendingLimit = useSelector(selectWeeklySpendingLimit);
    let spendingLimitExhausted = useSelector(selectWeeklySpendingLimitExhausted);
    let cardNumber = useSelector(selectCardNumber);
    let userId = useSelector(selectUserId);
    let currencyUnits = useSelector(selectCurrencyUnits);
    let isSpendingLimitSet = (spendingLimit != null && spendingLimit > 0);
    let appColorSolid = useSelector(selectAppColorSolid);
    let scrollheight = isSpendingLimitSet ? 580 : 540;
    
    let menuArr = [
        {
            key: "MenuItem#1",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Top-up account",                                    // The Title of the menu Item
            menuSubtitle: "Deposit money to your account to use with card", // The subtitle of the menu Item
            iconAssetUri: require("../../assets/insight.png"),                             // Uri for the icon
            buttonState: -1,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active 
            itemEnabled: false,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        },
        {
            key: "MenuItem#2",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Weekly spending limit",                                    // The Title of the menu Item
            menuSubtitle: isSpendingLimitSet ? "Your weekly spending limit is "+currencyUnits+" "+spendingLimit : "You haven't set any spending limit on card", // The subtitle of the menu Item
            iconAssetUri: require("../../assets/Transfer-2.png"),                             // Uri for the icon
            buttonState: isSpendingLimitSet ? 1 : 0,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active
            itemEnabled: true,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        },
        {
            key: "MenuItem#3",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Freeze card",                                    // The Title of the menu Item
            menuSubtitle: "Your debit card is currently active", // The subtitle of the menu Item
            iconAssetUri: require("../../assets/Transfer-3.png"),                             // Uri for the icon
            buttonState: 0,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active
            itemEnabled: false,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        },
        {
            key: "MenuItem#4",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Get a new card",                                    // The Title of the menu Item
            menuSubtitle: "This deactivates your current debit card", // The subtitle of the menu Item
            iconAssetUri: require("../../assets/Transfer-1.png"),                             // Uri for the icon
            buttonState: -1,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active
            itemEnabled: false,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        },
        {
            key: "MenuItem#5",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Deactivated cards",                                    // The Title of the menu Item
            menuSubtitle: "Your previously deactivated cards", // The subtitle of the menu Item
            iconAssetUri: require("../../assets/Transfer.png"),                             // Uri for the icon
            buttonState: -1,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active
            itemEnabled: false,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        }
    ];

    const manageLoadingIndicator = (displayFlag, message) => {
        dispatchEvent(
            setIsLoadingIndicatorDisplayed({
                isLoadingIndicatorDisplayed: displayFlag,
            })
        )
        dispatchEvent(
            setLoadingIndicatorText({
                loadingIndicatorText: message,
            })
        )
    }

    const removeSpendingLimitApi = async () => {
        
        const params = {
            cardNumberVisible: false
        }
    
        //MARK: this line is used to contact one of the two mocked dumb APIs that return either success(90%) or failure(10%) in changing the limit
        let randomizedSucessfulApi = (Math.floor(Math.random() * 100) < 10) ? "/0" : ""+userId;
        console.log("API CALL : "+randomizedSucessfulApi);
        console.log(params);
    
        const response = debitCardDetailsAPI.put(randomizedSucessfulApi, params)
        .then(response => {
            manageLoadingIndicator(false, "");
            // Response is designed to be in the form of 
            // For: setSpendingLimitf -> {success: "false", reason: "You are not allowed to remove spending limit. Contact your administrator", limitExhausted: -1}    //The setting/removal failed at backend due to a restriction by card manager
            // For: setSpendingLimits -> {success: "true", reason: "", limitExhausted: <numericalValue>} //Limit set successfully
            // setIndicatorDisplayed(false);
            if(response.status != 200){
                return createOneButtonAlert("Error", "Error Encountered in Removing Spending Limit");
            }
            else{
                console.log(response.data);
               
                    if(response.data.cardNumberVisible == false){
                        dispatchEvent(setWeeklySpendingLimit({
                            weeklySpendingLimit: -1,
                        }));
                        dispatchEvent(setWeeklySpendingLimitExhausted({
                            weeklySpendingLimitExhausted: -1,
                        }));
                    }
                   
               
            }
        })
        .catch((error) => {
            console.log(response);
            console.log(error);
            manageLoadingIndicator(false, "");
            // setIndicatorDisplayed(false);
            return createOneButtonAlert("Error", "Error Encountered in Removing Spending Limit");
        });
        
    }

    const loadMenuItem = (menuKey, buttonState) => {
        switch(menuKey) {
            case "MenuItem#1":
                break;
            case "MenuItem#2":
                if(buttonState == 0){
                    //i.e. The Spending limit is not set ->  Open the Spending Limits screen
                    props.props.navigation.push('SpendingLimit');
                }
                else if(buttonState == 1){
                    //i.e. The Spending limit is already set, unset it
                    manageLoadingIndicator(true, "Removing Spending Limit");
                    removeSpendingLimitApi();
                }
                
                break;
            case "MenuItem#3":
                break;
            case "MenuItem#4":
                break;
            case "MenuItem#5":
                break;
            default:
                //Do Nothing
                return
        }
    }

    const totalMenuItemHeight = (isSpendingLimitSet) ? (CARD_HEIGHT+32-90+65+(63*menuArr.length)+243) : (CARD_HEIGHT+(63*menuArr.length)+243);
        //CARD_HEIGHT - > height of Debit Card
        //32 -> Height of Show/Hide button
        //-90-> margin adjustment of the card
        //63 -> Height + Margin of each menu item
        //65 -> Height + Margin of bar item
        //243-> Top Transparent view

    //Calculating padding below menu items
    const extraPaddingNeeded = (totalMenuItemHeight > (height-40)) ? 60 : ((height-40)-totalMenuItemHeight);
    return (
        <SafeAreaView style={{top:0, bottom:0, ...styles.behind}}>
            <FlatList 
                style={{
                    position: 'absolute',
                    top:0,
                    bottom: 0,
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: height-40,  //-40 for tab bar
                    flex: 1,
                }}
                bounces={true}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View style={{alignItems: 'center'}}>
                            <View style={{backgroundColor:'transparent', flex: 1, height: height*0.35}}>
                                {/* A view that stays transparent */}
                            </View>
                            <CardView />
                        </View>
                        {renderSpendingLimitBar(isSpendingLimitSet, spendingLimitExhausted, spendingLimit, currencyUnits, appColorSolid)}
                    </View>
                }
                ListFooterComponent={
                    <View style={{backgroundColor: 'white', height: extraPaddingNeeded, marginTop: -1}}/>
                    //Padding at bottom
                }
                data={menuArr}
                renderItem={({item}) => {
                    return (
                        <View style={{backgroundColor: 'white', zIndex: -100, marginTop: -1}}>
                            <View style={{marginLeft: 24, marginRight: 24}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        loadMenuItem(item.key, item.buttonState);
                                    }}
                                    disabled={!(item.itemEnabled)}
                                >
                                    <View style={styles.menuItem}>
                                        <Image
                                            style={{width: 32}}
                                            source={item.iconAssetUri}
                                            resizeMode='contain'
                                        />
                                        <View style={{flexDirection:'column', marginLeft:12}}>
                                            <Text style={styles.menuTitle}>{item.menuTitle}</Text>
                                            <Text style={styles.menuSubtitle}>{item.menuSubtitle}</Text>
                                        </View>
                                        {renderButton(item.buttonState)}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
                scrollEnabled={true}
            >           
            </FlatList>
        </SafeAreaView>
    )
}

export default CardOptions

const styles = StyleSheet.create({
    behind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top:0,
        bottom: 0,
        backgroundColor: 'transparent',
        width: '100%',
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        height: 41,
        marginTop: 22,
        alignContent: 'center',
        alignItems: 'center'
    },
    menuTitle: {
        height: 19,
        fontFamily: 'AvenirNext-Medium',
        fontWeight: '400',
        fontSize:14,
        alignContent:'flex-start',
        flex:1,
        
    },
    menuIcon: {
        width: 32,
        height: 32,
    },
    menuSubtitle:{
        height: 18,
        fontWeight: '300',
        fontFamily: 'AvenirNext-Regular',
        fontSize: 13,
        color: 'rgba(34,34,34,0.4)'
    },
})

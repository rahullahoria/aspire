import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux';
import { selectIsLoadingIndicatorDisplayed, selectLoadingIndicatorText} from '../../../store/slices/app.slice';

import {styles} from './LoadingIndicator.style';

const LoadingIndicator = () => {

    const isLoadingIndicatorDisplayed = useSelector(selectIsLoadingIndicatorDisplayed);
    const loadingIndicatorText = useSelector(selectLoadingIndicatorText);

    return (
        <View 
            style={isLoadingIndicatorDisplayed ? styles.loadingOverlay : {display: 'none'}}
        >
            <ActivityIndicator 
                size="large"
                color="#000"
            />
            <Text style={{textAlign:'center', fontSize: 15, fontWeight: '700'}}>{loadingIndicatorText}</Text>
        </View>
    )
}

export default LoadingIndicator
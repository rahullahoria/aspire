import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cardNumberVisible: false,       
    cardNumber: null,              
    cardValidThru: null,           
    cardCVV: null,                 
    nameOnCard: null,              
    availableBalance: null,        
    currencyUnits: null,            
                                    
                                    
    weeklySpendingLimit:null,       
    weeklySpendingLimitExhausted:null
};




export const debitCard = createSlice({
    name: 'debitCard',   
    initialState,
    reducers: {
        setCompleteCardDetails: (state, action) => {
            state.cardNumberVisible = action.payload.cardNumberVisible;
            state.cardNumber = ''+action.payload.cardNumber;
            state.cardValidThru = action.payload.cardValidThru;
            state.cardCVV = action.payload.cardCVV;
            state.nameOnCard = action.payload.nameOnCard;
            state.availableBalance = ''+action.payload.availableBalance;
            state.currencyUnits = action.payload.currencyUnits;
            state.weeklySpendingLimit = action.payload.weeklySpendingLimit;
            state.weeklySpendingLimitExhausted = action.payload.weeklySpendingLimitExhausted;
        },
        setCardNumberVisible: (state, action) => { 
            state.cardNumberVisible = action.payload.cardNumberVisible;
        },
        setCardNumber: (state, action) => { 
            state.cardNumber = action.payload.cardNumber;
        },
        setCardValidThru: (state, action) => { 
            state.cardValidThru = action.payload.cardValidThru;
        },
        setCardCVV: (state, action) => { 
            state.cardCVV = action.payload.cardCVV;
        },
        setNameOnCard: (state, action) => {
            state.nameOnCard = action.nameOnCard.nameOnCard;
        },
        setAvailableBalance: (state, action) => { 
            state.availableBalance = action.payload.availableBalance;
        },
        setCurrencyUnits: (state, action) => { 
            state.currencyUnits = action.payload.currencyUnits;
        },
        setWeeklySpendingLimit: (state, action) => { 
            state.weeklySpendingLimit = action.payload.weeklySpendingLimit;
        },
        setWeeklySpendingLimitExhausted: (state, action) => { 
            state.weeklySpendingLimitExhausted = action.payload.weeklySpendingLimitExhausted;
        },      
    }
});


export const { setCardNumberVisible, setCardNumber, setCardValidThru, setCardCVV, setCompleteCardDetails, setAvailableBalance, setCurrencyUnits, setWeeklySpendingLimit, setWeeklySpendingLimitExhausted } = debitCard.actions;

export const selectCardNumberVisible = (state) => state.debitCard.cardNumberVisible;
export const selectCardNumber = (state) => state.debitCard.cardNumber;
export const selectCardValidThru = (state) => state.debitCard.cardValidThru;
export const selectCardCVV = (state) => state.debitCard.cardCVV;
export const selectNameOnCard = (state) => state.debitCard.nameOnCard;
export const selectAvailableBalance = (state) => state.debitCard.availableBalance;
export const selectCurrencyUnits = (state) => state.debitCard.currencyUnits;
export const selectWeeklySpendingLimit = (state) => state.debitCard.weeklySpendingLimit;
export const selectWeeklySpendingLimitExhausted = (state) => state.debitCard.weeklySpendingLimitExhausted;


export default debitCard.reducer;    
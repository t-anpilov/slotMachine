import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BalanceState {
    balance: number
  };
  
  const initialState: BalanceState = {
    balance: 100
  };

export const balanceSlice = createSlice({
    name: "balance",
    initialState: initialState,
    reducers: {
      increaseBalance: (state, action: PayloadAction<number>) => {
        state.balance += action.payload;
      },

      reduceBalance: (state, action: PayloadAction<number>) => {
        state.balance -= action.payload;
      },
    }
});


export const { increaseBalance, reduceBalance } = balanceSlice.actions;


export default balanceSlice.reducer;
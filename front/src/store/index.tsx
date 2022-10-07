import { configureStore } from "@reduxjs/toolkit";

import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  bookList: any[];
}

const initialState: CartState = {
  bookList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<any>) => {
      const isAvailable = state.bookList.find(
        (item) => item.id === action.payload?.id
      );

      if (isAvailable) {
        const selected = current(isAvailable);
        const newItem = { ...selected, amount: selected.amount + 1 };
        state.bookList = state.bookList.filter(
          (item) => item.id !== action.payload.id
        );
        state.bookList.push(newItem);
      } else {
        state.bookList.push({ ...action.payload, amount: 1 });
      }
    },
    removeBook: (state, action: PayloadAction<number>) => {
      state.bookList = state.bookList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addBook, removeBook } = cartSlice.actions;

export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

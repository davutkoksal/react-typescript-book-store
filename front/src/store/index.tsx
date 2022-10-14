import { configureStore } from "@reduxjs/toolkit";

import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  allBooksList: any[];
  totalBookCount: number;
  pageCount: number;
  bookList: any[];
}

const initialState: CartState = {
  allBooksList: [],
  totalBookCount: 0,
  pageCount: 2,
  bookList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getAllBooksList: (state, action: PayloadAction<any>) => {
      state.allBooksList.push(...action.payload.data);
      state.totalBookCount = action.payload.metadata?.total_records;
    },
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
    increasePageCount: (state) => {
      state.pageCount = state.pageCount + 1;
    },
  },
});

export const { getAllBooksList, addBook, removeBook, increasePageCount } =
  cartSlice.actions;

export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

import { configureStore, createSlice } from "@reduxjs/toolkit";

// 장바구니 slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // [{ id, title, price, image, note, quantity }, ...]
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; // {id, title, price, image, note, quantity}
      const existing = state.items.find((item) => item.id === newItem.id);

      if (existing) {
        // 이미 장바구니에 있으면 수량만 증가
        existing.quantity += newItem.quantity;
      } else {
        // 처음 추가하는 상품이면 push
        state.items.push(newItem);
      }
    },
    //수량 변경
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const target = state.items.find((item) => item.id === id);
      if (target) {
        target.quantity = quantity;
      }
    },
    //삭제
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// 액션 export
export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

// store 생성
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;

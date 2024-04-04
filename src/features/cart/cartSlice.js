import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://products-api-7zdl.onrender.com'

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async thunkAPI => {
    try {
      const resp = await axios(url)
      return resp.data.msg
    } catch (error) {
      thunkAPI.rejectWithValue('Error fetching cart items')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter(item => item.id !== itemId)
    },
    toggleItemAmount: (state, { payload }) => {
      const itemId = payload.id
      const action = payload.action
      const cartItem = state.cartItems.find(item => item.id === itemId)

      if (action === 'up') {
        cartItem.amount = cartItem.amount + 1
      } else if (action === 'down') {
        cartItem.amount = cartItem.amount - 1
      }
    },
    calculateTotals: state => {
      let amount = 0
      let total = 0
      state.cartItems.forEach(item => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCartItems.pending, state => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
      })
  },
})

// console.log(cartSlice);
export const { clearCart, removeItem, toggleItemAmount, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer

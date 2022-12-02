

// rxslice
import { createSlice } from '@reduxjs/toolkit'

const items = 
    localStorage.getItem('cartItems') !== null 
        ? JSON.parse(localStorage.getItem('cartItems')) 
        : [];

const totalAmount = 
    localStorage.getItem('totalAmount') !== null 
        ? JSON.parse(localStorage.getItem('totalAmount')) 
        : 0;

const totalQuantity = 
    localStorage.getItem('totalQuantity') !== null 
        ? JSON.parse(localStorage.getItem('totalQuantity')) 
        : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
    localStorage.setItem('cartItems', JSON.stringify(item))
    localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
}

const initialState = {
    // cartItems: [],
    // totalAmount: 0,
    // totalQuantity: 0

    cartItems: items,
    totalAmount: totalAmount,
    totalQuantity: totalQuantity
}

const CartSlide = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // mỗi key là 1 type và value là 1 reducer func
    addItem: (state, action) => {
        const newItem = action.payload; // chứa các thông tin
        // tìm kiếm id product nếu đúng thì click vào 
        const existingItem = state.cartItems.find((item) => item.id === newItem.id)

        state.totalQuantity++ // tăng tổng số lượng trên icon cart

        if(!existingItem) {
            state.cartItems.push({  // push infor 1 product vào cartItems 
                id: newItem.id,
                imgUrl: newItem.imgUrl,
                productName: newItem.productName,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price
            })
        } else{
            existingItem.quantity++  // tằng lên 1
            existingItem.totlPrice = Number(existingItem.totlPrice) + Number(newItem.price)
        }

        state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)

        setItemFunc(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity)
        // đọan này sang file store.js import cartSlice
    },
    // console.log(state.totalQuantity) // hien số lượng 1 sp
    // console.log(state.cartItems)  // chua data 1 sp
   // console.log(newItems)
   deleteItem:(state, action) => {
    const id = action.payload
    const existingItem = state.cartItems.find(item => item.id === id)

    if(existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== id)
        state.totalQuantity = state.totalQuantity - existingItem.quantity
    }

    state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 
       0
    );
     // save in localStorage
    

     setItemFunc(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity)

    //  setItemFunc(state.totalAmount)

    //  setItemFunc(state.totalQuantity)
    
 
     // const items = ở trên    

    } // sang file cart const tr = () => {}

   
},


  
// delete đưa vào trong reducer
//   delete:(state, action) => {
//     const id = action.payload
//     const existingItem = state.cartItems.find(item => item.id === id)

//     if(existingItem) {
//         state.cartItems = state.cartItems.filter(item => item.id !== id)
//         state.totalQuantity = state.totalQuantity - existingItem.quantity
//     }

//     state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity))
//   } // san file cart const tr = () => {}
 
});

export const cartActions = CartSlide.actions // send data vào cartAction rồi import sang file productCard

export default CartSlide.reducer


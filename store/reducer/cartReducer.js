import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  products: []
};

export const cartReducer = createSlice({
  name: 'cartStore',
  initialState,
  reducers: {
    addIntoCart: (state, action) => {
      const payload = action.payload;
      const existingProduct = state.products.findIndex(
        product =>
          product.productId === payload.productId &&
          product.variantId === payload.variantId
      );

      if (existingProduct < 0) {
        state.products.push(payload);
      } else {
        // FIXED: agar product already exist hai, qty update kar do
        state.products[existingProduct].qty += payload.qty || 1;
      }
      state.count = state.products.length;
    },

    increaseQuantity: (state, action) => {
      const { productId, variantId } = action.payload;
      const existingProduct = state.products.findIndex(
        product => product.productId === productId && product.variantId === variantId
      );
      if (existingProduct >= 0) {
        state.products[existingProduct].qty += 1;
      }
    },

   decreaseQuantity: (state, action) => {
      const { productId, variantId } = action.payload;
      const existingProduct = state.products.findIndex(
        product => product.productId === productId && product.variantId === variantId
      );
      if (existingProduct >= 0 && state.products[existingProduct].qty > 1) {
        state.products[existingProduct].qty -= 1;
      }
    },

    // FIXED: duplicate hata diya, ab sahi removeFromCart hai
    removeFromCart: (state, action) => {
      const { productId, variantId } = action.payload;
      state.products = state.products.filter(
        product => !(product.productId === productId && product.variantId === variantId)
      );
      state.count = state.products.length;
    },

   clearCart: (state) => {
      state.products = [];
      state.count = 0;
    }
  }
});



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     count: 0,
//     products: []
// };

// export const cartReducer = createSlice({
//     name: 'cartStore',
//     initialState,
//     reducers: {
//         addIntoCart: (state, action) => {
//             const payload = action.payload
//             const existingProduct = state.products.findIndex(
//                 product =>
//                     product.productId === payload.productId &&
//                     product.variantId === payload.variantId
//             )

//             if (existingProduct < 0) {
//                 state.products.push(payload)
//                 state.count = state.products.length
//             }
//         },
//         increaseQuantity: (state, action) => {
//             const { productId, variantId } = action.payload
//             const existingProduct = state.products.findIndex(
//                 product => product.productId === productId && product.variantId === variantId
//             )
//             if (existingProduct >= 0) {
//                 state.products[existingProduct].qty += 1
//             }
//         },

//         decreaseQuantity: (state, action) => {
//             const { productId, variantId } = action.payload
//             const existingProduct = state.products.findIndex(
//                 product => product.productId === productId && product.variantId === variantId
//             )
//             if (existingProduct >= 0) {
//   if (state.products[existingProduct].qty > 1) {
//     state.products[existingProduct].qty -= 1
//   }
// }
// },
// // removeFromCart: (state, action) => {
// //   const { productId, variantId } = action.payload;
// //   //  Keep only products that do NOT match the given productId and variantId
// //   state.products = state.products.filter(
// //     product => !(product.productId === productId && product.variantId === variantId)
// //   );

// //   state.count = state.products.length;
// // },
// removeFromCart: (state, action) => {
//   const { productId, variantId } = action.payload
//   state.products = state.products.filter((product) => product.productId !== productId && product.variantId !== variantId)
//   state.count = state.products.length
// },
// clearCart: (state, action) => {
//   state.products = []
//   state.count = 0
// }

//     }
// });

// export const {
//   addIntoCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
//   clearCart,
// } = cartReducer.actions

// export default cartReducer.reducer

// import { selectCartTotalItems } from "../src/store/selectors.js";

export const numberFormating=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
}

// test case
// const test={
//     cartItems:[{"name":"Iphone","price":599.99,"qty":1},{"name":"Samsung","price":499.99,"qty":2}],
//     taxPrice:undefined,
//     itemShippingCost:"",
// }


export const updateCart=(state)=>{
    // caculate the totalPrice of items.
    state.itemsPrice=numberFormating(state.cartItems.reduce((acc,item)=>acc+item.price * item.qty,0))

    state.itemShippingCost=numberFormating(state.cartItems.length === 0 ? 0 : state.itemsPrice>100 ? 0 :  10 );

    state.taxPrice=numberFormating(Number(state.itemsPrice) * 0.1)

    state.totalPrice=numberFormating(Number(state.itemsPrice) + Number(state.itemShippingCost) + Number(state.taxPrice))

    localStorage.setItem("cart",JSON.stringify(state))
    return state
}

// console.log(updateCart(test))


import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

const [cart,setCart]=useState([]);
const [openCart,setOpenCart]=useState(false);

function addToCart(produto){

const itemExiste=cart.find(
item=>item.id===produto.id
);

if(itemExiste){

setCart(

cart.map(item=>

item.id===produto.id

? {...item,quantidade:item.quantidade+1}

: item

)

);

}else{

setCart([

...cart,

{...produto,quantidade:1}

]);

}

setOpenCart(true);

}

function clearCart(){

setCart([]);

}

const total=cart.reduce(

(acc,item)=>acc+(item.preco*item.quantidade),

0

);

return(

<CartContext.Provider

value={{

cart,

addToCart,

clearCart,

total,

openCart,

setOpenCart

}}

>

{children}

</CartContext.Provider>

);

}
import { useContext,useState } from "react";

import { CartContext } from "../context/CartContext";

import { db } from "../services/firebase";

import {

collection,

addDoc,

serverTimestamp

} from "firebase/firestore";


export default function CartModal({

isOpen,

onClose

}){

const{

cart,

clearCart,

total

}=useContext(CartContext);


const[nome,setNome]=useState("");
const[telefone,setTelefone]=useState("");
const[endereco,setEndereco]=useState("");
const[tipoEntrega,setTipoEntrega]=useState("retirada");
const[pagamento,setPagamento]=useState("Pix");


if(!isOpen) return null;


async function enviarPedido(){

if(cart.length===0){

alert("Carrinho vazio");

return;

}

await addDoc(

collection(db,"pedidos"),

{

cliente:nome,

telefone,

endereco,

tipoEntrega,

pagamento,

itens:cart,

total,

status:"Novo",

createdAt:serverTimestamp()

}

);


alert("Pedido enviado");


clearCart();

onClose();

}


return(

<div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">

<div className="bg-white p-6 rounded w-96">

<h2 className="text-xl font-bold">

Carrinho

</h2>

{cart.map(item=>(

<div key={item.id}>

{item.nome} x{item.quantidade}

</div>

))}

<p>

Total: R$ {total.toFixed(2)}

</p>


<input

placeholder="Nome"

onChange={e=>setNome(e.target.value)}

/>


<input

placeholder="Telefone"

onChange={e=>setTelefone(e.target.value)}

/>


<select

onChange={e=>setTipoEntrega(e.target.value)}

>

<option value="retirada">

Retirada

</option>

<option value="entrega">

Entrega

</option>

</select>


<select

onChange={e=>setPagamento(e.target.value)}

>

<option>Pix</option>

<option>Dinheiro</option>

<option>Cartão Crédito</option>

<option>Cartão Débito</option>

</select>


<button

onClick={enviarPedido}

className="bg-green-500 text-white p-2 rounded mt-4 w-full"

>

Finalizar pedido

</button>


<button

onClick={onClose}

className="mt-2"

>

Fechar

</button>

</div>

</div>

);

}
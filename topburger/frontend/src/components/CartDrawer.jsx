import { useState } from "react";
import { db } from "../services/firebase";

import {
collection,
addDoc,
serverTimestamp
} from "firebase/firestore";

export default function CartDrawer({
nome,
itens,
total,
pagamento
}) {

const [loading,setLoading] = useState(false);

async function enviarPedido(){

if(!itens || itens.length === 0){

window.alert("Carrinho vazio");

return;

}

setLoading(true);

try{

await addDoc(collection(db,"pedidos"),{

nome: nome || "Cliente",

itens,

total,

pagamento: pagamento || "Pix",

status:"Novo",

data: serverTimestamp()

});

// 👇 FORÇA aparecer mensagem
setTimeout(()=>{

window.alert("Pedido enviado com sucesso! 🍔");

},100);

}catch(err){

console.error(err);

window.alert("Erro ao enviar pedido");

}

setLoading(false);

}

return(

<div className="mt-4">

<button
type="button"
onClick={enviarPedido}
disabled={loading}
className="bg-green-600 text-white px-4 py-2 rounded w-full"
>

{loading ? "Enviando..." : "Finalizar Pedido"}

</button>

</div>

);

}
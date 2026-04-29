import { useEffect, useState } from "react";
import { db } from "../services/firebase";

import {
collection,
onSnapshot,
doc,
updateDoc,
deleteDoc
} from "firebase/firestore";

import Dashboard from "./Dashboard";

export default function Admin() {

const [pedidos, setPedidos] = useState([]);
const [abaAtual, setAbaAtual] = useState("pedidos");

useEffect(() => {

const pedidosRef = collection(db, "pedidos");

const unsubscribe = onSnapshot(pedidosRef, snapshot => {

const lista = snapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}));

setPedidos(lista);

});

return () => unsubscribe();

}, []);

function sair() {

localStorage.removeItem("adminLogado");

window.location.href = "/";

}

async function atualizarStatus(id, status) {

await updateDoc(doc(db, "pedidos", id), {
status
});

}

async function deletarPedido(id) {

if (!window.confirm("Excluir pedido?")) return;

await deleteDoc(doc(db, "pedidos", id));

}

function formatarData(timestamp) {

if (!timestamp) return "-";

if (timestamp.seconds)
return new Date(timestamp.seconds * 1000).toLocaleString();

return new Date(timestamp).toLocaleString();

}

function minutosPedido(timestamp) {

if (!timestamp) return 0;

let data;

if (timestamp.seconds)
data = new Date(timestamp.seconds * 1000);

else
data = new Date(timestamp);

return Math.floor((new Date() - data) / 60000);

}

function corTempo(minutos) {

if (minutos >= 30) return "bg-red-200";

if (minutos >= 15) return "bg-yellow-200";

return "bg-white";

}

return (

<div className="p-6">

<div className="flex justify-between mb-6">

<h1 className="text-2xl font-bold">
Painel Administrativo 🍔
</h1>

<button
onClick={sair}
className="bg-red-500 text-white px-4 py-2 rounded"
>
Sair
</button>

</div>

<div className="flex gap-4 mb-6">

<button
onClick={() => setAbaAtual("pedidos")}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Pedidos
</button>

<button
onClick={() => setAbaAtual("dashboard")}
className="bg-green-500 text-white px-4 py-2 rounded"
>
Dashboard 📊
</button>

</div>

{abaAtual === "pedidos" && (

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

{pedidos.length === 0 ? (

<p>Nenhum pedido encontrado.</p>

) : (

pedidos.map(pedido => {

const minutos = minutosPedido(pedido.data);

return (

<div
key={pedido.id}
className={`shadow rounded p-4 ${corTempo(minutos)}`}
>

<p><strong>Cliente:</strong> {pedido.nome}</p>

<p>
<strong>Itens:</strong>
{pedido.itens?.map(item => (
<div key={item.nome}>
{item.nome} x{item.quantidade}
</div>
))}
</p>

<p><strong>Total:</strong> R$ {pedido.total}</p>

<p>
<strong>Pagamento:</strong>
<span className="ml-1 font-semibold">
{pedido.pagamento || "Não informado"}
</span>
</p>

<div className="mt-2">

<strong>Status:</strong>

<div className="flex gap-2 mt-1 flex-wrap">

<Status statusAtual={pedido.status} nome="Novo" cor="bg-green-500" />

<Status statusAtual={pedido.status} nome="Em preparo" cor="bg-yellow-500" />

<Status statusAtual={pedido.status} nome="Finalizado" cor="bg-blue-500" />

<Status statusAtual={pedido.status} nome="Cancelado" cor="bg-red-500" />

</div>

</div>

<p className="mt-2">
<strong>Tempo:</strong>
<span className="font-bold">
{minutos} min
</span>
</p>

<p>
<strong>Data:</strong>
{formatarData(pedido.data)}
</p>

<div className="flex flex-wrap gap-2 mt-4">

<button
onClick={() => atualizarStatus(pedido.id,"Em preparo")}
className="bg-yellow-500 text-white px-2 py-1 rounded"
>
Aceitar
</button>

<button
onClick={() => atualizarStatus(pedido.id,"Finalizado")}
className="bg-green-500 text-white px-2 py-1 rounded"
>
Finalizar
</button>

<button
onClick={() => atualizarStatus(pedido.id,"Cancelado")}
className="bg-red-500 text-white px-2 py-1 rounded"
>
Cancelar
</button>

<button
onClick={() => deletarPedido(pedido.id)}
className="bg-gray-600 text-white px-2 py-1 rounded"
>
Excluir
</button>

</div>

</div>

);

})

)}

</div>

)}

{abaAtual === "dashboard" && <Dashboard />}

</div>

);

}

function Status({ statusAtual, nome, cor }) {

return (

<span
className={`px-2 py-1 rounded text-white text-sm ${
statusAtual === nome ? cor : "bg-gray-300"
}`}
>

{nome}

</span>

);

}
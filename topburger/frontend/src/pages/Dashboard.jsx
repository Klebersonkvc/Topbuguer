import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {

const [periodo, setPeriodo] = useState("mes");

const [dados, setDados] = useState({
total: 0,
pedidos: 0,
finalizados: 0,
cancelados: 0,
pix: 0,
dinheiro: 0,
credito: 0,
debito: 0
});


useEffect(() => {

async function carregarDados() {

const snapshot = await getDocs(
collection(db, "pedidos")
);

let total = 0;
let pedidos = 0;
let finalizados = 0;
let cancelados = 0;

let pix = 0;
let dinheiro = 0;
let credito = 0;
let debito = 0;

const hoje = new Date();


snapshot.forEach(doc => {

const pedido = doc.data();

if (!pedido.data) return;

let dataPedido;

if (pedido.data.seconds) {

dataPedido = new Date(
pedido.data.seconds * 1000
);

} else {

dataPedido = new Date(pedido.data);

}


let incluir = false;


// FILTRO HOJE

if (periodo === "hoje") {

incluir =
dataPedido.toDateString() ===
hoje.toDateString();

}


// FILTRO SEMANA

if (periodo === "semana") {

const inicioSemana = new Date();

inicioSemana.setDate(
hoje.getDate() - hoje.getDay()
);

incluir =
dataPedido >= inicioSemana;

}


// FILTRO MÊS

if (periodo === "mes") {

incluir =
dataPedido.getMonth() ===
hoje.getMonth() &&
dataPedido.getFullYear() ===
hoje.getFullYear();

}


// FILTRO ANO

if (periodo === "ano") {

incluir =
dataPedido.getFullYear() ===
hoje.getFullYear();

}


if (!incluir) return;


pedidos++;


if (pedido.status === "Finalizado") {

total += Number(pedido.total || 0);

finalizados++;

}


if (pedido.status === "Cancelado") {

cancelados++;

}


switch (pedido.pagamento?.toLowerCase()) {

case "Pix":
pix++;
break;

case "Dinheiro":
dinheiro++;
break;

case "Cartão crédito":
credito++;
break;

case "Cartão débito":
debito++;
break;

}

});


setDados({
total,
pedidos,
finalizados,
cancelados,
pix,
dinheiro,
credito,
debito
});

}

carregarDados();

}, [periodo]);


const ticketMedio =
dados.finalizados > 0
? (dados.total / dados.finalizados).toFixed(2)
: 0;


return (

<div>

<h1 className="text-2xl font-bold mb-6">

Dashboard 📊

</h1>


{/* BOTÕES FILTRO */}

<div className="flex gap-3 mb-6 flex-wrap">

<button
onClick={() => setPeriodo("hoje")}
className="bg-blue-500 text-white px-3 py-1 rounded"
>

Hoje

</button>


<button
onClick={() => setPeriodo("semana")}
className="bg-blue-500 text-white px-3 py-1 rounded"
>

Semana

</button>


<button
onClick={() => setPeriodo("mes")}
className="bg-blue-500 text-white px-3 py-1 rounded"
>

Mês

</button>


<button
onClick={() => setPeriodo("ano")}
className="bg-blue-500 text-white px-3 py-1 rounded"
>

Ano

</button>

</div>


{/* CARDS */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">


<Card
titulo="Faturamento"
valor={`R$ ${dados.total.toFixed(2)}`}
/>


<Card
titulo="Pedidos"
valor={dados.pedidos}
/>


<Card
titulo="Finalizados"
valor={dados.finalizados}
/>


<Card
titulo="Cancelados"
valor={dados.cancelados}
/>


<Card
titulo="Ticket médio"
valor={`R$ ${ticketMedio}`}
/>


<Card
titulo="Pix"
valor={dados.pix}
/>


<Card
titulo="Dinheiro"
valor={dados.dinheiro}
/>


<Card
titulo="Crédito"
valor={dados.credito}
/>


<Card
titulo="Débito"
valor={dados.debito}
/>


</div>

</div>

);

}


function Card({ titulo, valor }) {

return (

<div className="bg-white shadow rounded p-4">

<p className="text-gray-500">

{titulo}

</p>

<p className="text-xl font-bold">

{valor}

</p>

</div>

);

}
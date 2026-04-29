
import bacon from "../assets/bacon.png";
import cheese from "../assets/cheese.png";
import smash from "../assets/smash.png";
import kids from "../assets/kids.png";
import nordestino from "../assets/nordestino.png";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const burgers = [
  { id: 1, nome: "KIDS", preco: 10, imagem: kids },
  { id: 2, nome: "BACON", preco: 18, imagem: bacon },
  { id: 3, nome: "DOUBLE SMASH", preco: 22, imagem: smash },
  { id: 4, nome: "CHEESE", preco: 15, imagem: cheese },
  { id: 5, nome: "CHEDDAR MELT", preco: 20, imagem: cheese },
  { id: 6, nome: "BURGUER ESPECIAL", preco: 25, imagem: bacon },
  { id: 7, nome: "NORDESTINO", preco: 23, imagem: nordestino },
  { id: 8, nome: "SERTÃO", preco: 24, imagem: nordestino },
  { id: 9, nome: "DUPLO", preco: 26, imagem: smash },
  { id: 10, nome: "EXPLOSÃO", preco: 28, imagem: nordestino }
];

function Menu() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-black min-h-screen p-6">

      <h1 className="text-yellow-400 text-3xl font-bold mb-6 text-center">
        Cardápio 🍔
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

        {burgers.map((burger, index) => (

  <div
    key={index}
    className="bg-yellow-400 rounded-2xl shadow-lg p-4 hover:scale-105 transition duration-300 flex flex-col justify-between"
  >

    <div>

      <img
        src={burger.imagem}
        alt={burger.nome}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />

      <h2 className="text-2xl font-bold">
        {burger.nome}
      </h2>

      <p className="text-lg mt-2">
        {burger.preco.toFixed(2)}
      </p>

    </div>

    <button
      onClick={() => addToCart(burger)}
    className="mt-4 bg-black text-yellow-400 py-2 rounded-xl hover:bg-yellow-500 hover:text-black transition"
    >
      Adicionar ao carrinho
    </button>

  </div>

))}
        

      </div>

    </div>
  );
}

export default Menu;
import Admin from "../pages/Admin";

export default function AdminRoute(){

const logado=localStorage.getItem("adminLogado");

if(!logado){

const senha=prompt("Senha admin:");

if(senha==="1234"){

localStorage.setItem("adminLogado",true);

return <Admin/>;

}

return <h1>Acesso negado</h1>;

}

return <Admin/>;

}
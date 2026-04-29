import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  function linkClass(path){
    return location.pathname === path
      ? "text-black bg-yellow-400 px-3 py-1 rounded font-bold"
      : "text-yellow-400 hover:text-white";
  }

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-yellow-400 font-bold text-xl">
          TopBurguer 🍔
        </h1>

        <div className="flex gap-4">

          <Link
            to="/"
            className={linkClass("/")}
          >
            Home
          </Link>

          <Link
            to="/menu"
            className={linkClass("/menu")}
          >
            Cardápio
          </Link>

          <Link
            to="/contact"
            className={linkClass("/contact")}
          >
            Contato
          </Link>

          <Link
            to="/admin"
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Admin
          </Link>

        </div>
      </div>
    </nav>
  );
}


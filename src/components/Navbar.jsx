import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md p-4 flex justify-between items-center transition-all duration-300 ease-in-out">
      <Link to="/" className="font-bold text-xl hover:tracking-widest transition-all duration-300">
        NotesApp
      </Link>

      <div className="flex space-x-6 items-center">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full transition duration-300 ease-in-out shadow-sm hover:scale-105"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full transition duration-300 ease-in-out shadow-sm hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full transition duration-300 ease-in-out shadow-sm hover:scale-105"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Store/auth";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import DarkMode from "./DarkMode";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Products", link: "/products" },
  { id: 3, name: "Electronics", link: "/electronics" },
  { id: 4, name: "Cloths", link: "/cloths" },
  { id: 5, name: "For Mens", link: "/mens" },
  { id: 6, name: "For Girls", link: "/girls" },
  { id: 7, name: "Process", link: "/process" },
  
];

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const { cart } = useAuth();


  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value) return setSuggestions([]);

    const filtered = Menu.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const match = Menu.find((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (match) navigate(match.link);
    else navigate(`/${search}`);

    setSearch("");
    setSuggestions([]);
    setMobileOpen(false);
  };

  return (
    <header className="shadow-md bg-white dark:bg-gray-900 dark:text-white sticky top-0 z-50">

      {/* TOP HEADER */}
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg md:text-xl">
          <img src={Logo} alt="logo" className="w-8 md:w-9" />
          Online_<span className="text-orange-500">Shop</span>
        </Link>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6 relative">
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search products..."
              className="w-full border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:border-gray-700"
            />
          </form>

          {suggestions.length > 0 && (
            <div className="absolute top-12 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border dark:border-gray-700">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(item.link);
                    setSearch("");
                    setSuggestions([]);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-orange-500 hover:text-white"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 md:gap-8">

          {/* ICONS */}
          {/* <FaRegHeart className="hidden md:block text-xl cursor-pointer" /> */}
          {/* <FaShoppingCart className="hidden md:block text-xl cursor-pointer" /> */}

          <DarkMode />

          {/* DESKTOP AUTH */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/service" className="hover:text-orange-500 d-felx justify-center">
              Service
            </NavLink>
            <NavLink to="/contact" className="hover:text-orange-500">
              Contact
            </NavLink>

            {isLoggedIn ? (
              <NavLink to="/logout" className="hover:text-orange-500">
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" className="hover:text-orange-500">
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <nav className="hidden md:flex justify-center gap-8 pb-3 border-t pt-3 dark:border-gray-700">
        {Menu.map((item) => (
          <NavLink
            key={item.id}
            to={item.link}
            className="hover:text-orange-500 font-medium"
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">

          {/* MOBILE SEARCH */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search..."
              className="w-full border rounded-full px-4 py-2 outline-none dark:bg-gray-800 dark:border-gray-700"
            />
          </form>

          {/* MOBILE LINKS */}
          {Menu.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              onClick={() => setMobileOpen(false)}
              className="block border-b pb-2 dark:border-gray-700"
            >
              {item.name}
            </NavLink>
          ))}

          {/* MOBILE AUTH */}
          {isLoggedIn ? (
            <NavLink to="/logout" onClick={() => setMobileOpen(false)}>
              Logout
            </NavLink>
          ) : (
            <div className="flex flex-col gap-3">
              <NavLink to="/login" onClick={() => setMobileOpen(false)}>
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md text-center"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { allDataContext } from "../main";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // firebase.js থেকে import

export default function Navbar() {
  const geturl = useLocation();
  const navigate = useNavigate();
  const { wishList, cartList } = useContext(allDataContext);

  const [user, setUser] = useState(null); // Firebase user

  // 🔁 Real-time user check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const getBGcolor = () => {
    if (
      geturl.pathname === "/statistics" ||
      geturl.pathname === "/dashboard/wish" ||
      geturl.pathname === "/dashboard/cart"
    ) {
      return ["bg-white", "text-gray-700"];
    } else {
      return ["bg-violet-700", "text-white"];
    }
  };

  const colorData = getBGcolor();

  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? "bg-violet-800 text-white" : ""} px-6 rounded-full py-1`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? "bg-violet-800 text-white" : ""} px-6 rounded-full py-1`
        }
        to="/statistics"
      >
        Statistics
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? "bg-violet-800 text-white" : ""} px-6 rounded-full py-1`
        }
        to="/dashboard/cart"
      >
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? "bg-violet-800 text-white" : ""} px-6 rounded-full py-1`
        }
        to="/reviews/read"
      >
        Reviews
      </NavLink>
    </>
  );

  // ✅ Login or Logout
  const handleLoginLogout = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          setUser(null);
          toast.success("Logout successful! 👋");
          navigate("/");
        })
        .catch((error) => {
          console.error("Logout error:", error);
          toast.error("Logout failed!");
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`fixed z-30 w-full ${colorData[0]} py-3`}>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`${colorData[0]} navbar ${colorData[1]} mx-auto container rounded-b-lg px-3`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn pl-0 btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 py-4 px-12 shadow gap-4 w-60 text-gray-700"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="text-lg md:text-lg lg:text-2xl font-extrabold"
          >
            Gadgets Haven
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1  font-bold gap-12">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <div className="relative">
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `h-9 w-9 flex border cursor-pointer items-center justify-center rounded-full ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "bg-white text-gray-700"
                }`
              }
            >
              <i className="fa-solid fa-cart-plus"></i>
            </NavLink>
            <div className="badge border px-1 py-1 border-violet-700 text-black text-xs bg-gray-100 absolute left-5 -top-3">
              {cartList.length}
            </div>
          </div>

          <div className="relative">
            <NavLink
              to="/dashboard/wish"
              className={({ isActive }) =>
                `h-9 w-9 flex border cursor-pointer items-center justify-center rounded-full ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "bg-white text-gray-700"
                }`
              }
            >
              <i className="fa-regular fa-heart"></i>
            </NavLink>
            <div className="badge border px-1 py-1 border-violet-700 text-black text-xs bg-gray-100 absolute left-5 -top-3">
              {wishList.length}
            </div>
          </div>

          {/* ✅ Login/Logout Button */}
          <button
            onClick={handleLoginLogout}
            className={`h-9 w-9 flex items-center justify-center border ${
              user ? "bg-red-500 text-white" : "text-violet-700 bg-white"
            } border-violet-700 rounded-full`}
          >
            <i
              className={`fa-solid ${
                user ? "fa-right-from-bracket" : "fa-user"
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}

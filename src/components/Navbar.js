import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCartClick = () => {
    setCartView(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          FoodOrder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mn-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link fs-5 mx-3 active"
                style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-3 active"
                  style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
                  aria-current="page"
                  to="/myOrder"
                >
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="btn btn-outline-dark mx-1"
                style={{ textDecoration: "none", fontSize: "20px", borderRadius: "5px" }}
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-dark mx-1"
                style={{ textDecoration: "none", fontSize: "20px", borderRadius: "5px" }}
                to="/createuser"
              >
                SignUp
              </Link>
            </form>
          ) : (
            <div>
              <button
                className="btn btn-outline-dark mx-2"
                onClick={handleCartClick}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {data?.length}
                </Badge>
              </button>
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}
              <button
                onClick={handleLogOut}
                className="btn btn-outline-dark text-danger mx-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

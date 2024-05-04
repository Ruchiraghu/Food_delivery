import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  let data = useCart();
    const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const loadCart = () => {
    setCartView(true)
}

  return (
    <div>
      <div>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mn-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-Link  fs-5 mx-3 active"
                    style={{
                      textDecoration: "none",
                      padding: "10px 10px",
                      color: "black",
                      fontSize: "20px",
                    }}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {localStorage.getItem("token") ? (
                  <li className="nav-item">
                    <Link
                      className="nav-Link  fs-5 mx-3 active"
                      style={{
                        textDecoration: "none",
                        padding: "10px 10px",
                        color: "black",
                        fontSize: "20px",
                      }}
                      aria-current="page"
                      to="/myOrder"
                    >
                      {" "}
                      My Orders
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
              {!localStorage.getItem("token") ? (
                <form className="d-flex">
                  <Link
                    className="btn- bg-black text-white mx-1"
                    style={{
                      textDecoration: "none",
                      padding: "10px 10px",
                      color: "black",
                      fontSize: "20px",
                      "border-radius": "5px",
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn- bg-black text-white mx-1"
                    style={{
                      textDecoration: "none",
                      padding: "10px 10px",
                      color: "black",
                      fontSize: "20px",
                      "border-radius": "5px",
                    }}
                    to="/createuser"
                  >
                    signUp
                  </Link>
                </form>
              ) : (
                <div>
                  <div
                    className="btn bg-black text-white mx-2 "
                    onClick={() => setCartView(true)}
                  >
                    My Cart{" "}
                    <Badge pill bg="danger">
                      {data?.length}
                    </Badge>
                  </div>
                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart></Cart>
                    </Modal>
                  ) : null}
                  <div
                    onClick={handleLogOut}
                    className="btn bg-black text-danger mx-2"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Navbar from "../../src/components/Navbar";
import Card from "../components/Card.js";
import Footer from "../components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [food_items, setFoodItem] = useState([]);

  console.log("Food Category:", foodCategory); // Add this line to log foodCategory
  console.log("Food Items:", food_items); // Add this line to log food_items

  useEffect(() => {
    const loadData = async () => {
      try {
        let response = await fetch("http://localhost:8000/api/foodData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setFoodItem(response.food_items);
        setFoodCategory(response.foodCategory);
        // console.log(response.food_items, response.foodCategory);
      } catch (error) {
        console.error("Error fetching the data: ", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleControls"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <button className="btn btn-outline-black text-white bg-dark "  type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?momos"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?pizza"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container ">
        {foodCategory && foodCategory.length !== 0
          ? foodCategory.map((data) => (
              <div key={data._id}className="container">
                <div  className="row mb-3 ">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {food_items && food_items.length !== 0 ? (
                    food_items
                      .filter(
                        (items) =>
                          items.CategoryName.toLowerCase() ===
                            data.CategoryName.toLowerCase() &&
                          items.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            key={filterItems._id}
                            foodName={filterItems.name}
                            item={filterItems}
                            options={filterItems.options[0]}
                            ImgSrc={filterItems.img}
                          ></Card>
                        </div>
                      ))
                  ) : (
                    <div>No such data found!!</div>
                  )}
                </div>
              </div>
            ))
          : null}
      </div>
      <Footer />
    </div>
  );
}

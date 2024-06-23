import React, { useState, useEffect } from 'react';
import Navbar from '../../src/components/Navbar';
import Card from '../components/Card.js';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

const Home = () => {
    const [search, setSearch] = useState('');
    const [foodCategory, setFoodCategory] = useState([]);
    const [food_items, setFoodItem] = useState([]);

    console.log("Food Category:", foodCategory);
    console.log("Food Items:", food_items);

    useEffect(() => {
        const loadData = async () => {
            try {
                let response = await fetch(`${process.env.REACT_APP_API_URL}/api/foodData`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                response = await response.json();
                setFoodItem(response.food_items);
                setFoodCategory(response.foodCategory);
            } catch (error) {
                console.error("Error fetching the data: ", error);
                console.log("API URL:", process.env.REACT_APP_API_URL);

            }
        };

        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <Carousel onSearch={setSearch} />
            <div className="container mt-3">
                {foodCategory && foodCategory.length !== 0 ? (
                    foodCategory.map((data) => (
                        <div key={data._id || data.CategoryName} className="container">
                            <div className="row mb-3">
                                <div className="fs-3 m-3">{data.CategoryName}</div>
                                <hr />
                                {food_items && food_items.length !== 0 ? (
                                    food_items
                                        .filter(
                                            (items) =>
                                                items.CategoryName?.toLowerCase() ===
                                                    data.CategoryName?.toLowerCase() &&
                                                items.name?.toLowerCase().includes(search.toLowerCase())
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
                ) : null}
            </div>
            <Footer />
        </div>
    );
};

export default Home;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carousel = ({ onSearch }) => {
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState('');
    const accessKey = '4iAVM4_2wAzr1yyEaLz4xkAXnyDgRR6LA-YhlH362qs'; // Replace with your Unsplash access key
    const defaultImages = [
        {
            url: "https://source.unsplash.com/random/900x700/?burger",
            alt: "Delicious burger"
        },
        {
            url: "https://source.unsplash.com/random/900x700/?sandwich",
            alt: "Tasty momos"
        },
        {
            url: "https://source.unsplash.com/random/900x700/?pizza",
            alt: "Cheesy pizza"
        }
    ];

    useEffect(() => {
        const fetchImages = async () => {
            const queries = search ? [search] : ['burger', 'sandwich', 'pizza'];
            try {
                const responses = await Promise.all(queries.map(query =>
                    axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
                        headers: {
                            Authorization: `Client-ID ${accessKey}`,
                        },
                    })
                ));
                const fetchedImages = responses.flatMap(response => response.data.results.slice(0, 1)); // Take the first image from each response
                setImages(fetchedImages.map(image => ({
                    url: image.urls.regular,
                    alt: image.alt_description
                })));
            } catch (error) {
                console.error('Error fetching images:', error);
                setImages(defaultImages); // Use default images in case of error
            }
        };

        fetchImages();
    }, [search]);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        onSearch(searchValue);
    };

    const imageElements = images.map((image, index) => (
        <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
        >
            <img
                src={image.url}
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt={image.alt}
            />
        </div>
    ));

    return (
        <div>
            <div className="carousel-caption" style={{ zIndex: '10' }}>
                <div className="d-flex justify-content-center">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search for food items"
                        aria-label="Search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div
                id="carouselExampleControls"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                style={{ objectFit: 'contain !important' }}
            >
                <div className="carousel-inner">
                    {imageElements}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Carousel;

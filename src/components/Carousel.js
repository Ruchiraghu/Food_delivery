import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const Carousel = ({ onSearch }) => {
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState('');
    const accessKey = '4iAVM4_2wAzr1yyEaLz4xkAXnyDgRR6LA-YhlH362qs'; // Replace with your Unsplash access key

    // Memoize defaultImages to prevent unnecessary recreations
    const defaultImages = useMemo(() => [
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
    ], []);

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
    }, [defaultImages, search, accessKey]); // Include all dependencies here

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        onSearch(searchValue);
    };

    const imageElements = images.map((image, index) => (
        <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            style={{maxHeight:'700px'}}
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
        <div className="carousel-container position-relative">
            <div className="carousel-caption d-flex justify-content-center align-items-center">
                <div className="search-container position-absolute top-50 start-50 translate-middle"
                    style={{ zIndex: '10', width: '45%' }}>
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !important' }}>
                <div className="carousel-inner">
                    {imageElements}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Carousel;

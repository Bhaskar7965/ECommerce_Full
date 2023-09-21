import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const ProductCard = ({ product }) => {
    const options = {
        value: product.ratings,
        edit: false,
        activeColor: 'tomato',
        color: 'rgb(20,20,20,0.1)',
        isHalf: true,
        precision: 0.5,
        size: window.innerWidth < 768 ? 20 : 25
    }

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <Link className="productCard" to={`/product/${product._id}`} onClick={() => window.scrollTo(0, 0)}>
            <img className='productImgCard' src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹ ${product.price}`}</span>
        </Link>
    )
}

export default ProductCard

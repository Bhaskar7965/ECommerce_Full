import React, { Fragment, useEffect, useState } from 'react'
import { getProductDetails, newReview } from '../../actions/productAction'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { addToCart } from '../../actions/cartAction'
import './ProductDetails.css'
import ReactStarts from 'react-rating-stars-component'
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { NEW_REVIEW_RESET } from '../../constants/productConstants'


const ProductDetails = () => {

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { id } = useParams()
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { product, loading, error } = useSelector(
        state => state.productDetails
    )

    const { success, error: reviewError } = useSelector(state => state.newReview)

    const { isAuthenticated } = useSelector((state) => state.user);

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const alert = useAlert()

    const addToCartHandler = () => {

        if (!isAuthenticated) {
            // alert.error('Please login first to access the product');
            navigate('/login');
            return;
        }
        dispatch(addToCart(id, quantity))
        alert.success('Item Added to Cart')
    }

    console.log(rating, comment)

    const reviewSubmitHandler = () => {
        dispatch(newReview({
            productId: id,
            comment: comment,
            rating: rating
        }));
    };

    useEffect(() => {
        if (error) {
            alert.error(error)
        }
        if (reviewError) {
            alert.error(reviewError)
        }
        if (success) {
            alert.success('Review posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
            setOpen(false)
        }
        if (id && id !== '') {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id, error, alert, reviewError, success]);

    const options = {
        value: product.ratings,
        edit: false,
        activeColor: 'tomato',
        color: 'rgb(20,20,20,0.1)',
        isHalf: true,
        precision: 0.5,
        size: window.innerWidth < 768 ? 20 : 25
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment  >
                    <MetaData title={product.name} />
                    <div className="ProductDetails">
                        <div>

                            {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        key={i}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStarts {...options} />{" "}
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹ ${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product.stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                {product.stock < 10 && product.stock >= 1 && (
                                    <span className="hurryMessage" style={{ color: 'red' }}>
                                        Hurry up! Only {product.stock} items left
                                    </span>
                                )}
                                <p>
                                    Status:{" "}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button
                                className="submitReview"
                                variant="outlined"
                                onClick={handleClickOpen}
                            >
                                Write a review
                            </button>
                            <Dialog
                                open={open} onClose={handleClose}
                            >
                                <DialogTitle>Write a review</DialogTitle>
                                <DialogContent>
                                    <Box
                                        sx={{
                                            '& > legend': { mt: 2 },
                                        }}
                                    >
                                        <Typography component="legend">Controlled</Typography>
                                        <Rating
                                            name="simple-controlled"
                                            value={rating}
                                            onChange={(e) => {
                                                setRating(e.target.value);
                                            }}
                                        />
                                    </Box>
                                    <textarea
                                        className="reviewTextArea"
                                        placeholder="Enter your review"
                                        rows="5"
                                        cols="30"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus color='secondary' onClick={handleClose}>
                                        CANCEL
                                    </Button>
                                    <Button
                                        autoFocus
                                        color='primary'
                                        onClick={reviewSubmitHandler}
                                    >
                                        SUBMIT
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment >
            )}
        </Fragment>
    )
}

export default ProductDetails;

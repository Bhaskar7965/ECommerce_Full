import React, { Fragment, useEffect } from 'react'
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { MdDescription, MdOutlineCategory, MdProductionQuantityLimits } from 'react-icons/md';
import { BsCurrencyRupee } from 'react-icons/bs';
import { GrStorage } from 'react-icons/gr';
import { AiOutlineLink } from 'react-icons/ai';

const NewProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const navigate = useNavigate();

    const { loading, error, success } = useSelector(
        (state) => state.newProduct
    );

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [stock, setStock] = React.useState(0);
    const [images, setImages] = React.useState([]);
    // const [imagesPreview, setImagesPreview] = React.useState([]);

    const categories = [
        "Mobile",
        "Electronics",
        "Cameras",
        "Laptop",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
    ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product created successfully");
            navigate("/admin/products");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, success, navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const data = {
            name,
            price,
            description,
            category,
            stock,
            images: [{
                "public_id": "sample image",
                "url": images,
            }],
        };
        dispatch(createProduct(data));
    }

    // console.log(images);

    // const createProductImagesChange = (e) => {
    //     const files = Array.from(e.target.files);

    //     setImages([]);
    //     setImagesPreview([]);

    //     files.forEach((file) => {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setImagesPreview((old) => [...old, reader.result]);
    //                 setImages((old) => [...old, reader.result]);
    //             }
    //         };

    //         reader.readAsDataURL(file);
    //     });
    // };


    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <MdProductionQuantityLimits />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <BsCurrencyRupee />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdDescription />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <MdOutlineCategory />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <GrStorage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        {/* <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div> */}

                        <div>
                            <AiOutlineLink />
                            <input
                                type="text"
                                placeholder="img url"
                                required
                                value={images}
                                onChange={(e) => setImages(e.target.value)}
                            />
                        </div>

                        <button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct
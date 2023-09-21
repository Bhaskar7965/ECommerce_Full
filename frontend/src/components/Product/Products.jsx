import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from "r-range-slider";
import MetaData from '../layout/MetaData'
import { AiOutlineSearch } from 'react-icons/ai'

const categories = [
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
]

const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 50000]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false); // State to track if search button is clicked
  const [category, setCategory] = useState(''); // State to track category

  const dispatch = useDispatch()
  const alert = useAlert()

  const { keyword } = useParams()

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const priceHandler = (data) => {
    setPrice(data)
  }

  const handleSearch = () => {
    setSearchButtonClicked(true);
  };

  const { products, loading, error, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    if (searchButtonClicked) {
      // dispatch(getProducts(  price, category)); 
      setSearchButtonClicked(false);
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, alert, error, currentPage, keyword, price, category, searchButtonClicked]);

  // useEffect(() => {
  //   if (searchButtonClicked) {
  //     dispatch(getProducts(keyword, currentPage, price, category)); 
  //     setSearchButtonClicked(false);
  //   }
  // }, [dispatch, searchButtonClicked, keyword, currentPage, price, category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'see Best Products'} />
          <h2 className='productsHeading'>Products</h2>

          <div className="filterBox">
            <Slider
              onChange={priceHandler}
              attrs={{ className: 'my-slider' }}
              start={0}
              end={50000}
              points={price}
              fillStyle={(index) => {
                if (index === 1) {
                  return { background: 'tomato' };
                }
              }}
              markStyle={(index) => {
                if (index === 0 || index === 2) {
                  return { background: 'tomato' };
                }
              }}
            />
            <button className='pricebutton' onClick={handleSearch}> <AiOutlineSearch /> </button>

            <ul className='categoryBox'>
              <p className='categoryP'>Categories</p>
              {categories.map(category => (
                <li
                  className='category-link'
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="products">
            {products && products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {resultPerPage <= productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
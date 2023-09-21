import React, { Fragment, useState } from 'react'
import './Shipping.css'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { Country, State } from 'country-state-city'
import { AiOutlineHome } from 'react-icons/ai'
import { FaCity } from 'react-icons/fa';
import { BsFillPinMapFill } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';
import { BsGlobeAmericas } from 'react-icons/bs';
import CheckoutSteps from '../Cart/CheckoutSteps'

const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [country, setCountry] = useState(shippingInfo.country || '');
    const [state, setState] = useState(shippingInfo.state || '');
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, postalCode, phoneNo })
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title={'Shipping Info'} />
            <CheckoutSteps activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <AiOutlineHome />
                            <input
                                className="shippingInput"
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <FaCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <BsFillPinMapFill />
                            <input
                                type="text"
                                placeholder="Postal Code"
                                required
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <AiOutlineHome />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>
                        <div>
                            <BsGlobeAmericas />
                            <select
                                className="shippingInputSelect"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {country && (
                            <div>
                                <IoLocationSharp />
                                <select
                                    className="shippingInputSelect"
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State.getStatesOfCountry(country).map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment >
    );
};

export default Shipping;


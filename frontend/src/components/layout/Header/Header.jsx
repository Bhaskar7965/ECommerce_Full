import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import './Header.css'
import Logo from './logo.png'

const options = {
    burgerColor: "#eb4034",
    burgerColorHover: "rgba(135, 35, 35,0.8)",
    logo: Logo,
    logoWidth: "20vmax",
    navColor1: "rgba(255, 99, 71,0.3)",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "2.0vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    profileIcon: true,
    profileIconColor: "rgba(35, 35, 35,0.8)",
    ProfileIconElement: MdAccountCircle,
    searchIcon: true,
    searchIconColor: "rgba(35, 35, 35,0.8)",
    SearchIconElement: MdSearch,
    cartIcon: true,
    cartIconColor: "rgba(35, 35, 35,0.8)",
    CartIconElement: MdAddShoppingCart,
};

const Header = () => {
    return (
        <div>

            <ReactNavbar
                {...options}
            />
        </div>
    )
}

export default Header
import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <p>Download App for Android and IOS phone</p>
                <img src="/images/Appstore.png" alt="" />
                <img src="/images/Playstore.png" alt="" />
            </div>
            <div className='midFooter'>
                <h4>E-COMMERCE</h4>
                <p>Quality is our first priority</p>

                <p>Copyright 2023 &copy; @ashishadarsh </p>
            </div>
            <div className='rightFooter'>
                <h4>FOLLOW US</h4>
                <a href="https://www.facebook.com/ashishadarsh" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://www.instagram.com/ashishadarsh/" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://twitter.com/ashishadarsh" target="_blank" rel="noreferrer">Twitter</a>
            </div>
        </footer>
    )
}

export default Footer
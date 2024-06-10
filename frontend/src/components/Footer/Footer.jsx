import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id= "footer">
        <div className='footer__content'>
            <div className='footer__content__left'>
                <img src={assets.logo} alt='logo' />
                <p>Lorem Epsum</p>
                <div className='footer__social__icon'>
                    <img src= {assets.facebook_icon} alt=''/>
                    <img src= {assets.twitter_icon} alt=''/>
                    <img src= {assets.linkedin_icon} alt=''/>
                </div>
            </div>
            <div className='footer__content__center'>
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='footer__content__right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>Phone: +123 456 789</li>
                    <li>Email: contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer__copyright'> Copyright 2024 © Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
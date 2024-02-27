import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import nav_dropdown from '../Assets/dropdown_icon2.png'

import logo  from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {

    const [menu, setMenu] = useState("shop");

    const { getTotalCartItems } = useContext(ShopContext);

    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <Link to='/' style={{textDecoration:"none"}}>
            <div onClick={() => {setMenu("shop")}} className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
        </Link>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={ nav_dropdown } alt="" />
        <ul className='nav-menu' ref={menuRef}>
            <li onClick={() => {setMenu("shop")}}><Link to='/'>SHOP</Link>{menu === "shop" ? <hr></hr> : <></>}</li>
            <li onClick={() => {setMenu("men")}}><Link to='/men'>MEN</Link>{menu === "men" ? <hr></hr> : <></>}</li>
            <li onClick={() => {setMenu("women")}}><Link to='/women'>WOMEN</Link>{menu === "women" ? <hr></hr> : <></>}</li>
            <li onClick={() => {setMenu("kids")}}><Link to='/kids'>KIDS</Link>{menu === "kids" ? <hr></hr> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
            { localStorage.getItem('auth-token')
            ?<button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link to='/login'><button>Login</button></Link> }
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{ getTotalCartItems() }</div>
        </div>
    </div>
  )
}

export default Navbar
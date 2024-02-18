import React from 'react'
import classes from './header.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export default function Header() {
    const user = {
        name: 'John',
        
    };

   
    const {cart} = useCart();

    const logout =()=>{

    }

  return (
    <header className={classes.header}>
        <div className={classes.container}>
            <Link to="/" className={classes.logo}>
                Food Mine!
            </Link>
            <nav>
                <ul>
                    {
                        user?
                            (<li className={classes.menu_container}>
                                <Link to="/profile">{user.name}</Link>
                                <div className={classes.menu}>
                                <Link to="/profile">profile</Link>
                                <Link to="/orders">orders</Link>
                                <a onClick={logout}>logout</a>
                            </div>
                            </li>
                            ):(
                                <Link to="/login">login</Link>)    
                    }
                    <li>
                        <Link to="/cart">
                            Cart
                            {cart.totalCount >0 &&<span className={classes.cart_count}>{cart.totalCount}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  );
}

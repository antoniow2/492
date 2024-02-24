import "./Header.css";
import "./Footer.css";
import React from 'react';
import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <header>
//       <nav className="navbar-H">
//         <label className="title-H">WhatToCook</label>
//         <ul className="navbar-ul">
//             <a href="/home" className="Home-H">Home</a>
//             <Link to="/RecipseGenerator" className="Recipe-H">Recipe Generator</Link>
//             <Link to="/pricecompare" className="Price-H">Price Comparator</Link>
//             <Link to="/dietary" className="Diet-H">Dietary Restrictions</Link>
//             <Link to="/profile" button className="Profile-H">Profile</Link>
//         </ul>
//       </nav> 
//     </header>
//   );
// }
function Header() {
  return (
        <nav className="home-navbar">
        <label className="title">WhatToCook</label>
            <ul className='home-list'>
                <Link to="/home">
                <button className="section-right">Home</button>
                </Link>
                <Link to="/RecipeGenerator">
                <button className="section-right">Recipe Generator</button>
                </Link>
                <Link to="/PriceComparer">
                <button className="section-right">Price Comparer</button>
                </Link>
                <Link to="/dietary">
                <button className="section-right">Dietary Restrictions</button>
                </Link>
                <Link to="/profile">
                <button className="section-right">Profile</button>
                </Link>
            </ul>
        </nav> 
);}

export default Header;

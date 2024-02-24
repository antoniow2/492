import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Link } from 'react-router-dom'
import PriceComp from "./PriceComparer"
import Profile from "./Profile"
import RecipeGenerator from "./RecipeGenerator"
import Dietary from "./DietaryRestrictions"
import withTokenExpirationCheck from "./withTokenExpirationCheck";
import './Home.css'

function Home() {
    return (
        <div style={{backgroundColor: 'tan'}}>
            <div className='Homepage'>
            <Header />
                <div className='overlay'>
                <div className='content'>
                    <h1 className='home-title'>WELCOME TO WhatToCook</h1>
                    <p className='home-description'>Cook with convenience and savings using WhatToCook! Easily manage your fridge inventory, discover delicious recipes tailored to your ingredients, create shopping lists with cost estimates, and find the best grocery store deals—all in one app.</p>
                </div>
                </div>
            </div>
            <div className='head'> Explore WhatToCook </div>
            <div class="box-container">
                <div className="boxRep">
                <Link to="/RecipeGenerator">
                <button className='but'>
                    <h1 className='Recipe-Title'>Recipe Generator</h1>
                    <p className='Recipe-Description'> Use the search bar to look up recipes curated to match your dietary preferences.</p>
                    <p className='Recipe-Description'> Scroll preview of our extensive recipe library.</p>
                    <p className='Recipe-Description'> When you have a minimum of three ingredients in your fridge, the search bar will showcase ingredients tailored to your dietary restrictions. </p>
                </button>
                </Link>
                </div>
                <div className='boxPri'> 
                <Link to ='/PriceComparer'>
                <button className='but'>
                    <h1 className='Price-Title'>Price Comparer</h1>
                    <p className='Price-Description'> Use the search bar to type the ingredients you're looking for</p>
                    <p className='Price-Description'> Click "Search" </p>
                    <p className='Price-Description'> See the displayed results and click on your desired option </p>
                    <p className='Price-Description'> Click on the name if you want to be brought to the grocery store's page </p>
                </button>
                </Link>
                </div>
                </div>
                <div class="box-container-lower">
                <div className='boxDiet'> 
                    <Link to ='/dietary'>
                    <button className='but'>
                    <h1 className='Diet-Title'>Dietary Restrictions</h1>
                    <p className='Diet-Description'> Click on the allergy or diet topic you wish to exclude from your recipes </p>
                    <p className='Diet-Description'> Save your choices with the button below </p>
                    <p className='Diet-Description'> You can select and de-deselect any option at anytime </p>
                    </button>
                    </Link>
                </div>
                <div className='boxPro'> 
                    <Link to ='/profile'>
                    <button className='but'>
                    <h1 className='Profile-Title'>Profile</h1>
                    <p className='Profile-Description'> Here you can see your infomation, with the option to add a picture </p>
                    <p className='Profile-Description'> In the fridge section, you can add all the ingredients in your fridge </p>
                    <p className='Profile-Description'> You can remove bookmarked recipes </p>
                    </button>
                    </Link>
                </div>
                </div>
            <Footer/>
        </div>
    )
}

// return (
//     <div>
//         <div className='Homepage'>
//         <Header />
//             <div className='overlay'>
//                 <div className='content'>
//                     <h1 className='home-title'>WELCOME TO WhatToCook</h1>
//                     <p className='home-description'>Cook with convenience and savings using WhatToCook! Easily manage your fridge inventory, discover delicious recipes tailored to your ingredients, create shopping lists with cost estimates, and find the best grocery store deals—all in one app.</p>
//                 </div>
//             </div>
//         </div>
//         <div className='head'> Explore WhatToCook </div>
//         <div class="middle-section">
//             <div className='price_box'> 
//                 {/* <Link to ='/PriceComparer'> </Link>*/}
//                 <div className='price_header'>
//                     <h2>Price Comparer</h2>
//                 </div>
//                 <img
//                     src='./images/Home/groceries.jpg'
//                     className='price_picture'
//                     onClick={()=>handlePrice()}
//                     alt=''
//                 />
//                 <div className='price_content'>
//                     <p className='Price-Description'> 
//                         Use the search bar to type the ingredients you're looking for {'\n'}
//                         Click "Search" {'\n'}
//                         See the displayed results and click on your desired option {'\n'}
//                         Click on the name if you want to be brought to the grocery store's page 
//                     </p>
//                 </div> 
//             </div>
//             <div className='recipe_box'>
//                 <img
//                     src='./images/Home/Background.jpg'
//                     className='recipe_picture'
//                     onClick={()=>handleRecipe()}
//                     alt=''
//                 />
//                 <div className='recipe_content'>
//                     <h2>Recipe Generator</h2>
//                     <p className='Recipe-Description'> 
//                         How To Use 
//                     </p>
//                 </div> 
//             </div>
//         </div>
//         <div className='bottom-page'>
//             <div className='diet_box'>
//                 <img
//                     src='./images/Home/food_stock_photos.webp'
//                     className='diet_picture'
//                     onClick={()=>handleDiet()}
//                     alt=''
//                 />
//                 <div className='diet_content'>
//                     <h2>Dietary Restrictions</h2>
//                     <p className='diet-Description'> 
//                     The dietary restriction page enables you to select allergy and diet restrictions you wish to exclude from your recipe searches {'\n'}
//                     By selecting a restriction, then saving it, the system will record your preferences {'\n'}
//                     You can renable any prefeences you wish to change at anytime 
//                     </p>
//                 </div> 
//             </div>
//         </div>
//         <Footer/>
//     </div>
// )
// }

export default withTokenExpirationCheck(Home);
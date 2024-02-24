import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import withTokenExpirationCheck from "./withTokenExpirationCheck";

function About() {
    return (
        <div style={{fontFamily:'cursive', backgroundColor: 'tan'}}>
        <Header/>
            <div style = {{size:'20px'}}>
                <h1 style = {{size:'30px'}}>About Us</h1>
                <h2 style = {{background: 'ivory', margin:'10px'}}>At WhatToCook, our mission is to simplify your cooking experiences. Input your fridge's ingredients, and our recipe generator will create delicious meals just for you. Plus, our price comparer helps you find the best deals on ingredients, making your kitchen adventures both tasty and budget-friendly.</h2>
                <h1 style = {{size:'30px'}}> Meet the Creators </h1>
            </div>
            <div style = {{background: 'ivory', margin:'10px'}}>
                <h2 style = {{size: '25px'}}> Valerie Duffey</h2>
                <h3> Valerie Duffey is a senior at the University of South Carolina studying computer engineering. Her passion for this field ignited at a young age and plans to continue this love throughout her career.  Valerie boasts invaluable hands-on experience, having actively contributed to the development and optimization of 5G networks and creating dynamic dashboards explaining the data related to it. In addition to work, she is on the executive board of Tau Beta Pi, where she plans professional and philanthropic events to better those involved.</h3>
            </div>
            <div style = {{background: 'ivory', margin:'10px'}}>
                <h2 style = {{size: '25px'}}> Justin Martin</h2>
                <h3> Justin Martin is a senior at the University of South Carolina studying computer engineering. His passion for computers comes from his father as he watched him work on computers all his life. Another thing that lit his passion is video games and how they worked. Justin has worked on many cool projects such as robots and mini coding projects.</h3>
            </div>
            <div style = {{background: 'ivory', margin:'10px'}}>  
                <h2 style = {{size: '25px'}}> Antonio Turner</h2>
                <h3> Antonio Turner is a senior at the University of South Carolina studying computer engineering. His passion for computer engineering stems from his love of robotics and automation. He believes every process can be automated and re-constructed to make life in general better and faster for everyone. His background in DevOps engineering and robotic analysis, as well as his research in societal statistics motivates him to bring real solutions to everyday problems. Using his many leadership experiences, he hopes to bring the world into a new era of automation.</h3>
            </div>
            <div style = {{background: 'ivory', margin:'10px'}}>   
                <h2 style = {{size: '25px'}}> Adyen Owens</h2>
                <h3> Ayden is a senior currently pursuing his degree in Computer Engineering at the University of South Carolina. Ayden's love for STEM and astrophysics shines through in his work and dedication. Beyond his studies, he actively engages in various extracurricular activities, including his involvement in the IEEE club and the SOU Professional Business Fraternity. As a Peer Leader at the UofSC Student Success Center, Ayden demonstrates his genuine passion for helping others, making him an invaluable asset to our team.</h3>
            </div>
            <div style = {{background: 'ivory', margin:'10px'}}>
                <h2 style = {{size: '25px'}}> Charles Castelot</h2>
                <h3> My name is Charles Castelot. I am a senior at the University of South Carolina, with a major in computer engineering. I was born in Santiago, Chile, and raises in France since the age of 3. At 16 years old, I continued my studies in Canada, where I learned English. After finishing CEGEP, I continued my engineering studies at my current university in the U.S.</h3>
            </div>
        <Footer/>
        </div>
    )
}
export default withTokenExpirationCheck(About);
// Home.js

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


function Home() {
    return (
        <div className='home'>
            <Navbar/>
            <Sidebar/>
            <br>
            </br>
            <h2>Welcome to the Dune state University</h2>
            <p>This is the protected home page. Only logged-in users can access it.</p>
        </div>
    );
}



export default Home;

// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Sidebar.css";


const Sidebar = () => {
    return (
        <div className="sidebar fixed border-end border-dark">
            <ul>
                <li>
                    <a href="/Home">Home</a>
                </li>
                {/* <li><a href="#news">News</a></li> */}
                <li className="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">OS</a>
                    <div className="dropdown-content">
                        <a href="/Unit1">UNIT 1</a>
                        <a href="#">UNIT 2</a>
                        <a href="#">UNIT 3</a>
                    </div>
                </li>
                {/* <br> */}
                {/* </br> */}
                <li className="nav-item  ">
                    <Link to='/UploadVideo'>
                        <button className="btn font-monospace" >Upload Video</button>
                    </Link> 
                </li>
                <li className="nav-item pe-3 ">
                    <Link to='/UploadPDF'>
                        <button className="btn font-monospace">Upload PDF</button>
                    </Link>
                </li>
            </ul>
        </div>
    );//
}

export default Sidebar;



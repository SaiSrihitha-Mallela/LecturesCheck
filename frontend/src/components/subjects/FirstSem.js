import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "../css/sem.css";

const FirstSem = () => {
    const[nextpage,setnextpage] = useState(" ");

    const hangleNextPage = ()=>{
        setnextpage(window.location.href="/COA");
    }
    const customPrimaryColor = '#27012d';


    return ( 
        <>
        <Navbar/>
        <Sidebar/>
        <div className="services parent">
            <div className="row roww">
                <div className="column colomn">
                    <div className="card cards">
                            <ul class="list-unstyled lists " style={{ fontSize: "105%", fontWeight: "bold" }}>
                               <li><h5>COMPUTER ORGANIZATION AND ARCHITECTURE</h5></li>
                                <li><p>Please click on the button to upload the Notes</p></li>

                                <button className="btn button mt-1 " style={{ backgroundColor:customPrimaryColor, color: "white" }} onClick={hangleNextPage} >click</button>
                            </ul>
                    </div>
                </div>
            </div>

        </div>
        </>
     );
}
 
export default FirstSem;
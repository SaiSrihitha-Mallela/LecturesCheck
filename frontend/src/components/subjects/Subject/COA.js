import React from "react";
import { useState } from "react";
import Navbar from "../../Navbar";
// import Sidebar from "../../Sidebar";
import "../../css/subjects.css"
import Unit1 from "../../Units/Unit1";
import Unit2 from "../../Units/Unit2";
import Unit3 from "../../Units/Unit3";
import Unit4 from "../../Units/Unit4";
import Unit5 from "../../Units/Unit5";
// import Unit1 from "../../Units/Unit1";
const COA = () => {
    const [currentPage, setCurrentPage] = useState(" ");

    const renderContent = ()=>
        {
            switch(currentPage)
            {
                case 0:
                    return <Unit1/>;
                case 1:
                    return <Unit2/>;
                case 2:
                    return <Unit3/>;
                case 3:
                    return <Unit4/>;
                case 4:
                    return <Unit5/>;
                default:
                    return <Unit1/>;
            }
        }
    return ( 
        <>
        <Navbar/>
        {/* <Sidebar/> */}
        <h2 className="heading d-flex justify-content-start ps-4 pt-5 pb-2">Computer Organization and Architecture</h2>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="services sub-serv">
                        <div className="row sub-row">
                            <div className="column sub-column">
                                <div className="card sub-cards ">
                                    <h4 className="units" style={{fontWeight:"bold"}}>UNITS</h4>
                                    
                                    <ul className="Ul-list">
                                    
                                        <li className="list pb-2">
                                            <a href="/Unit1" className="link-offset-2 list link-underline link-underline-opacity-0 ">Unit 1</a>
                                        </li>
                                    
                                        <li className="list pb-2">
                                            <a href="/Unit1" className="link-offset-2 list link-underline link-underline-opacity-0 "> Unit 2</a>

                                        </li>
                                        <li className="list pb-2">
                                            <a href="/Unit1" className="link-offset-2 list link-underline link-underline-opacity-0 "> Unit 3</a>

                                        </li>
                                        <li className="list pb-2">
                                            <a href="/Unit1" className="link-offset-2 list link-underline link-underline-opacity-0 "> Unit 4</a>

                                        </li>
                                        <li className="list pb-2">
                                            <a href="/Unit1" className="link-offset-2 list link-underline link-underline-opacity-0 "> Unit 5</a>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-2">
                    <div className="card card-2" style={{width:"125%"}}>
                        <h1>hello</h1>
                    </div>
                </div>
            </div>
        </div>
       
       
        </>
     );
}
 
export default COA;





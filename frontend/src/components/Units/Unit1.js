import React from "react";
import { useState } from "react";
import UploadVideo from "../UploadVideo";
import UploadPDF from "../UploadPDF";


const Unit1 = () => {

       return (
        <>
            <h6>unit 1</h6>
            <div>
                <UploadVideo/>
            </div>
            <div>
                <UploadPDF/>
            </div>
           
            
            
       </>
    );
}

export default Unit1;
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './style.css';

function Page1(){
     const [data, setData]= useState("");
     useEffect(()=>{
          axios.get('http://localHost:6789/data/mile')
          .then(result=>setData(result.data))
          .catch(err=>console.log(err));

     },[]); 
    

     return(
          <div className="my_comp">
         
           {
               data.length===0?
               <div>no records</div>
               :
               (
                    <table>
            <thead>
                <tr>
                <th>Lisence_plate</th>
                <th>Make</th>
                <th>Vin</th>
                <th>Model</th>
                <th>Type</th>
                <th>Date</th>
                <th>Miles_driven</th>
                </tr>
            </thead>
            <tbody>
                {data.map((ms, key) => (
                    <tr key={key}>
                         <td>{ms.LicensePlate}</td>
                         <td>{ms.Make}</td>
                         <td>{ms.VIN}</td>
                        <td>{ms.Model}</td>
                        <td>{ms.Type}</td>
                        <td>{ms.Date}</td>
                        <td>{ms.MilesDriven}</td>
                    </tr>
                ))}
            </tbody>
        </table>
               )
          }
          </div>
     )
}

export default Page1;
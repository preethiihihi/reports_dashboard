import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './style.css';

function Page2(){
     const [data, setData]= useState("");
     useEffect(()=>{
          axios.get('http://localHost:6789/data/month')
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
                <th>Year</th>
                <th>Month</th>
                <th>Total_Miles</th>
                </tr>
            </thead>
            <tbody>
                {data.map((ms, key) => (
                    <tr key={key}>
                        <td>{ms.year}</td>
                        <td>{ms.month}</td>
                        <td>{ms.totalMiles}</td>
                    </tr>
                ))}
            </tbody>
        </table>
               )
          }
          </div>
     )
}
export default Page2;
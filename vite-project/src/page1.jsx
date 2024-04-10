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
     const [fromdate, setFromdate]= useState("");
     const [todate, setTodate]=useState("");

     const handleSubmit = async (event) => {
          event.preventDefault();
          try { 
            const response = await axios.post('http://localHost:6789/data/get', { fromdate:fromdate, todate:todate });
            setData(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
      

     return(

          <div className="my_comp">
          <br/>
          <form id="dateForm">
        <label htmlFor="datefrom">Enter Date (yyyy/mm/dd):</label>
        <input type="text" id="datefrom" name="datefrom" pattern="\d{4}/\d{2}/\d{2}" required onChange={event=>setFromdate(event.target.value)}/>
        <label htmlFor="dateto">Enter Date (yyyy/mm/dd):</label>
        <input type="text" id="dateto" name="dateto" pattern="\d{4}/\d{2}/\d{2}" required onChange={event=>setTodate(event.target.value)}/>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
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
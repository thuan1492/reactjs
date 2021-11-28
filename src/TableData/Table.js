import React, {useState, useEffect } from 'react';
import DataLoader from "./DataLoader";


//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import ModalProduct from './ModalProduct';


export default function Table () {

 const [selectrow, setSelectRow] = useState(-1);
 const [data, setData] = useState([]);
 const endPoint = "https://basic-product-manager-reactjs.herokuapp.com/products"
 
 useEffect(() => {
      //initialize datatable

   
    fetch(endPoint)
     .then(response => response.json())
     .then(data => 
      {
       setData(data); 
        $('#example').DataTable();
    });
  
 });
  
    //Datatable HTML
  return (
    <div className="MainDiv">
      
      
      <div className="container">
          
          <table id="example" class="display">
            <thead>
                <tr>
                    <th>ID </th>
                    <th>Product Name</th>
                    <th>Product Type</th>
                    <th>Product Price</th>
                    <th>Product Quantity</th>
                    <th>Product Description </th>
                    <th>UPDATE</th>
                </tr>
            </thead>
            <tbody>
            {data.map((el) => (<DataLoader product={el} onClick={()=>setSelectRow(el.id)}/>))}
            </tbody>
            <tfoot>
                <tr>
                    <th>ID </th>
                    <th>Product Name</th>
                    <th>Product Type</th>
                    <th>Product Price</th>
                    <th>Product Quantity</th>
                    <th>Product Description </th>
                    <th>UPDATE</th>
                </tr>
            </tfoot>
        </table>  
        {data.map((el) => (
           (el.id===selectrow) && (<ModalProduct product={el} ishow={true} Close={()=>setSelectRow(-1)}/>)))}
        </div>
      </div>
  );

}

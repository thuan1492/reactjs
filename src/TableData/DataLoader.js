import React, { useState} from "react";


import $ from "jquery";


export default function ProductLoaderData({product, onClick}){
    
   

    const [productName, setProductName] = useState(product.productName);
    const [productType, setProductType] = useState(product.productType);
    const [productDescription, setProductDescription] = useState(product.productDescription);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productQuantity, setProductQuantity] = useState(product.quantity);

    const endPoint = "http://basic-product-manager-reactjs.herokuapp.com/products"

    return(
        
        <tr key={product.id}>
        
        <td>{product.id}</td>
        <td id='productName'>{productName}</td>
        <td id='productType'>{productType}</td>
        <td id='productPrice'>{productPrice}</td>
        <td id='productQuantity'>{productQuantity}</td>
        <td id='productDescription'>{productDescription} </td>
        
        
        
        <td>
            <div class="btn-group align-top">
            
                <button class="btn btn-sm btn-outline-secondary" type="button" onClick={onClick}>Edit</button>
                
                <button class="btn btn-sm btn-danger btn-outline-secondary" type="button" onClick={() => { 
          if (window.confirm('Are you sure you wish to DELETE this product?'))
          {
            fetch(endPoint + "/" + product.id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
          }).then(data => {
            if(data.status == 200){
                window.location.reload();
              }
          })
          }
          } }>Remove</button>
            </div>

            
          </td>

        
      </tr>  

    );
} 
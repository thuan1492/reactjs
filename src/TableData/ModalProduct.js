import React, { useState} from "react";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import $ from "jquery";


export default function ModalProduct({product,ishow=false, Close, Show}){
    
   
    const [show, setShow] = useState(ishow);
    
    const [validated, setValidated] = useState(false);

    const [productName, setProductName] = useState(product.productName);
    const [productType, setProductType] = useState(product.productType);
    const [productDescription, setProductDescription] = useState(product.productDescription);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productQuantity, setProductQuantity] = useState(product.quantity);

    const endPoint = "http://basic-product-manager-reactjs.herokuapp.com/products"

    const handleClose = () => {Close(); setShow(false);}
    const handleShow = () => {Show(); setShow(true);}

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        else {
          
          fetch(endPoint, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: product.id, productName: productName, 
                productType: productType,price: productPrice, quantity: productQuantity,
                 productDescription : productDescription})
          }).then(data => {
            data.json();
            if(data.status == 200){
              window.location.reload();
            }
          })
        }
        setValidated(true)
        
    
       
      };

    return(
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PRODUCT </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control required value={productName} type="text" placeholder="Enter product name" onChange={e => setProductName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control required type="number" value={productPrice} placeholder="Enter product price"  onChange={e => setProductPrice(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productQuantity">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control required type="number" value={productQuantity} placeholder="Enter product quantity"  onChange={e => setProductQuantity(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control required type="text" value={productDescription} placeholder="Enter product description"  onChange={e => setProductDescription(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productType">
              <Form.Label>Product Type</Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    checked={"smart watch" === productType}
                    onChange={e => setProductType("smart watch")}
                    inline
                    label="smart watch"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    checked={"phone" === productType}
                    onChange={e => setProductType("phone")}
                    inline
                    label="phone"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    checked={"cleaner" === productType}
                    inline
                    onChange={e => setProductType("cleaner")}
                    label="cleaner"
                    name="group1"
                    type={type}
                    id={`inline-${type}-3`}
                  />
                </div>
              ))}
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    );
} 
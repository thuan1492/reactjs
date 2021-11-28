import React, { useState } from 'react';
import './App.css';

import Table from './TableData/Table';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [show, setShow] = useState(false);

  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState("smart watch");
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const [validated, setValidated] = useState(false);
  
  const endPoint = "http://basic-product-manager-reactjs.herokuapp.com/products"

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      
      fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: productName, 
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">
      <div class="jumbotron text-center bg-sky">
        <h2>Product Management</h2>
      </div>

      <Button onClick={handleShow}>
        Add New Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter product name" onChange={e => setProductName(e.target.value)}/>
              <Form.Control.Feedback type="invalid">  Please enter product Name. </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control required type="number" placeholder="Enter product price"  onChange={e => setProductPrice(e.target.value)} />
              <Form.Control.Feedback type="invalid">  Please enter product price in number. </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productQuantity">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control required type="number" placeholder="Enter product quantity"  onChange={e => setProductQuantity(e.target.value)}/>
              <Form.Control.Feedback type="invalid">  Please enter product quantity in number. </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control required type="text" placeholder="Enter product description"  onChange={e => setProductDescription(e.target.value)}/>
              <Form.Control.Feedback type="invalid">  Please enter some Description of product. </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productType">
              <Form.Label>Product Type</Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    defaultChecked="true"
                    onChange={e => setProductType("smart watch")}
                    inline
                    label="smart watch"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    onChange={e => setProductType("phone")}
                    inline
                    label="phone"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
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
      <Table />


    </div>
  );
}

export default App;

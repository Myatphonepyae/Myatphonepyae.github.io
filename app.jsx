import { useState,useRef } from 'react';
import {Button,Container,Row,Col}from 'react-bootstrap';
function App(){
  const pRef=useRef()
  const qRef=useRef()
  const handleAdd=(e)=>{
    const p=pRef.current.value
    const q=qRef.current.value
    console.log(p,q)
  }
  return(
   <>
   <Container>
    <Row>

      <Col> 
        <span>Product</span>
        <Col>
        </Col>
        <input type="text" ref={pRef}/>
      </Col>
    <Row>

    </Row>
      <Col>
        <span>Quantity</span>
        <input type="number"ref={qRef}/>
      </Col>
      <Button variant="secondary" onClick={handleAdd}>Add</Button>
    </Row>
   </Container>
   </>
  )
}
export default App;

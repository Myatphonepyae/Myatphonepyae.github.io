import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef(); // Reference for discount input

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    const selectedProduct = products.find(
      (v) => itemRef.current.value === v.code
    );
    const quantity = parseInt(qtyRef.current.value, 10);
    const pricePerUnit = parseFloat(ppuRef.current.value);
    const discountPercentage = parseFloat(discountRef.current.value);

    // Calculate discount amount and total price
    const discountAmount =
      (pricePerUnit * quantity * discountPercentage) / 100;
    const totalPrice = pricePerUnit * quantity - discountAmount;

    // Check if item with the same name and price exists
    const existingItemIndex = dataItems.findIndex(
      (v) =>
        v.item === selectedProduct.name &&
        v.ppu === pricePerUnit &&
        v.discount === discountPercentage
    );

    if (existingItemIndex >= 0) {
      // If item exists with same discount, update the quantity, discount, and total price
      const updatedItems = [...dataItems];
      const existingItem = updatedItems[existingItemIndex];
      const newQuantity = existingItem.qty + quantity;
      const newDiscountAmount =
        (pricePerUnit * newQuantity * discountPercentage) / 100;
      const newTotalPrice = pricePerUnit * newQuantity - newDiscountAmount;

      updatedItems[existingItemIndex] = {
        ...existingItem,
        qty: newQuantity,
        discountAmount: newDiscountAmount,
        totalPrice: newTotalPrice,
      };

      setDataItems(updatedItems);
    } else {
      // Add new item if it doesn't exist with the same discount
      const newItem = {
        item: selectedProduct.name,
        ppu: pricePerUnit,
        qty: quantity,
        discount: discountPercentage,
        discountAmount: discountAmount,
        totalPrice: totalPrice,
      };

      setDataItems([...dataItems, newItem]);
    }
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(ppuRef.current.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control type="number" ref={discountRef} defaultValue={0} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

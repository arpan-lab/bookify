import React from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

const Detail = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, [params.bookId, firebase]);

   const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    console.log("Order Placed", result);
  };

  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "25rem" }}>
        <Card.Img
          variant="top"
          src={data.imageURL} // ✅ using the URL directly
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>Price: ₹{data.price}</Card.Text>
          <Card.Text>ISBN: {data.isbn}</Card.Text>
          <Card.Text>Listed by: {data.displayName}</Card.Text>

          <div className="d-flex align-items-center gap-2 mb-2">
            <input
              type="number"
              className="form-control"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              style={{ width: "70px" }}
            />
            <span className="text-muted">Qty</span>
          </div>

          <Button variant="primary" onClick={placeOrder}>
            Buy Now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;

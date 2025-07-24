import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const BookCard = (props) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm" style={{ width: "100%" }}>
      <Card.Img
        variant="top"
        src={props.imageURL || "/placeholder.jpg"}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className="flex-grow-1">
          <strong>{props.name}</strong> by{" "}
          <strong>{props.displayName}</strong>
          <br />
          ₹{props.price}
        </Card.Text>
        <Button onClick={() => navigate(props.link)} variant="primary">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;

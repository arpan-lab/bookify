import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import "../App.css";

const ListingPage = () => {
  const firebase = useFirebase();
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
    setName("");
    setIsbnNumber("");
    setPrice("");
    setCoverPic("");
  };

  return (
    <div className="homepage-bg">
      <p className="quote-top-right">"The only thing you absolutely have to know is the location of the library." – Albert Einstein</p>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
        <Card className="shadow-lg p-4 listing-card" style={{ width: "100%", maxWidth: "600px" }}>
          <Card.Title className="text-center text-primary fs-2 mb-4">📚 Add a New Book</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="bookName">
              <Form.Label className="fw-semibold">Book Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Book Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="isbnNumber">
              <Form.Label className="fw-semibold">ISBN Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ISBN"
                value={isbnNumber}
                onChange={(e) => setIsbnNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label className="fw-semibold">Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min={1}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="coverPic">
              <Form.Label className="fw-semibold">Cover Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setCoverPic(e.target.files[0])}
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="success" size="lg" type="submit">
                Create Listing
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ListingPage;

// src/pages/HomePage.jsx

import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import BookCard from "../components/Card";
import { useFirebase } from "../context/Firebase";

const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) =>
      setBooks(books.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  return (
    <Container className="mt-5">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <BookCard
              link={`/book/view/${book.id}`}
              {...book}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;

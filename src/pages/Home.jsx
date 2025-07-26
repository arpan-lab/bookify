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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="homepage-bg">
      <p className="quote">"A reader lives a thousand lives before he dies."</p>
      <Container className="py-5">
        <h2 className="text-center text-success mb-4">📖 Explore Books</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.length > 0 ? (
            books.map((book) => (
              <Col key={book.id}>
                <BookCard link={`/book/view/${book.id}`} {...book} />
              </Col>
            ))
          ) : (
            <p className="text-center">No books available.</p>
          )}
        </Row>
      </Container>
      <p className="quote-bottom">
        "Books are a uniquely portable magic." — Stephen King
      </p>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";

const ViewOrders = () => {
  const firebase = useFirebase();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!firebase.user) return;

      setLoading(true);
      const allBooksSnapshot = await firebase.listAllBooks();
      const currentUserOrders = [];

      for (const bookDoc of allBooksSnapshot.docs) {
        const bookId = bookDoc.id;
        const bookData = bookDoc.data();
        const ordersSnapshot = await firebase.getOrders(bookId);

        ordersSnapshot.forEach((orderDoc) => {
          const orderData = orderDoc.data();

          // Match only orders made by the logged-in user
          if (orderData.userID === firebase.user.uid) {
            currentUserOrders.push({
              ...orderData,
              orderId: orderDoc.id,
              bookId,
              bookName: bookData.name,
              bookImage: bookData.imageURL,
              bookPrice: bookData.price,
            });
          }
        });
      }

      setMyOrders(currentUserOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [firebase]);

  if (!firebase.isLoggedIn) {
    return (
      <div className="container mt-4">
        <h3>Please log in to view your orders.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📚 My Orders</h2>
      {loading ? (
        <p>Loading your orders...</p>
      ) : myOrders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <div className="row">
          {myOrders.map((order) => (
            <div className="col-md-4 mb-4" key={order.orderId}>
              <div className="card shadow-sm h-100">
                <img
                  src={order.bookImage}
                  className="card-img-top"
                  alt={order.bookName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{order.bookName}</h5>
                  <p className="card-text">Quantity: {order.qty}</p>
                  <p className="card-text">Price: ₹{order.bookPrice}</p>
                  <p className="card-text">Ordered by: {order.displayName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;

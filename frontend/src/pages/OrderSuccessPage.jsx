import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p>No order details were found. Please return to the home page.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Checkout Successful!</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <p className="mb-2">
          <strong>Order ID:</strong> {order._id}
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Items:</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.product._id} className="flex justify-between items-center mb-2">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="text-right">
          <p className="text-xl font-bold">
            Total: ${order.totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
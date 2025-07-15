import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useOrderStore from '../store/orderStore';
import { Button } from '../components/ui/button';

const Checkout = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStatus, isLoading, error } = useOrderStore();
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderById(orderId);
      setOrder(data);
    };
    fetchOrder();
  }, [orderId, getOrderById]);

  const handlePayment = async () => {
    // Simulate payment processing
    const result = await updateOrderStatus(orderId, 'paid');
    if (result.success) {
      alert('Payment successful! Thank you for your order.');
      navigate('/dashboard');
    } else {
      alert('Payment failed: ' + result.error);
    }
  };

  if (!order) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Listing:</strong> {order.listing?.title || 'N/A'}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total Price:</strong> KES {order.totalPrice}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="credit_card">Credit Card</option>
          <option value="mpesa">M-Pesa</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <Button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? 'Processing Payment...' : 'Pay Now'}
      </Button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default Checkout;

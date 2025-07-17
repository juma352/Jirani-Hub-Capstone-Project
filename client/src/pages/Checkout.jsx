import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import useOrderStore from '../store/orderStore';
import useAuthStore from '../providers/useAuthStore';
import { formatCurrency } from '../lib/utils';
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  User,
  Phone,
  Mail
} from 'lucide-react';

const Checkout = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getOrderById, updateOrderStatus, isLoading, error } = useOrderStore();
  
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [step, setStep] = useState(1); // 1: Review, 2: Payment, 3: Confirmation
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    mpesaNumber: ''
  });

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderById(orderId);
      setOrder(data);
    };
    fetchOrder();
  }, [orderId, getOrderById]);

  const handleShippingChange = (e) => {
    setShippingInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const result = await updateOrderStatus(orderId, 'paid');
    if (result.success) {
      setStep(3);
    }
    setPaymentProcessing(false);
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'mpesa':
        return <Smartphone className="h-5 w-5" />;
      case 'paypal':
        return <CreditCard className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getStepProgress = () => {
    return (step / 3) * 100;
  };

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span>Order ID:</span>
                <span className="font-mono">{order._id}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span>Total Paid:</span>
                <span className="font-bold text-green-600">{formatCurrency(order.totalPrice)}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Button onClick={() => navigate('/dashboard/listings')} className="flex-1">
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600">Complete your purchase</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {step} of 3</span>
          <span className="text-sm text-gray-500">{Math.round(getStepProgress())}% Complete</span>
        </div>
        <Progress value={getStepProgress()} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span className={step >= 1 ? 'text-primary font-medium' : ''}>Review Order</span>
          <span className={step >= 2 ? 'text-primary font-medium' : ''}>Payment</span>
          <span className={step >= 3 ? 'text-primary font-medium' : ''}>Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <>
              {/* Order Review */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      {order.listing?.images?.[0] ? (
                        <img
                          src={`http://localhost:5000/${order.listing.images[0].replace(/\\/g, '/')}`}
                          alt={order.listing.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{order.listing?.title || 'Product'}</h3>
                      <p className="text-sm text-gray-600 capitalize">{order.listing?.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Quantity: {order.quantity}</span>
                        <span className="font-semibold">{formatCurrency(order.totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full"
                disabled={!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address}
              >
                Continue to Payment
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'credit_card', label: 'Credit Card', icon: CreditCard },
                      { id: 'mpesa', label: 'M-Pesa', icon: Smartphone },
                      { id: 'paypal', label: 'PayPal', icon: CreditCard }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border rounded-lg flex items-center space-x-3 transition-all ${
                          paymentMethod === method.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <method.icon className="h-5 w-5" />
                        <span className="font-medium">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Payment Form */}
                  {paymentMethod === 'credit_card' && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={paymentInfo.cardName}
                          onChange={handlePaymentChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'mpesa' && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="mpesaNumber">M-Pesa Number *</Label>
                        <Input
                          id="mpesaNumber"
                          name="mpesaNumber"
                          placeholder="254712345678"
                          value={paymentInfo.mpesaNumber}
                          onChange={handlePaymentChange}
                          required
                        />
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800">
                          You will receive an M-Pesa prompt on your phone to complete the payment.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <p className="text-sm text-blue-800">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back to Review
                </Button>
                <Button 
                  onClick={handlePayment} 
                  disabled={paymentProcessing}
                  className="flex-1"
                >
                  {paymentProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatCurrency(order.totalPrice)}`
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{formatCurrency(order.totalPrice * 0.16)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(order.totalPrice * 1.16)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Secure Checkout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  SSL encrypted payment
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Money-back guarantee
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Secure data protection
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
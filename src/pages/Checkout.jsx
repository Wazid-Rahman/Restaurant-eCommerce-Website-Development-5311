import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiClock, FiCreditCard, FiCheck, FiTruck, FiHome } = FiIcons;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart, coupon } = useCart();
  const { user, updateUser } = useAuth();
  
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [tip, setTip] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    phone: user?.phone || '',
    instructions: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: user?.firstName + ' ' + user?.lastName || ''
  });

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' && subtotal < 50 ? 5.99 : 0;
  const discount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const total = subtotal + deliveryFee + tip - discount;

  const handleDeliveryInfoChange = (field, value) => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const order = {
        id: Date.now(),
        items,
        total,
        orderType,
        status: 'confirmed',
        estimatedTime: orderType === 'delivery' ? '30-45 minutes' : '15-20 minutes',
        createdAt: new Date().toISOString(),
        deliveryInfo: orderType === 'delivery' ? deliveryInfo : null,
        paymentMethod,
        tip
      };

      // Update user with order
      const updatedUser = {
        ...user,
        orders: [...(user.orders || []), order],
        loyaltyPoints: (user.loyaltyPoints || 0) + Math.floor(total)
      };
      
      updateUser(updatedUser);
      clearCart();
      setIsProcessing(false);
      
      // Navigate to order tracking
      navigate('/order-tracking', { state: { newOrder: order } });
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-gray-900">
        Order Type
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setOrderType('delivery')}
          className={`p-6 rounded-lg border-2 transition-colors ${
            orderType === 'delivery'
              ? 'border-burgundy-700 bg-burgundy-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiTruck} className="w-6 h-6 text-burgundy-700" />
            <div className="text-left">
              <h3 className="font-playfair font-semibold text-gray-900">Delivery</h3>
              <p className="text-sm text-gray-600 font-opensans">30-45 minutes</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => setOrderType('pickup')}
          className={`p-6 rounded-lg border-2 transition-colors ${
            orderType === 'pickup'
              ? 'border-burgundy-700 bg-burgundy-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiHome} className="w-6 h-6 text-burgundy-700" />
            <div className="text-left">
              <h3 className="font-playfair font-semibold text-gray-900">Pickup</h3>
              <p className="text-sm text-gray-600 font-opensans">15-20 minutes</p>
            </div>
          </div>
        </button>
      </div>

      {orderType === 'delivery' && (
        <div className="space-y-4">
          <h3 className="text-lg font-playfair font-semibold text-gray-900">
            Delivery Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Street Address"
              value={deliveryInfo.address}
              onChange={(e) => handleDeliveryInfoChange('address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={deliveryInfo.city}
              onChange={(e) => handleDeliveryInfoChange('city', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
              required
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={deliveryInfo.zipCode}
              onChange={(e) => handleDeliveryInfoChange('zipCode', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={deliveryInfo.phone}
              onChange={(e) => handleDeliveryInfoChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
              required
            />
          </div>
          
          <textarea
            placeholder="Delivery Instructions (optional)"
            value={deliveryInfo.instructions}
            onChange={(e) => handleDeliveryInfoChange('instructions', e.target.value)}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
          />
        </div>
      )}

      <button
        onClick={() => setStep(2)}
        className="w-full bg-burgundy-700 text-white py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans font-semibold"
      >
        Continue to Payment
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-gray-900">
        Payment & Tip
      </h2>
      
      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-playfair font-semibold text-gray-900">
          Payment Method
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'card', label: 'Credit Card', icon: FiCreditCard },
            { id: 'paypal', label: 'PayPal', icon: FiCreditCard },
            { id: 'cash', label: 'Cash on Delivery', icon: FiCreditCard }
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                paymentMethod === method.id
                  ? 'border-burgundy-700 bg-burgundy-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={method.icon} className="w-5 h-5 text-burgundy-700" />
                <span className="font-opensans">{method.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Card Details */}
      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <h3 className="text-lg font-playfair font-semibold text-gray-900">
            Card Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Card Number"
              value={paymentInfo.cardNumber}
              onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
              required
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              value={paymentInfo.cardholderName}
              onChange={(e) => handlePaymentInfoChange('cardholderName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
              required
            />
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-opensans"
              required
            />
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="space-y-4">
        <h3 className="text-lg font-playfair font-semibold text-gray-900">
          Add Tip (Optional)
        </h3>
        
        <div className="grid grid-cols-4 gap-2">
          {[0, 2, 3, 5].map((amount) => (
            <button
              key={amount}
              onClick={() => setTip(amount)}
              className={`p-3 rounded-md border transition-colors font-opensans ${
                tip === amount
                  ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {amount === 0 ? 'No Tip' : `$${amount}`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition-colors font-opensans font-semibold"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="flex-1 bg-burgundy-700 text-white py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans font-semibold"
        >
          Review Order
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-gray-900">
        Order Review
      </h2>
      
      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
          Order Summary
        </h3>
        
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.cartId} className="flex justify-between font-opensans">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-opensans">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between font-opensans">
                <span>Delivery Fee:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between font-opensans text-green-600">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            {tip > 0 && (
              <div className="flex justify-between font-opensans">
                <span>Tip:</span>
                <span>${tip.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-4">
          Order Details
        </h3>
        
        <div className="space-y-2 font-opensans">
          <div className="flex justify-between">
            <span>Order Type:</span>
            <span className="capitalize">{orderType}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="capitalize">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Time:</span>
            <span>{orderType === 'delivery' ? '30-45 minutes' : '15-20 minutes'}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition-colors font-opensans font-semibold"
        >
          Back
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="flex-1 bg-burgundy-700 text-white py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans font-semibold flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiCheck} className="w-5 h-5" />
              <span>Place Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate('/menu')}
            className="bg-burgundy-700 text-white px-6 py-3 rounded-md hover:bg-burgundy-600 transition-colors font-opensans"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center ${
                  stepNumber < 3 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-opensans font-semibold ${
                    step >= stepNumber
                      ? 'bg-burgundy-700 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step > stepNumber ? 'bg-burgundy-700' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-opensans text-gray-600">Order Type</span>
            <span className="text-sm font-opensans text-gray-600">Payment</span>
            <span className="text-sm font-opensans text-gray-600">Review</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
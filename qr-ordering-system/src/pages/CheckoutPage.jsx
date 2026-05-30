import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function CheckoutPage() {
  const { cartItems, updateQuantity, removeItem, clearCart, totalAmount } = useCart()
  const navigate = useNavigate()
  const [paymentResult, setPaymentResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return alert('Your cart is empty!')
    setLoading(true)

    // Mock payment: 70% success, 30% failure
    const isSuccess = Math.random() < 0.7

    const orderData = {
      total_amount: totalAmount,
      items: cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.price
      }))
    }

    try {
      //const res = await fetch('http://localhost:3001/api/orders', {
      const res = await fetch('/api/orders', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderData,
          payment_status: isSuccess ? 'paid' : 'failed'
        })
      })
      const data = await res.json()

      setPaymentResult(isSuccess ? 'success' : 'failed')
      if (isSuccess) clearCart()

    } catch (err) {
      alert('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  // Payment result screen
  if (paymentResult === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ 
          fontSize: '64px', 
          lineHeight: '1',
          marginBottom: '16px'
        }}>✅</div>
        <h2 style={{ 
          color: '#16a34a',
          margin: '0 0 8px 0'
        }}>Payment Successful!</h2>
        <p style={{ color: '#666' }}>Your order has been placed.</p>
        <button
          onClick={() => { setPaymentResult(null); navigate('/') }}
          style={{
            marginTop: '20px', padding: '10px 24px',
            backgroundColor: '#f97316', color: 'white',
            border: 'none', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          Back to Menu
        </button>
      </div>
    )
  }

  if (paymentResult === 'failed') {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ 
          fontSize: '64px', 
          lineHeight: '1',
          marginBottom: '16px'
        }}>❌</div>
        <h2 style={{ 
          color: '#dc2626',
          margin: '0 0 8px 0'
        }}>Payment Failed!</h2>
        <p style={{ color: '#666' }}>Something went wrong. Please try again.</p>
        <button
          onClick={() => setPaymentResult(null)}
          style={{
            marginTop: '20px', padding: '10px 24px',
            backgroundColor: '#f97316', color: 'white',
            border: 'none', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ 
          fontSize: '64px', 
          lineHeight: '1',
          marginBottom: '16px'
        }}>🛒</div>
        <h2 style={{ 
          color: '#dc2626',
          margin: '0 0 8px 0'
        }}>Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '20px', padding: '10px 24px',
            backgroundColor: '#f97316', color: 'white',
            border: 'none', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          Browse Menu
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Your Order</h2>

      {cartItems.map(item => (
        <div key={item.product_id} style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderBottom: '1px solid #eee'
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{item.product_name}</p>
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
              ₱{parseFloat(item.price).toFixed(2)} each
            </p>
          </div>

          {/* Quantity controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid #ddd', cursor: 'pointer',
                backgroundColor: '#fff', fontWeight: 'bold'
              }}
            >−</button>
            <span style={{ minWidth: '20px', textAlign: 'center' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid #ddd', cursor: 'pointer',
                backgroundColor: '#fff', fontWeight: 'bold'
              }}
            >+</button>
          </div>

          {/* Item total */}
          <p style={{ margin: '0 0 0 16px', fontWeight: 'bold', minWidth: '70px', textAlign: 'right' }}>
            ₱{(item.price * item.quantity).toFixed(2)}
          </p>

          {/* Remove button */}
          <button
            onClick={() => removeItem(item.product_id)}
            style={{
              marginLeft: '12px', background: 'none',
              border: 'none', color: '#dc2626',
              cursor: 'pointer', fontSize: '18px'
            }}
          >🗑</button>
        </div>
      ))}

      {/* Total */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '16px 0', fontWeight: 'bold', fontSize: '18px'
      }}>
        <span>Total</span>
        <span>₱{totalAmount.toFixed(2)}</span>
      </div>

      {/* Place Order button */}
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        style={{
          width: '100%', padding: '14px',
          backgroundColor: loading ? '#ccc' : '#f97316',
          color: 'white', border: 'none',
          borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold', fontSize: '16px'
        }}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  )
}

export default CheckoutPage
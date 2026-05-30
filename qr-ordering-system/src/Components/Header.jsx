import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Header() {
  const { cartItems } = useCart()
  const navigate = useNavigate()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderBottom: '1px solid #eee',
      backgroundColor: '#fff'
    }}>
      <h1
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', margin: 0, fontSize: '20px' }}
      >
        🍔 Mini Restaurant
      </h1>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* Admin button removed — access via localhost:5173/admin directly */}
        <button onClick={() => navigate('/checkout')} style={{ fontSize: '16px' }}>
          🛒 Cart {totalItems > 0 && (
            <span style={{
              backgroundColor: 'red', color: 'white',
              borderRadius: '50%', padding: '2px 7px',
              fontSize: '12px', marginLeft: '4px'
            }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
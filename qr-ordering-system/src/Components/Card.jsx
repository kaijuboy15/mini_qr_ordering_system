import { useCart } from '../context/CartContext'
import BurgerImg from '../assets/Images/Burger.png'
import FriesImg from '../assets/Images/Fries.png'
import HotdogImg from '../assets/Images/Hotdog.png'
import IcedTeaImg from '../assets/Images/IcedTea.png'
import SodaImg from '../assets/Images/Soda.png'

const imageMap = {
  'Burger.png': BurgerImg,
  'Fries.png': FriesImg,
  'Hotdog.png': HotdogImg,
  'IcedTea.png': IcedTeaImg,
  'Soda.png': SodaImg,
}

function Card({ product }) {
  const { addToCart } = useCart()

  return (
        <div style={{
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',              // ADD THIS
    flexDirection: 'column',      // ADD THIS
    }}>
    <img
        src={imageMap[product.images]}
        alt={product.product_name}
        style={{ width: '100%', height: '140px', objectFit: 'contain' }}
    />
    <h3 style={{ margin: '10px 0 4px' }}>{product.product_name}</h3>
    <p style={{ fontSize: '13px', color: '#666', margin: '0 0 8px', minHeight: '60px' }}>
        {product.product_description}
    </p>
    <p style={{ fontWeight: 'bold', margin: '0 0 12px' }}>
        ₱{parseFloat(product.price).toFixed(2)}
    </p>
    <button
        onClick={() => addToCart(product)}
        style={{
        marginTop: 'auto',            // ADD THIS
        width: '100%',
        padding: '8px',
        backgroundColor: '#f97316',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
        }}
    >
        Add to Cart
    </button>
    </div>
  )
}

export default Card
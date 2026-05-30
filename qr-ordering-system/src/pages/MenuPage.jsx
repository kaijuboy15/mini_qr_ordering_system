import { useEffect, useState } from 'react'
import Card from '../Components/Card'

function MenuPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //fetch('http://localhost:3001/api/products')
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading menu...</p>

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Our Menu</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {products.map(product => (
          <Card key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default MenuPage
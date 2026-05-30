import { useEffect, useState } from 'react'

function AdminPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    //fetch('http://localhost:3001/api/orders')
    fetch(`/api/orders`)
      .then(r => r.json())
      .then(data => {
        const grouped = data.reduce((acc, row) => {
          if (!acc[row.order_id]) {
            acc[row.order_id] = {
              order_id: row.order_id,
              total_amount: row.total_amount,
              payment_status: row.payment_status,
              created_at: row.created_at,
              items: []
            }
          }
          acc[row.order_id].items.push({
            product_name: row.product_name,
            quantity: row.quantity,
            unit_price: row.unit_price
          })
          return acc
        }, {})
        setOrders(Object.values(grouped).reverse())
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = (order_id, status) => {
    //fetch(`http://localhost:3001/api/orders/${order_id}`, {
    fetch(`/api/orders/${order_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_status: status })
    })
      .then(r => r.json())
      .then(() => fetchOrders())
  }

  const getStatusStyle = (status) => {
    if (status === 'paid')   return { backgroundColor: '#dcfce7', color: '#16a34a' }
    if (status === 'failed') return { backgroundColor: '#fee2e2', color: '#dc2626' }
    return { backgroundColor: '#fef9c3', color: '#ca8a04' }
  }

  if (loading) return <p>Loading orders...</p>

  if (orders.length === 0) return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <div style={{ fontSize: '48px' }}>📋</div>
      <h2>No orders yet</h2>
    </div>
  )

  return (
    <div>

      {/* Admin-only header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid #eee',
        backgroundColor: '#fff',
        marginBottom: '24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>🧾 Admin Panel</h1>
        <span style={{ fontSize: '13px', color: '#888' }}>Mini Restaurant</span>
      </div>

      {/* Page content */}
      <div style={{ padding: '0 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
          <button onClick={fetchOrders} style={{
            padding: '8px 16px', backgroundColor: '#f97316',
            color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}>
            🔄 Refresh
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map(order => (
            <div key={order.order_id} style={{
              border: '1px solid #eee', borderRadius: '12px',
              padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>

              {/* Order header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    Order #{order.order_id}
                  </span>
                  <span style={{ fontSize: '12px', color: '#888', marginLeft: '12px' }}>
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>
                <span style={{
                  ...getStatusStyle(order.payment_status),
                  padding: '4px 12px', borderRadius: '20px',
                  fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize'
                }}>
                  {order.payment_status}
                </span>
              </div>

              {/* Order items */}
              <div style={{ marginBottom: '12px' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '14px', padding: '4px 0',
                    borderBottom: i < order.items.length - 1 ? '1px solid #f5f5f5' : 'none'
                  }}>
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>₱{(item.unit_price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Total + actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Total: ₱{parseFloat(order.total_amount).toFixed(2)}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => updateStatus(order.order_id, 'paid')}
                    disabled={order.payment_status === 'paid'}
                    style={{
                      padding: '6px 14px', borderRadius: '8px', border: 'none',
                      cursor: order.payment_status === 'paid' ? 'not-allowed' : 'pointer',
                      backgroundColor: order.payment_status === 'paid' ? '#ccc' : '#16a34a',
                      color: 'white', fontWeight: 'bold', fontSize: '13px'
                    }}
                  >
                    ✓ Mark Paid
                  </button>
                  <button
                    onClick={() => updateStatus(order.order_id, 'failed')}
                    disabled={order.payment_status === 'failed'}
                    style={{
                      padding: '6px 14px', borderRadius: '8px', border: 'none',
                      cursor: order.payment_status === 'failed' ? 'not-allowed' : 'pointer',
                      backgroundColor: order.payment_status === 'failed' ? '#ccc' : '#dc2626',
                      color: 'white', fontWeight: 'bold', fontSize: '13px'
                    }}
                  >
                    ✕ Mark Failed
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>  {/* end padding wrapper */}
    </div>  /* end outer wrapper */
  )
}

export default AdminPage
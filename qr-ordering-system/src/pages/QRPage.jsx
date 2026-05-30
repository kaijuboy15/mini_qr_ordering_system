import { QRCodeCanvas } from 'qrcode.react'

function QRPage() {
  //const orderingURL = 'http://localhost:5173/'
  const orderingURL = 'http://192.168.1.2:5173/'

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code')
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = 'mini-restaurant-qr.png'
    link.click()
  }

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h2 style={{ marginBottom: '8px' }}>Scan to Order</h2>
      <p style={{ color: '#888', marginBottom: '32px', fontSize: '14px' }}>
        Scan the QR code below to access the menu
      </p>

      <div style={{
        display: 'inline-block',
        padding: '24px',
        border: '1px solid #eee',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        marginBottom: '24px'
      }}>
        <QRCodeCanvas
          id="qr-code"
          value={orderingURL}
          size={220}
          bgColor="#ffffff"
          fgColor="#1a1a1a"
          level="H"
          includeMargin={true}
        />
        <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#aaa' }}>
          {orderingURL}
        </p>
      </div>

      <br />

      <button
        onClick={downloadQR}
        style={{
          padding: '12px 28px',
          backgroundColor: '#f97316',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '15px'
        }}
      >
        ⬇ Download QR Code
      </button>
    </div>
  )
}

export default QRPage
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import MenuPage from './pages/MenuPage'
import CheckoutPage from './pages/CheckoutPage'
import AdminPage from './pages/AdminPage'
import QRPage from './pages/QRPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin has no Layout (no customer header) */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/qr" element={<QRPage />} />

        {/* Customer pages use Layout (with header) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MenuPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="qr" element={<QRPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
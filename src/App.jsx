// アプリ全体のルーティング設定
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import PropertyListPage from './pages/PropertyListPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <PropertyListPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/properties" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Navbar from "./components/Navbar"
import { CartProvider } from "./context/cart"
import { GameProvider } from "./context/GameContext"
import { Toaster } from 'sonner';
import { GridLoader } from 'react-spinners';

const HomePage = lazy(() => import("./pages/HomePage"))
const GamePage = lazy(() => import("./pages/GamePage"))
const FilterPage = lazy(() => import("./pages/FilterPage"))
const CartPage = lazy(() => import("./pages/CartPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const AdminPage = lazy(() => import("./pages/Admin/AdminPage"))


function App() {
  return (
    <>
      <GameProvider>
        <CartProvider>
          <Navbar />
          <main className="h-screen w-full max-w-6xl mx-auto pt-28 px-8 lg:px-0">
            <Suspense fallback={<div className="w-full h-full grid place-content-center"><GridLoader color="#ff346d" size={50} /></div>}>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/games/:nombre" element={<GamePage />} />
                <Route path="/games/platforms/:plataforma" element={<FilterPage />} />
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </Suspense>
            <Toaster theme="light" position="top-right" />
          </main>
        </CartProvider>
      </GameProvider>
    </>
  )
}

export default App

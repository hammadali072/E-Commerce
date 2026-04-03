import { Routes, Route } from "react-router-dom"
import Header from "./components/header/header"
import HomePage from "./pages/home-page"
import Footer from "./components/footer/footer"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

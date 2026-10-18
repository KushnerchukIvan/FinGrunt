import { Routes, Route } from "react-router"
import Sidebar from "./components/layout/Sidebar"
import Analytics from "./pages/Analytics"
import Budgets from "./pages/Budgets"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Header from "./components/layout/Header"

function App() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/budgets" element={<Budgets />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
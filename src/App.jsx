import { Routes, Route } from "react-router"
import Sidebar from "./components/layout/Sidebar"
import Analytics from "./pages/Analytics"
import Budgets from "./pages/Budgets"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Header from "./components/layout/Header"

function App() {
  return (
    <div className="flex min-h-dvh w-full min-w-0 bg-slate-950 text-white">
      <Sidebar />

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <Header />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/budgets" element={<Budgets />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
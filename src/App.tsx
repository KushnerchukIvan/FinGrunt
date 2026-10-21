import { Route, Routes } from 'react-router'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Budgets from './pages/Budgets'
import Dashboard from './pages/Dashboard'
import Learn from './pages/Learn'
import LessonPage from './pages/LessonPage'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Tools from './pages/Tools'
import Transactions from './pages/Transactions'

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
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:id" element={<LessonPage />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App

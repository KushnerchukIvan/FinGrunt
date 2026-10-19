import { Routes, Route } from "react-router"
import Sidebar from "./components/layout/Sidebar"
import Analytics from "./pages/Analytics"
import Calendar from "./pages/Calendar"
import Dashboard from "./pages/Dashboard"
import ProjectDetails from "./pages/ProjectDetails"
import Projects from "./pages/Projects"
import Settings from "./pages/Settings"
import Tasks from "./pages/Tasks"
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
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
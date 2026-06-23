import Sidebar from "./components/sidebar"
import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Campaigns from "./pages/Campaigns"
import Analytics from "./pages/Analytics"
import Clients from "./pages/Clients"
import AIReplies from "./pages/AIReplies"
import BusinessSettings from "./pages/BusinessSettings"

function App() {

  return (

    <div className="min-h-screen bg-[#070B14] text-white flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-10">

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/campaigns"
            element={<Campaigns />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/clients"
            element={<Clients />}
          />

          <Route
            path="/ai-replies"
            element={<AIReplies />}
          />

          <Route
            path="/business-settings"
            element={<BusinessSettings />}
          />

        </Routes>

      </div>

    </div>

  )

}

export default App
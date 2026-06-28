import { Link, useLocation } from "react-router-dom"

function Sidebar() {

  const location = useLocation()

  const menuClass = (path) =>
    `block w-full p-4 rounded-xl font-semibold transition-all duration-300 ${
      location.pathname === path
        ? "bg-green-500 text-black"
        : "bg-zinc-900 text-white hover:bg-green-700"
    }`

  return (

    <div className="w-[260px] bg-[#0D1320] border-r border-zinc-800 p-6 relative">

      {/* Logo */}

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-black font-extrabold text-xl">
          WF
        </div>

        <div>

          <h1 className="text-2xl font-bold text-white">
            WhatsFlow AI
          </h1>

          <p className="text-xs text-zinc-400">
            WhatsApp CRM Platform
          </p>

        </div>

      </div>

      {/* Menu */}

      <div className="mt-10 space-y-3">

        <Link
          to="/"
          className={menuClass("/")}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/clients"
          className={menuClass("/clients")}
        >
          👥 Clients
        </Link>

        <Link
          to="/reminders"
          className={menuClass("/reminders")}
        >
          🔔 Reminder Center
        </Link>
        <Link
          to="/timeline"
          className={menuClass("/timeline")}
        >
          📜 Timeline
        </Link>


        <Link
          to="/campaigns"
          className={menuClass("/campaigns")}
        >
          📢 Campaigns
        </Link>

        <Link
          to="/analytics"
          className={menuClass("/analytics")}
        >
          📈 Analytics
        </Link>

        <Link
          to="/ai-replies"
          className={menuClass("/ai-replies")}
        >
          🤖 AI Replies
        </Link>

        <Link
          to="/business-settings"
          className={menuClass("/business-settings")}
        >
          ⚙️ Business Settings
        </Link>

      </div>

      {/* Footer */}

      <div className="absolute bottom-6 left-6 text-xs text-zinc-500">

        <p>WhatsFlow AI v1.1</p>

      </div>

    </div>

  )
}

export default Sidebar
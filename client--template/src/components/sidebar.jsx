import { Link, useLocation } from "react-router-dom"

function Sidebar() {

  const location = useLocation()

  return (

    <div className="w-[260px] bg-[#0D1320] border-r border-zinc-800 p-6">

      <h1 className="text-3xl font-bold text-green-400">
        WhatsFlow AI
      </h1>

      <div className="mt-10 space-y-4">

        <Link
          to="/"
          className={`block w-full p-4 rounded-xl font-bold ${
            location.pathname === "/"
              ? "bg-green-500 text-black"
              : "bg-zinc-900 text-white hover:bg-green-700 transition-all duration-300"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/campaigns"
          className={`block w-full p-4 rounded-xl ${
            location.pathname === "/campaigns"
              ? "bg-green-500 text-black"
              : "bg-zinc-900 text-white hover:bg-green-700 transition-all duration-300"
          }`}
        >
          Campaigns
        </Link>

        <Link
          to="/ai-replies"
          className={`block w-full p-4 rounded-xl ${
            location.pathname === "/ai-replies"
              ? "bg-green-500 text-black"
              : "bg-zinc-900 text-white hover:bg-green-700 transition-all duration-300"
          }`}
        >
          AI Replies
        </Link>

        <Link
          to="/analytics"
          className={`block w-full p-4 rounded-xl ${
            location.pathname === "/analytics"
              ? "bg-green-500 text-black"
              : "bg-zinc-900 text-white hover:bg-green-700 transition-all duration-300"
          }`}
        >
          Analytics
        </Link>

        <Link
          to="/clients"
          className={`block w-full p-4 rounded-xl ${
            location.pathname === "/clients"
              ? "bg-green-500 text-black"
              : "bg-zinc-900 text-white hover:bg-green-700 transition-all duration-300"
          }`}
        >
          Clients
        </Link>

        <Link
          to="/business-settings"
          className={`block w-full p-4 rounded-xl ${
            location.pathname === "/business-settings"
              ? "bg-green-500 text-black"
              : "bg-zinc-900 text-white hover:bg-green-700 transition-all duration-300"
          }`}
        >
          Business Settings ⚙️
        </Link>

      </div>

    </div>

  )
}

export default Sidebar
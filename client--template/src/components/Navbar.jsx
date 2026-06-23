function Navbar() {
  return (

    <div className="flex justify-between items-center bg-[#111827] p-5 rounded-2xl border border-zinc-800">

      <div>

        <h1 className="text-3xl font-bold">
          WhatsFlow AI 🚀
        </h1>

        <p className="text-zinc-400 text-sm mt-1">
          AI WhatsApp Automation Platform
        </p>

      </div>

      <div className="flex items-center gap-5">

        <button className="bg-zinc-900 px-5 py-3 rounded-xl">
          🔔
        </button>

        <div className="bg-green-500 text-black px-5 py-3 rounded-xl font-bold">
          Admin
        </div>

      </div>

    </div>

  )

}

export default Navbar
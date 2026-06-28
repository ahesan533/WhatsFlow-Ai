function Analytics() {

  return (

    <div>

      <h1 className="text-5xl font-bold">
        Analytics
      </h1>

      <p className="text-zinc-400 mt-2">
        WhatsApp business performance overview
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

        <div className="bg-[#121A2B] p-6 rounded-3xl border border-zinc-800">
          <h3 className="text-zinc-400">
            Total Messages
          </h3>

          <p className="text-4xl font-bold mt-3 text-green-400">
            0
          </p>
        </div>

        <div className="bg-[#121A2B] p-6 rounded-3xl border border-zinc-800">
          <h3 className="text-zinc-400">
            Total Contacts
          </h3>

          <p className="text-4xl font-bold mt-3 text-blue-400">
            0
          </p>
        </div>

        <div className="bg-[#121A2B] p-6 rounded-3xl border border-zinc-800">
          <h3 className="text-zinc-400">
            AI Replies Sent
          </h3>

          <p className="text-4xl font-bold mt-3 text-purple-400">
            0
          </p>
        </div>

        <div className="bg-[#121A2B] p-6 rounded-3xl border border-zinc-800">
          <h3 className="text-zinc-400">
            Campaigns Sent
          </h3>

          <p className="text-4xl font-bold mt-3 text-orange-400">
            0
          </p>
        </div>

      </div>

      <div className="bg-[#121A2B] mt-8 p-8 rounded-3xl border border-zinc-800">

        <h2 className="text-2xl font-bold mb-4">
          Analytics Summary
        </h2>

        <p className="text-zinc-400">
          Analytics data will appear here once messages,
          campaigns and AI replies are used.
        </p>

      </div>

    </div>

  )

}

export default Analytics
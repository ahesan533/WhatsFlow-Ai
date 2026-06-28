function Campaigns() {

  return (

    <div>

      <h1 className="text-5xl font-bold">
        Campaigns
      </h1>

      <p className="text-zinc-400 mt-2">
        Manage WhatsApp campaigns and performance
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-10">

        <div className="bg-[#121A2B] p-6 rounded-3xl border border-zinc-800">
          <h3 className="text-zinc-400">
            Total Campaigns
          </h3>

          <p className="text-4xl font-bold mt-3 text-green-400">
            0
          </p>
        </div>

        <div className="bg-[#121A2B] p-6 rounded-3xl border border-zinc-800">
          <h3 className="text-zinc-400">
            Scheduled
          </h3>

          <p className="text-4xl font-bold mt-3 text-yellow-400">
            0
          </p>
        </div>

        <div className="bg-[#121A2B] p-6 rounded-3xl border border-zinc-800">
          <h3 className="text-zinc-400">
            Completed
          </h3>

          <p className="text-4xl font-bold mt-3 text-blue-400">
            0
          </p>
        </div>

      </div>

      <div className="bg-[#121A2B] mt-8 p-8 rounded-3xl border border-zinc-800">

        <h2 className="text-2xl font-bold mb-4">
          Campaign Overview
        </h2>

        <div className="bg-[#0D1320] border border-zinc-800 rounded-2xl p-8 text-center">

          <h3 className="text-2xl font-bold">
            No Campaigns Found
          </h3>

          <p className="text-zinc-400 mt-3">
            Create your first campaign from the Bulk Campaign Manager.
          </p>

        </div>

      </div>

    </div>

  )

}

export default Campaigns
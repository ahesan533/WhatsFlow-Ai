function Analytics() {
  return (
    <div>

      <h1 className="text-5xl font-bold">
        Analytics 📊
      </h1>

      <p className="text-zinc-400 mt-2">
        WhatsApp business analytics overview
      </p>

      <div className="mt-10 bg-[#111827] p-8 rounded-2xl border border-zinc-800">

        <h2 className="text-3xl font-bold mb-6">
          Performance Overview
        </h2>

        <div className="space-y-6">

          <div>
            <div className="flex justify-between">
              <span>Messages Sent</span>
              <span>85%</span>
            </div>

            <div className="w-full h-4 bg-zinc-800 rounded-full mt-2">
              <div className="w-[85%] h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>AI Reply Rate</span>
              <span>72%</span>
            </div>

            <div className="w-full h-4 bg-zinc-800 rounded-full mt-2">
              <div className="w-[72%] h-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>Client Engagement</span>
              <span>91%</span>
            </div>

            <div className="w-full h-4 bg-zinc-800 rounded-full mt-2">
              <div className="w-[91%] h-4 bg-pink-500 rounded-full"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Analytics
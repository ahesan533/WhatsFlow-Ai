function CampaignBox() {
  return (

    <div className="bg-[#111827] border border-zinc-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold">
        Send WhatsApp Campaign
      </h2>

      <p className="text-zinc-400 mt-2">
        Send promotional messages instantly
      </p>

      <div className="mt-6">

        <input
          type="text"
          placeholder="Enter customer number"
          className="w-full bg-[#0B1220] border border-zinc-700 p-4 rounded-xl outline-none"
        />

        <textarea
          placeholder="Enter message..."
          className="w-full bg-[#0B1220] border border-zinc-700 p-4 rounded-xl outline-none mt-4 h-40"
        ></textarea>

        <button className="mt-6 bg-green-500 hover:scale-105 duration-300 text-black px-8 py-4 rounded-xl font-bold text-xl">
          Send Message 🚀
        </button>

      </div>

    </div>

  )
}

export default CampaignBox
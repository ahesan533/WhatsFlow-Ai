function Campaigns() {

  return (

    <div>

      <h1 className="text-5xl font-bold">
        Campaigns 📢
      </h1>

      <p className="text-zinc-400 mt-2">
        Manage all WhatsApp campaigns
      </p>

      <div className="bg-[#111827] mt-10 p-8 rounded-2xl border border-zinc-800">

        <h2 className="text-2xl font-bold">
          Active Campaigns
        </h2>

        <div className="mt-6 space-y-4">

          <div className="bg-black p-5 rounded-xl">
            Festival Offer Campaign
          </div>

          <div className="bg-black p-5 rounded-xl">
            Gym Membership Campaign
          </div>

          <div className="bg-black p-5 rounded-xl">
            Real Estate Leads Campaign
          </div>

        </div>

      </div>

    </div>

  )

}

export default Campaigns
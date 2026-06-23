import { useEffect, useState } from "react"

function StatsCards() {

  const [totalContacts, setTotalContacts] = useState(0)

  useEffect(() => {

    fetchContacts()

  }, [])

  const fetchContacts = async () => {

    try {

      const response = await fetch("http://127.0.0.1:5000/contacts")
      const data = await response.json()

      if (data.success) {
        setTotalContacts(data.contacts.length)
      }

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="grid grid-cols-4 gap-6 mt-10">

      <div className="bg-[#111827] p-6 rounded-2xl border border-zinc-800 hover:scale-105 transition-all duration-300">

        <h2 className="text-zinc-400">
          Total Clients
        </h2>

        <p className="text-5xl text-cyan-400 mt-4">
          {totalContacts}
        </p>

      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-zinc-800 hover:scale-105 transition-all duration-300">

        <h2 className="text-zinc-400">
          Messages Sent
        </h2>

        <p className="text-5xl text-pink-400 mt-4">
          0
        </p>

      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-zinc-800 hover:scale-105 transition-all duration-300">

        <h2 className="text-zinc-400">
          AI Replies
        </h2>

        <p className="text-5xl text-yellow-400 mt-4">
          0
        </p>

      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-zinc-800 hover:scale-105 transition-all duration-300">

        <h2 className="text-zinc-400">
          Active Campaigns
        </h2>

        <p className="text-5xl text-green-400 mt-4">
          1
        </p>

      </div>

    </div>

  )
}

export default StatsCards
import { useEffect, useState } from "react"

function Clients() {

  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState("")
  const [totalMessages, setTotalMessages] = useState(0)

  useEffect(() => {

    fetchContacts()

    const interval = setInterval(() => {
      fetchContacts()
    }, 10000)

    return () => clearInterval(interval)

  }, [])

  const fetchContacts = async () => {

    try {

      const response = await fetch("http://127.0.0.1:5000/contacts")
      const data = await response.json()

      if (data.success) {

        setContacts(data.contacts)

        const messages = data.contacts.reduce(
          (sum, contact) => sum + (contact.totalMessages || 0),
          0
        )

        setTotalMessages(messages)

      }

    } catch (error) {

      console.log(error)

    }

  }

  const filteredContacts = contacts.filter((contact) =>

    contact.phone
      ?.toLowerCase()
      .includes(search.toLowerCase())

  )

  return (

    <div>

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold">
            Clients 👥
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage all business clients
          </p>

        </div>

        <div className="bg-green-500 text-black px-5 py-3 rounded-2xl font-bold">
          Total Contacts: {contacts.length}
        </div>

      </div>

      {/* Analytics Cards */}

      <div className="grid grid-cols-4 gap-4 mt-8">

        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800">
          <h2 className="text-zinc-400">
            Total Contacts
          </h2>

          <p className="text-4xl text-cyan-400 font-bold mt-2">
            {contacts.length}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800">
          <h2 className="text-zinc-400">
            Total Messages
          </h2>

          <p className="text-4xl text-pink-400 font-bold mt-2">
            {totalMessages}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800">
          <h2 className="text-zinc-400">
            Active Leads
          </h2>

          <p className="text-4xl text-green-400 font-bold mt-2">
            {contacts.length}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800">
          <h2 className="text-zinc-400">
            Today's Leads
          </h2>

          <p className="text-4xl text-yellow-400 font-bold mt-2">
            {contacts.length}
          </p>
        </div>

      </div>

      <input
        type="text"
        placeholder="🔍 Search phone number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mt-8 p-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white outline-none"
      />

      <div className="mt-8 space-y-5">

        {filteredContacts.length === 0 ? (

          <div className="bg-[#111827] p-6 rounded-2xl border border-zinc-800">

            <h2 className="text-2xl font-bold">
              No Contacts Found
            </h2>

          </div>

        ) : (

          filteredContacts.map((contact, index) => (

            <div
              key={contact.id || index}
              className="bg-[#111827] p-6 rounded-2xl border border-zinc-800 hover:border-green-500 transition-all duration-300"
            >

              <h2 className="text-2xl font-bold text-white">
                {contact.name}
              </h2>

              <p className="text-cyan-400 mt-2 break-all">
                📱 {contact.phone}
              </p>

              <p className="text-zinc-400 mt-2 break-words">
                💬 {contact.lastMessage || "No message"}
              </p>

              <p className="text-green-400 mt-2">
                Messages: {contact.totalMessages || 0}
              </p>

              <p className="text-zinc-500 mt-2">
                🕒 Last Seen:
                {" "}
                {contact.lastSeen
                  ? new Date(contact.lastSeen).toLocaleString()
                  : "N/A"}
              </p>

              <p className="text-zinc-500 mt-2">
                📅 Added:
                {" "}
                {contact.createdAt
                  ? new Date(contact.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  )
}

export default Clients
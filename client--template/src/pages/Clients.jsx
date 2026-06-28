import { useEffect, useState } from "react"

function Clients() {

  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [totalMessages, setTotalMessages] = useState(0)
  const[editingNotes,setEditingNotes1]=useState({})

   const interestedLeads =
  contacts.filter(
    (c) => c.status === "Interested"
  ).length
  
  const customers =
    contacts.filter(
      (c) => c.status === "Customer"
    ).length

  const conversionRate =
    contacts.length > 0
      ? ((customers / contacts.length) * 100).toFixed(1)
      : 0

  useEffect(() => {

    fetchContacts()

  },[])
    

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
  const updateStatus = async (phone, status) => {

    try {

      await fetch(
        "http://127.0.0.1:5000/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone,
            status
          })
        }
      )

      fetchContacts()

    } catch (error) {

      console.log(error)

    }

  }
  const updateNote = async (
    phone,
    note,
    priority,
    reminderDate
  ) => {
    console.log(
      phone,
      note,
      priority,
      reminderDate
    )

    try {

      await fetch(
        "http://127.0.0.1:5000/update-note",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone,
            note,
            priority,
            reminderDate
          })
        }
      )

      fetchContacts()

    } catch (error) {

      console.log(error)

    }

  }
  const filteredContacts = contacts.filter((contact) => {

    const matchesSearch =
      contact.phone?.toLowerCase().includes(search.toLowerCase())

    if (!matchesSearch) return false

    if (activeFilter === "Hot")
      return contact.score === "Hot"

    if (activeFilter === "Warm")
      return contact.score === "Warm"

    if (activeFilter === "Cold")
      return contact.score === "Cold"

    if (activeFilter === "Interested")
      return contact.status === "Interested"

    if (activeFilter === "Customers")
      return contact.status === "Customer"

    return true

  })

  return (

    <div>

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold">
            Clients
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage all business clients
          </p>

        </div>


      </div>

      {/* Analytics Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">

        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800 min-h-[120px]">
          <h2 className="text-zinc-400">
            Total Contacts
          </h2>

          <p className="text-4xl text-cyan-400 font-bold mt-2">
            {contacts.length}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800 ">
          <h2 className="text-zinc-400">
            Conversion Rate
          </h2>

          <p className="text-4xl text-pink-400 font-bold mt-2">
            {conversionRate}%
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800">
          <h2 className="text-zinc-400">
            Interested Leads
          </h2>
          <p className="text-4xl text-green-400 font-bold mt-2">
            {interestedLeads}
          </p>
        </div>
        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800">
          <h2 className="text-zinc-400">
            Customers
          </h2>

          <p className="text-4xl text-yellow-400 font-bold mt-2">
            {customers}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-2xl border border-zinc-800">
          <h2 className="text-zinc-400">
            Total Messages
          </h2>

          <p className="text-4xl text-cyan-400 font-bold mt-2">
            {totalMessages}
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search clients by phone number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mt-8 p-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white outline-none"
      />
      <div className="flex flex-wrap gap-3 mt-4">

        <button
          onClick={() => setActiveFilter("All")}
          className="bg-zinc-800 px-4 py-2 rounded-xl"
        >
          All
        </button>

        <button
          onClick={() => setActiveFilter("Hot")}
          className="bg-red-500 text-black px-4 py-2 rounded-xl font-bold"
        >
          🔥 Hot
        </button>

        <button
          onClick={() => setActiveFilter("Warm")}
          className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold"
        >
          🟡 Warm
        </button>

        <button
          onClick={() => setActiveFilter("Cold")}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
        >
          ❄️ Cold
        </button>

        <button
          onClick={() => setActiveFilter("Interested")}
          className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold"
        >
          Interested
        </button>

        <button
          onClick={() => setActiveFilter("Customers")}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl font-bold"
        >
          Customers
        </button>

      </div>

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
              <p className="text-orange-400 mt-2">
                🔥 Score: {contact.score}
              </p>
              <div className="mt-3">
                <select
                  value={contact.status || "New Lead"}
                  onChange={(e) =>
                    updateStatus(
                      contact.phone,
                      e.target.value
                    )
                  }
                  className="bg-[#0f172a] border border-zinc-700 text-white p-2 rounded-xl"
                >
                  <option>New Lead</option>
                  <option>Interested</option>
                  <option>Follow Up</option>
                  <option>Customer</option>
                  <option>Lost</option>
                </select>
              </div>
              <textarea
                placeholder="Add Note..."
                value={contact.note || ""}
                
                onChange={(e) => {

                  setContacts(
                    contacts.map((c) => {

                      if (c.phone === contact.phone) {
                        return {
                          ...c,
                          note: e.target.value
                        }
                      }

                      return c

                    })
                  )

                }}
                className="w-full mt-3 p-3 rounded-xl bg-[#0f172a] border border-zinc-700 text-white"
              />
              <select
                value={contact.priority || "Normal"}
                onChange={(e) => {

                  setContacts(
                    contacts.map((c) => {

                      if (c.phone === contact.phone) {
                        return {
                          ...c,
                          priority: e.target.value
                        }
                      }

                      return c

                    })
                  )

                  console.log("NEW PRIORITY:", e.target.value)

                }}

                className="w-full mt-3 p-3 rounded-xl bg-[#0f172a] border border-zinc-700 text-white"
              >

                <option value="Low">
                  Low
                </option>

                <option value="Normal">
                  Normal
                </option>

                <option value="High">
                  High
                </option>

              </select>
              <input
                type="date"
                value={contact.reminderDate || ""}
                onChange={(e) => {

                  setContacts(
                    contacts.map((c) => {

                      if (c.phone === contact.phone) {
                        return {
                          ...c,
                          reminderDate: e.target.value
                        }
                      }

                      return c

                    })
                  )

                }}
                className="w-full mt-3 p-3 rounded-xl bg-[#0f172a] border border-zinc-700 text-white"
              />
              <button
                onClick={() => {

                  console.log(
                    "SAVING:",
                    contact.note,
                    contact.priority,
                    contact.reminderDate
                  )

                  updateNote(
                    contact.phone,
                    contact.note || "",
                    contact.priority || "Normal",
                    contact.reminderDate || ""
                  )

                }}
                className="mt-4 w-full bg-green-500 text-black p-3 rounded-xl font-bold hover:bg-green-400 transition-all"
              >
                Save Note
              </button>




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
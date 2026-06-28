import { useState, useEffect } from "react"
import StatsCards from "../components/StatsCards"
import BulkCampaign from "../components/BulkCampaign"
import WhatsAppConnect from "../components/WhatsAppConnect"

function Dashboard() {
  const [contacts, setContacts] = useState([])
  const [contactsLoading, setContactsLoading] = useState(true)


  const fetchContacts = async () => {

    try {

      const response = await fetch("http://127.0.0.1:5000/contacts")
      const data = await response.json()

      if (data.success) {
        setContacts(data.contacts)
      }

    } catch (error) {

      console.log(error)

    } finally {

      setContactsLoading(false)

    }

  }

  useEffect(() => {

    fetchContacts()

    const interval = setInterval(() => {
      fetchContacts()
    }, 5000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div className="min-h-screen bg-[#0D1320] text-white p-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-5xl font-black tracking-wide">
            🚀 WhatsFlow AI
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            AI WhatsApp Automation Dashboard
          </p>

        </div>

        <div className="flex items-center gap-4">



          <WhatsAppConnect />

        </div>

      </div>

      {/* STATS */}

      <div className="mb-8">
        <StatsCards />
      </div>

      {/* CRM SECTION */}

      <div className="bg-[#121A2B] rounded-3xl p-6 border border-zinc-800 mb-8">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold">
            CRM Contacts
          </h2>

          <div className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold">
            {contacts.length} Contacts
          </div>

        </div>

        {contactsLoading ? (

          <div className="text-center py-10 text-zinc-400">
            Loading Contacts...
          </div>
        ) : contacts.length === 0 ? (

          <div className="text-center py-10">

            <h3 className="text-2xl font-bold text-white">
              📭 No Contacts Yet
            </h3>

            <p className="text-zinc-400 mt-2">
              Connect WhatsApp to start collecting leads
            </p>

          </div>
        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {contacts.map((contact) => (

              <div
                key={contact.id}
                className="bg-[#0D1320] border border-zinc-800 rounded-2xl p-5 hover:border-green-500 transition-all"
              >

                <h3 className="font-bold text-lg mb-2">
                  {contact.name}
                </h3>

                <p className="text-green-400 mb-2">
                  📱 {contact.phone}
                </p>

                <p className="text-zinc-300 text-sm mb-2">
                  💬 {contact.lastMessage}
                </p>

                <p className="text-zinc-500 text-xs mb-2">
                  Total Messages: {contact.totalMessages}
                </p>

                <p className="text-zinc-500 text-xs">
                  Last Seen:
                  <br />
                  {new Date(contact.lastSeen).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* BULK CAMPAIGN */}

      <BulkCampaign />

    </div>

  )
}

export default Dashboard
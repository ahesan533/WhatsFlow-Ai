import { useEffect, useState } from "react"

function Reminders() {

  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchReminders()
  }, [])

  const fetchReminders = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/contacts"
      )

      const data = await response.json()

      if (data.success) {
        setContacts(data.contacts)
      }

    } catch (error) {

      console.log(error)

    }

  }
  const markDone = async (phone) => {

    await fetch(
      "http://127.0.0.1:5000/mark-reminder-done",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      }
    )

    fetchReminders()

  }


  const snoozeReminder = async (phone) => {

    await fetch(
      "http://127.0.0.1:5000/snooze-reminder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      }
    )

    fetchReminders()

  }
  const today = new Date().toISOString().split("T")[0]

  const todayReminders = contacts.filter(
    (c) => c.reminderDate === today
  )

  const upcomingReminders = contacts.filter(
    (c) =>
      c.reminderDate &&
      c.reminderDate > today
  )

  const overdueReminders = contacts.filter(
    (c) =>
      c.reminderDate &&
      c.reminderDate < today
  )

  const filteredToday = todayReminders.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search)
  )

  return (

    <div>

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold">
            Reminder Center
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage all client reminders
          </p>

        </div>

        <div className="bg-red-500 text-black px-5 py-3 rounded-2xl font-bold">
          Notifications: {todayReminders.length}
        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        <div className="bg-[#111827] p-6 rounded-3xl border border-zinc-800">

          <h2 className="text-green-400 text-xl font-bold">
            Today's Reminders
          </h2>

          <p className="text-5xl font-black mt-4">
            {todayReminders.length}
          </p>

        </div>

        <div className="bg-[#111827] p-6 rounded-3xl border border-zinc-800">

          <h2 className="text-blue-400 text-xl font-bold">
            Upcoming
          </h2>

          <p className="text-5xl font-black mt-4">
            {upcomingReminders.length}
          </p>

        </div>

        <div className="bg-[#111827] p-6 rounded-3xl border border-zinc-800">

          <h2 className="text-red-400 text-xl font-bold">
            Overdue
          </h2>

          <p className="text-5xl font-black mt-4">
            {overdueReminders.length}
          </p>

        </div>

      </div>

      <input
        type="text"
        placeholder="Search reminders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mt-8 p-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white outline-none"
      />

      <div className="mt-8 bg-[#111827] p-8 rounded-3xl border border-zinc-800">

        <h2 className="text-3xl font-bold">
          Today's Reminder List
        </h2>

        <div className="mt-6 space-y-4">

          {
            filteredToday.length === 0 ? (

              <div className="bg-[#0B1220] p-6 rounded-2xl text-zinc-400">
                No reminders for today
              </div>

            ) : (

              filteredToday.map((contact, index) => (

                <div
                  key={index}
                  className="bg-[#0B1220] p-5 rounded-2xl border border-zinc-700"
                >

                  <h3 className="text-xl font-bold">
                    {contact.name}
                  </h3>

                  <p className="text-cyan-400 mt-2">
                    {contact.phone}
                  </p>

                  <p className="text-zinc-400 mt-2">
                    {contact.note || "No note added"}
                  </p>

                  <p className="text-yellow-400 mt-2">
                    Priority: {contact.priority || "Normal"}
                  </p>

                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() => markDone(contact.phone)}
                      className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold"
                    >
                      ✅ Mark Done
                    </button>
                    <button
                      onClick={() => snoozeReminder(contact.phone)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
                    >
                      😴 Snooze +1 Day
                    </button>

                  </div>

                </div>

              ))

            )
          }

        </div>

      </div>

      <div className="mt-8 bg-[#111827] p-8 rounded-3xl border border-zinc-800">

        <h2 className="text-3xl font-bold">
          Calendar View
        </h2>

        <p className="text-zinc-400 mt-4">
          Coming in Phase 7.3
        </p>

      </div>

    </div>

  )

}

export default Reminders
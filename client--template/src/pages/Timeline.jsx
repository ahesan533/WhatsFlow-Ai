import { useEffect, useState } from "react"

function Timeline() {

  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchTimeline()
  }, [])

  const fetchTimeline = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/contacts"
      )

      const data = await response.json()

      if (data.success) {

        let allActivities = []

        data.contacts.forEach((contact) => {

          if (contact.timeline) {

            contact.timeline.forEach((item) => {

              allActivities.push({
                ...item,
                phone: contact.phone,
                name: contact.name
              })

            })

          }

        })

        allActivities.sort(
          (a, b) =>
            new Date(b.time) - new Date(a.time)
        )

        setActivities(allActivities)

      }

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div>

      <h1 className="text-5xl font-bold">
        Timeline
      </h1>

      <p className="text-zinc-400 mt-2">
        Track all client activities
      </p>

      <div className="mt-10 space-y-5">

        {
          activities.length === 0 ? (

            <div className="bg-[#111827] p-6 rounded-2xl border border-zinc-800">

              No activities found

            </div>

          ) : (

            activities.map((item, index) => (

              <div
                key={index}
                className="bg-[#111827] p-6 rounded-2xl border border-zinc-800"
              >

                <h2 className="text-green-400 font-bold">
                  {item.action}
                </h2>

                <p className="text-cyan-400 mt-2">
                  {item.name}
                </p>

                <p className="text-zinc-400">
                  {item.phone}
                </p>

                <p className="text-zinc-500 mt-2">
                  {new Date(item.time).toLocaleString()}
                </p>

              </div>

            ))

          )
        }

      </div>

    </div>

  )

}

export default Timeline
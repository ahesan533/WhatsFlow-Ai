import { useEffect, useState } from "react"

function BusinessSettings() {

  const [business, setBusiness] = useState({
    businessName: "",
    pricing: "",
    timing: "",
    owner: ""
  })

  useEffect(() => {
    fetchBusiness()
  }, [])

  const fetchBusiness = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/business"
      )

      const data = await response.json()

      if (data.success) {
        setBusiness(data.business)
      }

    } catch (error) {

      console.log(error)

    }

  }

  const saveBusiness = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/update-business",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(business)
        }
      )

      const data = await response.json()

      if (data.success) {
        alert("Business Saved Successfully")
      }

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div>

      <h1 className="text-5xl font-bold">
        Business Settings
      </h1>

      <p className="text-zinc-400 mt-2">
        Manage business details used by WhatsFlow AI replies and automation
      </p>

      <div className="mt-10 space-y-5 bg-[#121A2B] p-8 rounded-3xl border border-zinc-800">

        <input
          type="text"
          value={business.businessName || ""}
          onChange={(e) =>
            setBusiness({
              ...business,
              businessName: e.target.value
            })
          }
          placeholder="Business Name"
          className="w-full p-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white"
        />

        <input
          type="text"
          value={business.pricing || ""}
          onChange={(e) =>
            setBusiness({
              ...business,
              pricing: e.target.value
            })
          }
          placeholder="Pricing"
          className="w-full p-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white"
        />

        <input
          type="text"
          value={business.timing || ""}
          onChange={(e) =>
            setBusiness({
              ...business,
              timing: e.target.value
            })
          }
          placeholder="Business Timing"
          className="w-full p-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white"
        />

        <input
          type="text"
          value={business.owner || ""}
          onChange={(e) =>
            setBusiness({
              ...business,
              owner: e.target.value
            })
          }
          placeholder="Owner Name"
          className="w-full p-4 rounded-2xl bg-[#111827] border border-zinc-800 text-white"
        />

        <button
          onClick={saveBusiness}
          className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold hover:bg-green-400 transition-all"
        >
          Save Settings
        </button>

      </div>

    </div>

  )

}

export default BusinessSettings
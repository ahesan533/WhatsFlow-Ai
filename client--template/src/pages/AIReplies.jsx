import { useState } from "react"

function AIReplies() {

  const [keyword, setKeyword] = useState("")
  const [reply, setReply] = useState("")

  const [rules, setRules] = useState([
    {
      keyword: "price",
      reply: "Our pricing starts from ₹999/month"
    },
    {
      keyword: "timing",
      reply: "We are open from 9 AM to 8 PM"
    }
  ])

  const addRule = () => {

    if (!keyword || !reply) {
      alert("Please fill all fields")
      return
    }

    setRules([
      ...rules,
      {
        keyword,
        reply
      }
    ])

    setKeyword("")
    setReply("")
  }

  const deleteRule = (index) => {

    const updatedRules = rules.filter(
      (_, i) => i !== index
    )

    setRules(updatedRules)
  }

  return (

    <div className="text-white">

      <h1 className="text-5xl font-bold">
        AI Replies
      </h1>

      <p className="text-zinc-400 mt-2">
        Manage automatic keyword based replies
      </p>

      <div className="bg-[#121A2B] mt-8 p-6 rounded-3xl border border-zinc-800">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">
            Auto Reply Rules
          </h2>

          <div className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold">
            {rules.length} Rules
          </div>

        </div>

        <input
          type="text"
          placeholder="Keyword (example: price)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full bg-zinc-800 text-white p-4 rounded-2xl mb-4 outline-none"
        />

        <textarea
          placeholder="Reply message"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          className="w-full bg-zinc-800 text-white p-4 rounded-2xl mb-4 outline-none"
        />

        <button
          onClick={addRule}
          className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-2xl"
        >
          Add Rule
        </button>

      </div>

      <div className="bg-[#121A2B] mt-8 p-6 rounded-3xl border border-zinc-800">

        <h2 className="text-2xl font-bold mb-5">
          Active Rules
        </h2>

        {
          rules.length === 0 ? (

            <div className="text-zinc-400">
              No Rules Found
            </div>

          ) : (

            <div className="space-y-4">

              {rules.map((rule, index) => (

                <div
                  key={index}
                  className="bg-[#0D1320] p-5 rounded-2xl border border-zinc-700"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-green-400 font-bold text-lg">
                        {rule.keyword}
                      </h3>

                      <p className="text-zinc-300 mt-2">
                        {rule.reply}
                      </p>

                    </div>

                    <button
                      onClick={() => deleteRule(index)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )
        }

      </div>

    </div>

  )
}

export default AIReplies
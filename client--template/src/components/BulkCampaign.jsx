import { useState } from "react"

function BulkCampaign() {

    const [campaignName, setCampaignName] = useState("")
    const [numbers, setNumbers] = useState("")
    const [message, setMessage] = useState("")
    const [scheduledTime, setScheduledTime] = useState("")
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([])
    const [sentCount, setSentCount] = useState(0)
    const [failedCount, setFailedCount] = useState(0)
    const [progress, setProgress] = useState(0)
    const [totalNumbers, setTotalNumbers] = useState(0)
    const handleCSVUpload = (e) => {

        const file = e.target.files[0]

        if (!file) return

        const reader = new FileReader()

        reader.onload = (event) => {

            const text = event.target.result

            setNumbers(text)
        }

        reader.readAsText(file)
    }
    const sendBulkCampaignNow = async () => {

        setLoading(true)

        try {
const numberList = [
    ...new Set(
        numbers
            .split("\n")
            .map((num) => num.trim())
            .filter((num) => num !== "")
    ),
]


            for (let number of numberList) {
                try {

                    await fetch("http://127.0.0.1:5000/send-message", {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                        },

                        body: JSON.stringify({
                            number,
                            message,
                        }),
                    })

                    setSentCount((prev) => prev + 1)
                    setProgress((prev) => prev + 1)
                }

                catch {

                    setFailedCount((prev) => prev + 1)
                    setProgress((prev) => prev + 1)
                }
            }
            setHistory((prev) => [

                {
                    campaign: campaignName,
                    numbers: numberList.length,
                    message,
                    time: new Date().toLocaleString(),
                },

                ...prev,
            ])

            alert("🚀 Bulk Campaign Sent Successfully")

            setCampaignName("")
            setNumbers("")
            setMessage("")
            setScheduledTime("")

        }

        catch (error) {

            console.log(error)
            alert("❌ Failed To Send Campaign")

        }

        finally {

            setLoading(false)

        }
    }
   const sendBulkCampaign = async () => {

    if (!campaignName || !numbers || !message) {
        alert("⚠ Please fill all fields")
        return
    }

    if (scheduledTime) {

        const selectedTime = new Date(scheduledTime).getTime()
        const currentTime = new Date().getTime()

        const delay = selectedTime - currentTime

        if (delay <= 0) {
            alert("⚠ Please select a future time")
            return
        }

        setTimeout(() => {
            sendBulkCampaignNow()
        }, delay)

        alert("⏰ Campaign Scheduled!")
        return
    }

    await sendBulkCampaignNow()
}
    return (

        <div className="bg-zinc-900 p-6 rounded-3xl mt-8 border border-zinc-800 shadow-2xl">

            <h1 className="text-4xl font-bold text-white">
                Bulk WhatsApp Campaign 🚀
            </h1>

            <p className="text-zinc-400 mt-2">
                Send messages to multiple users instantly
            </p>

            <input
                type="text"
                placeholder="Campaign Name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full mt-6 p-4 rounded-2xl bg-zinc-800 text-white outline-none"
            />
            <input
                type="file"
                accept=".csv,.txt"
                onChange={handleCSVUpload}
                className="w-full mt-4 p-4 rounded-2xl bg-zinc-800 text-white"
            />

            <textarea
                placeholder={`Paste numbers here...
919999999999
`}
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                rows={6}
                className="w-full mt-4 p-4 rounded-2xl bg-zinc-800 text-white outline-none"
            />

            <textarea
                placeholder="Write your campaign message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full mt-4 p-4 rounded-2xl bg-zinc-800 text-white outline-none"
            />
            <div className="mt-4">

                <label className="text-zinc-300 text-sm mb-2 block">
                    ⏰ Schedule Campaign
                </label>

                <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-zinc-800 text-white p-4 rounded-2xl border border-zinc-700 focus:outline-none focus:border-green-500"
                />

            </div>
            <button
                onClick={sendBulkCampaign}
                disabled={loading}
                className="mt-5 bg-green-400 hover:bg-green-500 transition-all text-black font-bold px-8 py-4 rounded-2xl"
            >
                {loading ? "Sending..." : "Send Bulk Campaign 🚀"}
            </button>

            <div className="mt-10">
                <div className="grid grid-cols-2 gap-4 mt-8">

                    <div className="bg-green-500 p-5 rounded-2xl">

                        <h2 className="text-black text-2xl font-bold">
                            ✅ Sent
                        </h2>

                        <p className="text-black text-4xl font-bold mt-2">
                            {sentCount}
                        </p>

                    </div>

                    <div className="bg-red-500 p-5 rounded-2xl">

                        <h2 className="text-white text-2xl font-bold">
                            ❌ Failed
                        </h2>

                        <p className="text-white text-4xl font-bold mt-2">
                            {failedCount}
                        </p>

                    </div>
                    <div className="mt-8">

                        <div className="flex justify-between text-white mb-2">

                            <span>
                                🚀 Campaign Progress
                            </span>

                            <span>
                                {progress} / {totalNumbers}
                            </span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-green-500 h-4 transition-all duration-500"
                                style={{
                                  width: `${totalNumbers === 0 ? 0 : (progress / totalNumbers) * 100}%`,  
                                }}
                            />
                        </div>

                    </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-5">
                    Campaign History 📜
                </h2>

                {
                    history.length === 0 ? (

                        <div className="bg-zinc-800 p-5 rounded-2xl text-zinc-400">
                            No campaigns sent yet
                        </div>

                    ) : (

                        <div className="space-y-4">

                            {
                                history.map((item, index) => (

                                    <div
                                        key={index}
                                        className="bg-zinc-800 p-5 rounded-2xl border border-zinc-700"
                                    >

                                        <h3 className="text-xl font-bold text-white">
                                            {item.campaign}
                                        </h3>

                                        <p className="text-zinc-400 mt-2">
                                            📱 Numbers: {item.numbers}
                                        </p>

                                        <p className="text-zinc-400 mt-2 break-words">
                                            💬 Message: {item.message}
                                        </p>

                                        <p className="text-green-400 mt-2 text-sm">
                                            ⏰ {item.time}
                                        </p>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default BulkCampaign
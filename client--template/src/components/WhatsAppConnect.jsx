import { useEffect, useState } from "react"


function WhatsAppConnect() {
    const [qrCode, setQrCode] = useState("")
    useEffect(() => {

        const fetchQR = () => {

            fetch("http://localhost:5000/get-qr")

                .then((res) => res.json())

                .then((data) => {

                    setQrCode(data.qr)

                })

        }

        fetchQR()

        const interval = setInterval(fetchQR, 3000)

        return () => clearInterval(interval)

    }, [])
    return (

        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800">

            <h1 className="text-2xl font-bold text-white">
                WhatsApp Connection 🔗
            </h1>

            <p className="text-zinc-400 mt-2">
                Scan QR Code to connect WhatsApp
            </p>

            <div className="bg-white w-40 h-40 rounded-2xl mt-6 flex items-center justify-center">

                {qrCode ? (

                    <img
                        src={qrCode}
                        alt="QR Code"
                        className="w-full h-full object-cover rounded-2xl"
                    />

                ) : (

                    <p className="text-black font-bold">
                        Loading QR...
                    </p>

                )}

            </div>

            <div className="mt-6 flex items-center gap-3">

                <div className="w-3 h-3 bg-red-500 rounded-full"></div>

                <p className="text-red-400 font-semibold">
                    Disconnected
                </p>

            </div>

            <button className="mt-6 bg-green-500 hover:bg-green-600 transition-all text-black font-bold px-6 py-3 rounded-2xl">

                Reconnect WhatsApp

            </button>

        </div>
    )
}

export default WhatsAppConnect
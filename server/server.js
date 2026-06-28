const express = require("express")
const cors = require("cors")
const { Client, LocalAuth } = require("whatsapp-web.js")
const QRCode = require("qrcode")
const fs = require("fs")

const app = express()

app.use(cors())
app.use(express.json())

// =========================
// CRM FILE
// =========================

const CONTACTS_FILE = "contacts.json"

const FOLLOWUPS_FILE = "followups.json"
if (!fs.existsSync(FOLLOWUPS_FILE)) {
  fs.writeFileSync(FOLLOWUPS_FILE, JSON.stringify([]))
}

function getFollowUps() {
  return JSON.parse(fs.readFileSync(FOLLOWUPS_FILE))
}

function saveFollowUps(data) {
  fs.writeFileSync(FOLLOWUPS_FILE, JSON.stringify(data, null, 2))
}

if (!fs.existsSync(FOLLOWUPS_FILE)) {
  fs.writeFileSync(FOLLOWUPS_FILE, JSON.stringify([]))
}

function getContacts() {
  return JSON.parse(fs.readFileSync(CONTACTS_FILE))
}

function saveContacts(data) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2))
}

const BUSINESS_FILE = "business.json"

function getBusiness() {
  return JSON.parse(fs.readFileSync(BUSINESS_FILE))
}

// =========================
// WHATSAPP CLIENT
// =========================

const client = new Client({
  authStrategy: new LocalAuth(),

  puppeteer: {
    headless: false,
    args: ["--no-sandbox"]
  }
})

client.on("qr", (qr) => {

  console.log("NEW QR GENERATED 🚀")

  QRCode.toDataURL(qr, (err, url) => {
    global.qrCode = url
  })

})

client.on("ready", () => {

  console.log("WhatsApp Connected 🚀")

})

// =========================
// MESSAGE EVENT
// =========================

client.on("message", async (message) => {
  if (message.fromMe) {
    return
  }

  try {

    console.log("Message received:", message.body)


    if (!message.fromMe) {

      // =========================
      // CRM AUTO SAVE
      // =========================

      const contacts = getContacts()

      const phoneNumber = message.from
      if (
        phoneNumber.includes("status@broadcast") ||
        phoneNumber.includes("@g.us")
      ) {
        return
      }

      const existingContact = contacts.find(
        (contact) => contact.phone === phoneNumber
      )

      if (existingContact) {

        existingContact.lastMessage = message.body
        existingContact.lastSeen = new Date().toISOString()
        existingContact.totalMessages += 1

      } else {

        contacts.push({
          id: Date.now(),
          phone: message.from,
          name: phoneNumber,
          lastMessage: message.body,
          totalMessages: 1,
          status: "New Lead",
          timeline: [
            {
              action: "Lead Created",
              time: new Date().toISOString()
            }
          ],
          note: "",
          priority: "Normal",
          reminderDate: "",
          createdAt: new Date().toISOString(),
          lastSeen: new Date().toISOString()

        })

      }

      saveContacts(contacts)
      const followUps = getFollowUps()
      const alreadyExists = followUps.find(
        (item) => item.phone === message.from && item.sent === false
      )
      console.log("MESSAGE FROM:", message.from)
      console.log("PHONE NUMBER:", phoneNumber)
      console.log("ALREADY EXISTS:", alreadyExists)

      if (!alreadyExists) {
        followUps.push({
          phone: message.from,
          createdAt: Date.now(),
          sent: false
        })
      }

      saveFollowUps(followUps)

      console.log("FOLLOWUP SAVED")



      const text = message.body.toLowerCase()
      const business = getBusiness()

      if (
        !text.includes("hi") &&
        !text.includes("hello") &&
        !text.includes("price") &&
        !text.includes("timing") &&
        !text.includes("owner")
      ) {
        return
      }

      if (text.includes("hi") || text.includes("hello")) {

        await client.sendMessage(
          message.from,
          "👋 Hello! Welcome to WhatsFlow AI 😈🔥"
        )

      }
      else if (text.includes("price")) {

        await client.sendMessage(
          message.from,
          `💰 ${business.pricing}`
        )

      }


      else if (text.includes("timing")) {

        await client.sendMessage(
          message.from,
          "⏰ Business timing: 9AM to 8PM 😈"
        )

      }

      else if (text.includes("owner")) {

        await client.sendMessage(
          message.from,
          "📞 Contact Owner: 9876543210"
        )

      }

    }

  } catch (error) {

    console.log(error)

  }

})

client.initialize()
setInterval(async () => {

  try {

    const followUps = getFollowUps()

    for (const item of followUps) {

      if (item.sent) continue

      const minutesPassed =
        (Date.now() - item.createdAt) / (1000 * 60)

      // Testing ke liye 1 minute
      if (minutesPassed >= 1) {

        console.log("Sending Followup To:", item.phone)
        await client.sendMessage(
          item.phone,
          "👋 Just following up. Let us know if you need any help."
        )

        item.sent = true

      }

    }

    saveFollowUps(followUps)

  } catch (error) {

    console.log("Follow Up Error:", error)

  }

}, 30000)


app.get("/", (req, res) => {
  res.send("WhatsFlow AI Backend Running 🚀")
})

// SEND MESSAGE

app.post("/send-message", async (req, res) => {

  const { number, message } = req.body

  try {

    const chatId = `${number}@c.us`

    console.log("Sending to:", chatId)

    await client.sendMessage(chatId, message)

    res.json({
      success: true,
      message: "Message sent successfully 🚀"
    })

  } catch (error) {

    console.log(error)

    res.json({
      success: false,
      error: error.message
    })

  }

})

// QR

app.get("/get-qr", (req, res) => {

  res.json({
    qr: global.qrCode || null,
  })

})

// =========================
// CRM CONTACTS API
// =========================

app.get("/contacts", (req, res) => {

  try {

    const contacts = getContacts()
    const scoredContacts = contacts.map((contact) => {

  let score = "Cold"

  if ((contact.totalMessages || 0) >= 20) {
    score = "Hot"
  }
  else if ((contact.totalMessages || 0) >= 5) {
    score = "Warm"
  }

  return {
    ...contact,
    score
  }

})

    res.json({
      success: true,
      contacts:scoredContacts
    })

  } catch (error) {

    res.json({
      success: false,
      error: error.message
    })

  }

})
app.post("/update-status", (req, res) => {

  try {

    const { phone, status } = req.body

    const contacts = getContacts()

    const updatedContacts = contacts.map((contact) => {

      if (contact.phone === phone) {

        return {
          ...contact,
          status,

          timeline: [
            ...(contact.timeline || []),

            {
              action: `Status Changed To ${status}`,
              time: new Date().toISOString()
            }
          ]
        }

      }

      return contact

    })

    saveContacts(updatedContacts)

    res.json({
      success: true
    })

  } catch (error) {

    res.json({
      success: false,
      error: error.message
    })

  }

})
app.post("/update-note", (req, res) => {
console.log("UPDATE NOTE BODY:",req.body)
  try {

    const {
      phone,
      note,
      priority,
      reminderDate
    } = req.body

    const contacts = getContacts()

    const updatedContacts = contacts.map((contact) => {

      if (contact.phone === phone) {

        return {
          ...contact,
          note,
          priority,
          reminderDate,

          timeline: [
            ...(contact.timeline || []),

            {
              action: "Note Added",
              time: new Date().toISOString()
            }
          ]
        }
      }

      return contact

    })

    saveContacts(updatedContacts)

    res.json({
      success: true
    })

  } catch (error) {

    res.json({
      success: false,
      error: error.message
    })

  }

})
app.get("/business", (req, res) => {

  try {

    const data = JSON.parse(
      fs.readFileSync("business.json")
    )

    res.json({
      success: true,
      business: data
    })

  } catch (error) {

    res.json({
      success: false,
      error: error.message
    })

  }

})
app.post("/update-business", (req, res) => {

  try {

    fs.writeFileSync(
      "business.json",
      JSON.stringify(req.body, null, 2)
    )

    res.json({
      success: true
    })

  } catch (error) {

    res.json({
      success: false,
      error: error.message
    })

  }

})
app.post("/mark-reminder-done", (req, res) => {

  const { phone } = req.body

  const contacts = getContacts()

  const updated = contacts.map(contact => {

    if (contact.phone === phone) {

      return {
        ...contact,
        reminderDate: "",

        timeline: [
          ...(contact.timeline || []),
          {
            action: "Reminder Completed",
            time: new Date().toISOString()
          }
        ]
      }

    }

    return contact

  })

  saveContacts(updated)

  res.json({ success: true })

})


app.post("/snooze-reminder", (req, res) => {

  const { phone } = req.body

  const contacts = getContacts()

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const date =
    tomorrow.toISOString().split("T")[0]

  const updated = contacts.map(contact => {

    if (contact.phone === phone) {

      return {
        ...contact,
        reminderDate: date,

        timeline: [
          ...(contact.timeline || []),
          {
            action: "Reminder Snoozed",
            time: new Date().toISOString()
          }
        ]
      }

    }

    return contact

  })

  saveContacts(updated)

  res.json({ success: true })

})

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀")
})
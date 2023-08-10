import express from 'express'
import cors from 'cors'
import webPush from 'web-push'

const VAPID_PUBLIC_KEY =
  'BE9rlIeR9FOs8UN9DPMjJEKDRCkSrKNOFicTZLznY2U_VdPO2iEmZXn8azTOvFAEK-akMI2RoR5v-8uGB1U5xxs'
const VAPID_PRIVATE_KEY = 'mtWWQTXAjjnO_iiOT7Rui4WoEKN7UU3yVKaBbZhpo8I'

// if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
//   console.log(
//     'You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY environment variables. You can use the following ones:'
//   )
//   console.log(webPush.generateVAPIDKeys())
// }
// Set the keys used for encrypting the push messages.
webPush.setVapidDetails('https://example.com/', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/vapid-key', (req, res) => res.json({ publicKey: VAPID_PUBLIC_KEY }))

app.post('/register', function (req, res) {
  // A real world application would store the subscription info.
  res.sendStatus(201)
})

app.post('/sendNotification', function (req, res) {
  const subscription = req.body.subscription
  const payload = req.body.payload
  const options = {
    TTL: req.body.ttl,
  }
  console.log({ subscription })
  setTimeout(function () {
    webPush
      .sendNotification(subscription, payload, options)
      .then(() => res.sendStatus(201))
      .catch(function (error) {
        console.log({ error })
        res.sendStatus(500)
      })
  }, req.body.delay * 1000)
  // res.sendStatus(201)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

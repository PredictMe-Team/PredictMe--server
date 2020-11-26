const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const router = require('./routes/index')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', router)


app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
})
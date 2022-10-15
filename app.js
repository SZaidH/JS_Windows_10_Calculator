const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log("/ - Response Sent!")
})

app.listen(PORT, () => console.log(`App running on port:${PORT}`))
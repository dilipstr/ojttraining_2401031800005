import express from 'express'
const app = express()

app.use(express.urlencoded({ extended: true }))

const data = []

app.post("/register", (req, res) => {
    if(!req.body['name']) res.end("Data is empty") 
    data.push(req.body)
    res.end("Data is pushed")
})

app.get("/users", (req, res) => res.json(data))

app.listen(3000, () => console.log("App is listening on port 3000"))
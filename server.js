const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 2033

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')))

app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'))
    let newNote = req.body
    newNote.id = notes.length
    notes.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
})

app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'))
    let ixnay = req.params.id
    notes = notes.filter(note => note.id != ixnay)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.listen(PORT)
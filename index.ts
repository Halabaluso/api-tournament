import express from "express"
import cors from "cors"
const app = express()
const port = process.env.PORT || 5000

app.use(cors())


//Models
import { Create } from "./models/create"
import { GetTournament, GetAllTournaments, GetTournamentData } from "./models/get"
import { UpdateTournametMatch, UpdateTournametSeedings, UpdateParticipant } from "./models/update"
import { DeleteStage } from "./models/delete"


import { JsonDatabase } from "brackets-json-db"
import { BracketsManager } from "brackets-manager"
const storage = new JsonDatabase();
const manager = new BracketsManager(storage);

app.get('/create', Create)
app.get('/gettournament', GetTournament)
app.get('/getalltournaments', GetAllTournaments)
app.get('/getbytournamentsid', GetTournamentData)
app.get('/updateseedings', UpdateTournametSeedings)
app.get('/updatematch', UpdateTournametMatch)
app.get('/updateparticipant', UpdateParticipant)
app.get('/updatestagename', UpdateParticipant)
app.get('/delete', DeleteStage)

app.get("/", (req, res) => {
    res.json({
        msg: "Im working."
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;

import { Router } from "express"
const app = Router()

import { JsonDatabase } from "brackets-json-db"
import { BracketsManager } from "brackets-manager"
import type { Id, Match, ParticipantResult } from "brackets-model"
var DotJson = require('dot-json')
import type { GeneralResponse } from "../interfaces/responses"
const storage = new JsonDatabase();
const manager = new BracketsManager(storage);

const UpdateTournametSeedings = app.get("/updateseedings", async (res, req) => {
    //http://localhost:5000/updateseedings?id=0&seeding=Mishuevos1,Mishuevos2,Mishuevos3,Mishuevos4,Mishuevos5,Mishuevos6,Mishuevos7,Mishuevos8
    try {
        const { id, seeding } = res.query
        const idDeff = parseInt(id as string) as Id
        const seedingDeff = (seeding as string).split(',')
        await manager.reset.seeding(idDeff)
        await manager.update.seeding(idDeff, seedingDeff)
        const response: GeneralResponse = {
            err: false,
            msg: "Torneo no update",
        }
        console.log("Torneo si update")
        req.json(response)
    } catch (error) {
        console.log("Error al recargar datos de torneo, falta de información")
        console.log(error)
        const response: GeneralResponse = {
            err: true,
            msg: "Torneo si update",
        }
        req.json(response)
    }
})

const UpdateTournametMatch = app.get("/updatematch", async (res, req) => {
    //http://localhost:5000/updatematch?id=3&win=1&score1=2&score2=1
    try {
        const { id, score1, score2, win } = res.query
        const idDeff = parseInt(id as string) as Id
        const score1Deff = parseInt(score1 as string) 
        const score2Deff = parseInt(score2 as string) 
        const participant1:ParticipantResult = {
            id:null,
            score: score1Deff
        }
        const participant2:ParticipantResult = {
            id:null,
            score: score2Deff
        }
        if(win === "1"){
            participant1.result = "win"
        }
        if(win === "2"){
            participant2.result = "loss"
        }
        const object:any = {
            id: idDeff,
            opponent1: participant1,
            opponent2: participant2
        }
        await manager.update.match(object)
        const response: GeneralResponse = {
            err: false,
            msg: "Torneo si update",
        }
        req.json(response)
    } catch (error) {
        console.log("Error al recargar datos de torneo, falta de información o match no encontrado")
        const response: GeneralResponse = {
            err: true,
            msg: "Torneo no update",
        }
        req.json(response)
    }
})

const UpdateParticipant = app.get("/updateparticipant", async (res, req) => {
    try {
        const { id, name } = res.query
        let myfile = new DotJson('./db.json');
        await myfile.set(`participant.${id}.name`, `${name}`).save()
        const response: GeneralResponse = {
            err: false,
            msg: "Nombre cambiado",
        }
        req.json(response)
    } catch (error) {
        const response: GeneralResponse = {
            err: true,
            msg: "Nombre no cambiado",
        }
        req.json(response)
    }
})

const UpdateStageName = app.get("/updatestagename", async (res, req) => {
    try {
        const { id, name } = res.query
        const idDeff = parseInt(id as string)
        let myfile = new DotJson('./db.json');
        const arrayFile = myfile.get("stage")
        arrayFile.forEach(async (element:any, i:number) => {
            if(element.id === idDeff){
                await myfile.set(`stage.${i}.name`, `${name}`).save()
            }
        })
        const response: GeneralResponse = {
            err: false,
            msg: "Nombre cambiado",
        }
        req.json(response)
    } catch (error) {
        const response: GeneralResponse = {
            err: true,
            msg: "Nombre no cambiado",
        }
        req.json(response)
    }
})

export {
    UpdateTournametSeedings,
    UpdateTournametMatch,
    UpdateParticipant,
    UpdateStageName  
}
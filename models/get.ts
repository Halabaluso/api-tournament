import { Router } from "express"
const app = Router()

import { JsonDatabase } from "brackets-json-db"
import { BracketsManager } from "brackets-manager"
import fs from "fs"
import type { Id } from "brackets-model"
import type { GeneralResponse } from "../interfaces/responses"
const path = "./db.json"
const storage = new JsonDatabase();
const manager = new BracketsManager(storage);

const GetTournament = app.get("/gettournament", async (res, req) => {
    try {
        const { id } = res.query
        const idDeff = parseInt(id as string) as Id
        const response: GeneralResponse = {
            err: false,
            msg: "Datos de torneo objetidos",
        }
        await manager.get.tournamentData(idDeff)
            .then(data => {
                response.servermsg = data as any
            })
        req.json(response)
    } catch (error) {
        console.log("Error al obtener torneo, falta de información")
        const response: GeneralResponse = {
            err: true,
            msg: "Error al obtener datos",
        }
        req.json(response)
    }
})

const GetAllTournaments = app.get("/getalltournaments", async (res, req) => {
    try {
        fs.readFile(path, 'utf8', async (err, data) => {
            const responsedb = await JSON.parse(data);
            const response: GeneralResponse = {
                err: false,
                msg: "Datos de torneo objetidos",
                servermsg: responsedb.stage
            }
            req.json(response)
        })
    } catch (error) {
        const response: GeneralResponse = {
            err: true,
            msg: "Datos de torneo no obtenidos",
        }
        req.json(response)
    }
})

const GetTournamentData = app.get("/getbytournamentsid", async (res, req) => {
    try {
        const { id } = res.query
        const idDeff = parseInt(id as string)
        fs.readFile(path, 'utf8', async (err, data) => {
            const responsedb = await JSON.parse(data);
            const arrayParticipants:Array<any> = []
            const participantsDeff: Array<any> = []
            let dataToSend:any = {
                participant: [],
                stage: [],
                group: [],
                round: [],
                match: [],
                match_game: [],
            };
            responsedb.stage.forEach((element:any) => {
                if(element.id === idDeff){
                    dataToSend.stage.push(element)
                }
            });
            responsedb.group.forEach((element:any) => {
                if(element.stage_id === idDeff){
                    dataToSend.group.push(element)
                }
            });
            responsedb.round.forEach((element:any) => {
                if(element.stage_id === idDeff){
                    dataToSend.round.push(element)
                }
            });
            responsedb.match.forEach((element:any) => {
                if(element.stage_id === idDeff){
                    dataToSend.match.push(element)
                }
                if(element.round_id === 0){
                    arrayParticipants.push(element.opponent1.id)
                    arrayParticipants.push(element.opponent2.id)
                }
                
            });
            responsedb.match_game.forEach((element:any) => {
                if(element.stage_id === idDeff){
                    dataToSend.match_game.push(element)
                }
            });
            
            arrayParticipants.forEach(element => {
                responsedb.participant.forEach((elemen1:any) => {
                    if(elemen1.id === element){
                        participantsDeff.push(elemen1)
                    }
                })
            })

            dataToSend.participant = participantsDeff
            console.log(dataToSend.participant)
            const response: GeneralResponse = {
                err: false,
                msg: "Datos de torneo obtenidos",
                servermsg: dataToSend
            }
            req.json(response)
        })
    } catch (error) {
        const response: GeneralResponse = {
            err: true,
            msg: "Datos de torneo no obtenidos",
        }
        req.json(response)
    }
})

const GetAllParticipants = app.get("/getallparticipants", async (res, req) => {
    try {
        fs.readFile(path, 'utf8', (err, data) => {
            const responsedb = JSON.parse(data);
            const response: GeneralResponse = {
                err: false,
                msg: "Datos de participantes objetidos",
                servermsg: responsedb.participant
            }
            req.json(response)
        })   
    } catch (error) {
        const response: GeneralResponse = {
            err: true,
            msg: "Datos de participantes no objetidos",
        }
        req.json(response)
    }
})



export {
    GetTournament,
    GetAllTournaments,
    GetAllParticipants,
    GetTournamentData
}
import { Router } from "express"
const app = Router()

import { JsonDatabase } from "brackets-json-db"
import { BracketsManager } from "brackets-manager"
import type { StageType, Seeding, GrandFinalType } from "brackets-model"
import type { GeneralResponse } from "../interfaces/responses"
const storage = new JsonDatabase();
const manager = new BracketsManager(storage);



const Create = app.get("/create", async (res, req) => {
    //http://localhost:5000/create?id=1&name=Torneo&type=single_elimination&seeding=Team1,Team2,Team3,Team4,Team5,Team6,Team7,Team8&grandfinal=simple&consolationfinal=true&divisions=1
    try {
        const { id, name, type, seeding, grandfinal, consolationfinal, divisions, index } = res.query
        const indexDeff = index as string
        const idnumber = parseInt(id as string)
        const nameDeff = name as string
        const typeDeff = type as StageType
        const seedingDeff = (seeding as string).split(',')
        const divisionDeff = parseInt(divisions as string)
        const grandFinalDeff = grandfinal as GrandFinalType
        const consolationFinalDeff = JSON.parse(consolationfinal as string) as boolean
        await manager.create.stage({
            tournamentId: idnumber,
            name: nameDeff,
            type: typeDeff,
            seeding: seedingDeff,
            settings: { grandFinal: grandFinalDeff, consolationFinal: consolationFinalDeff, groupCount: divisionDeff, index: indexDeff } as any,
        });
        const response: GeneralResponse = {
            err: false,
            msg: "Torneo creado",
        }
        req.json(response)
    } catch (error) {
        console.log("Error al crear torneo, falta de información")
        console.log(error)
        const response: GeneralResponse = {
            err: true,
            msg: "Torneo no creado",
        }
        req.json(response)
    }
})

export {
    Create
}
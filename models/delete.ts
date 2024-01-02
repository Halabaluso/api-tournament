import { Router } from "express"
const app = Router()

import { JsonDatabase } from "brackets-json-db"
import { BracketsManager } from "brackets-manager"
import type { StageType, Seeding, GrandFinalType } from "brackets-model"
import type { GeneralResponse } from "../interfaces/responses"
const storage = new JsonDatabase();
const manager = new BracketsManager(storage);

const DeleteStage = app.get("/delete", async (res, req) => {
    //http://localhost:5000/delete?id=1
    try {
        const { id } = res.query
        const idnumber = parseInt(id as string)
        await manager.delete.stage(idnumber)
        const response: GeneralResponse = {
            err: false,
            msg: "Stageborrado",
        }
        req.json(response)
    } catch (error) {
        console.log("Error al borrar torneo, falta de información")
        console.log(error)
        const response: GeneralResponse = {
            err: true,
            msg: "Torneo no borrado",
        }
        req.json(response)
    }
})

export {
    DeleteStage
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
const express_1 = require("express");
const app = (0, express_1.Router)();
const brackets_json_db_1 = require("brackets-json-db");
const brackets_manager_1 = require("brackets-manager");
const storage = new brackets_json_db_1.JsonDatabase();
const manager = new brackets_manager_1.BracketsManager(storage);
const Create = app.get("/create", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/create?id=1&name=Torneo&type=single_elimination&seeding=Team1,Team2,Team3,Team4,Team5,Team6,Team7,Team8&grandfinal=simple&consolationfinal=true&divisions=1
    try {
        const { id, name, type, seeding, grandfinal, consolationfinal, divisions, index } = res.query;
        const indexDeff = index;
        const idnumber = parseInt(id);
        const nameDeff = name;
        const typeDeff = type;
        const seedingDeff = seeding.split(',');
        const divisionDeff = parseInt(divisions);
        const grandFinalDeff = grandfinal;
        const consolationFinalDeff = JSON.parse(consolationfinal);
        yield manager.create.stage({
            tournamentId: idnumber,
            name: nameDeff,
            type: typeDeff,
            seeding: seedingDeff,
            settings: { grandFinal: grandFinalDeff, consolationFinal: consolationFinalDeff, groupCount: divisionDeff, index: indexDeff },
        });
        const response = {
            err: false,
            msg: "Torneo creado",
        };
        req.json(response);
    }
    catch (error) {
        console.log("Error al crear torneo, falta de información");
        console.log(error);
        const response = {
            err: true,
            msg: "Torneo no creado",
        };
        req.json(response);
    }
}));
exports.Create = Create;

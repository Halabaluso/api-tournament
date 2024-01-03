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
exports.UpdateStageName = exports.UpdateParticipant = exports.UpdateTournametMatch = exports.UpdateTournametSeedings = void 0;
const express_1 = require("express");
const app = (0, express_1.Router)();
const brackets_json_db_1 = require("brackets-json-db");
const brackets_manager_1 = require("brackets-manager");
var DotJson = require('dot-json');
const storage = new brackets_json_db_1.JsonDatabase();
const manager = new brackets_manager_1.BracketsManager(storage);
const UpdateTournametSeedings = app.get("/updateseedings", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/updateseedings?id=0&seeding=Mishuevos1,Mishuevos2,Mishuevos3,Mishuevos4,Mishuevos5,Mishuevos6,Mishuevos7,Mishuevos8
    try {
        const { id, seeding } = res.query;
        const idDeff = parseInt(id);
        const seedingDeff = seeding.split(',');
        yield manager.reset.seeding(idDeff);
        yield manager.update.seeding(idDeff, seedingDeff);
        const response = {
            err: false,
            msg: "Torneo no update",
        };
        console.log("Torneo si update");
        req.json(response);
    }
    catch (error) {
        console.log("Error al recargar datos de torneo, falta de información");
        console.log(error);
        const response = {
            err: true,
            msg: "Torneo si update",
        };
        req.json(response);
    }
}));
exports.UpdateTournametSeedings = UpdateTournametSeedings;
const UpdateTournametMatch = app.get("/updatematch", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/updatematch?id=3&win=1&score1=2&score2=1
    try {
        const { id, score1, score2, win } = res.query;
        const idDeff = parseInt(id);
        const score1Deff = parseInt(score1);
        const score2Deff = parseInt(score2);
        const participant1 = {
            id: null,
            score: score1Deff
        };
        const participant2 = {
            id: null,
            score: score2Deff
        };
        if (win === "1") {
            participant1.result = "win";
        }
        if (win === "2") {
            participant2.result = "loss";
        }
        const object = {
            id: idDeff,
            opponent1: participant1,
            opponent2: participant2
        };
        yield manager.update.match(object);
        const response = {
            err: false,
            msg: "Torneo si update",
        };
        req.json(response);
    }
    catch (error) {
        console.log("Error al recargar datos de torneo, falta de información o match no encontrado");
        const response = {
            err: true,
            msg: "Torneo no update",
        };
        req.json(response);
    }
}));
exports.UpdateTournametMatch = UpdateTournametMatch;
const UpdateParticipant = app.get("/updateparticipant", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name } = res.query;
        let myfile = new DotJson('./db.json');
        yield myfile.set(`participant.${id}.name`, `${name}`).save();
        const response = {
            err: false,
            msg: "Nombre cambiado",
        };
        req.json(response);
    }
    catch (error) {
        const response = {
            err: true,
            msg: "Nombre no cambiado",
        };
        req.json(response);
    }
}));
exports.UpdateParticipant = UpdateParticipant;
const UpdateStageName = app.get("/updatestagename", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name } = res.query;
        const idDeff = parseInt(id);
        let myfile = new DotJson('./db.json');
        const arrayFile = myfile.get("stage");
        arrayFile.forEach((element, i) => __awaiter(void 0, void 0, void 0, function* () {
            if (element.id === idDeff) {
                yield myfile.set(`stage.${i}.name`, `${name}`).save();
            }
        }));
        const response = {
            err: false,
            msg: "Nombre cambiado",
        };
        req.json(response);
    }
    catch (error) {
        const response = {
            err: true,
            msg: "Nombre no cambiado",
        };
        req.json(response);
    }
}));
exports.UpdateStageName = UpdateStageName;

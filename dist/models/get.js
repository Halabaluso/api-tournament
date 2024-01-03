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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTournamentData = exports.GetAllParticipants = exports.GetAllTournaments = exports.GetTournament = void 0;
const express_1 = require("express");
const app = (0, express_1.Router)();
const brackets_json_db_1 = require("brackets-json-db");
const brackets_manager_1 = require("brackets-manager");
const fs_1 = __importDefault(require("fs"));
const path = "./db.json";
const storage = new brackets_json_db_1.JsonDatabase();
const manager = new brackets_manager_1.BracketsManager(storage);
const GetTournament = app.get("/gettournament", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.query;
        const idDeff = parseInt(id);
        const response = {
            err: false,
            msg: "Datos de torneo objetidos",
        };
        yield manager.get.tournamentData(idDeff)
            .then(data => {
            response.servermsg = data;
        });
        req.json(response);
    }
    catch (error) {
        console.log("Error al obtener torneo, falta de información");
        const response = {
            err: true,
            msg: "Error al obtener datos",
        };
        req.json(response);
    }
}));
exports.GetTournament = GetTournament;
const GetAllTournaments = app.get("/getalltournaments", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fs_1.default.readFile(path, 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            const responsedb = yield JSON.parse(data);
            const response = {
                err: false,
                msg: "Datos de torneo objetidos",
                servermsg: responsedb.stage
            };
            req.json(response);
        }));
    }
    catch (error) {
        const response = {
            err: true,
            msg: "Datos de torneo no obtenidos",
        };
        req.json(response);
    }
}));
exports.GetAllTournaments = GetAllTournaments;
const GetTournamentData = app.get("/getbytournamentsid", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.query;
        const idDeff = parseInt(id);
        fs_1.default.readFile(path, 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            const responsedb = yield JSON.parse(data);
            const arrayParticipants = [];
            const participantsDeff = [];
            let dataToSend = {
                participant: [],
                stage: [],
                group: [],
                round: [],
                match: [],
                match_game: [],
            };
            responsedb.stage.forEach((element) => {
                if (element.id === idDeff) {
                    dataToSend.stage.push(element);
                }
            });
            responsedb.group.forEach((element) => {
                if (element.stage_id === idDeff) {
                    dataToSend.group.push(element);
                }
            });
            responsedb.round.forEach((element) => {
                if (element.stage_id === idDeff) {
                    dataToSend.round.push(element);
                }
            });
            responsedb.match.forEach((element) => {
                if (element.stage_id === idDeff) {
                    dataToSend.match.push(element);
                }
                if (element.round_id === 0) {
                    arrayParticipants.push(element.opponent1.id);
                    arrayParticipants.push(element.opponent2.id);
                }
            });
            responsedb.match_game.forEach((element) => {
                if (element.stage_id === idDeff) {
                    dataToSend.match_game.push(element);
                }
            });
            arrayParticipants.forEach(element => {
                responsedb.participant.forEach((elemen1) => {
                    if (elemen1.id === element) {
                        participantsDeff.push(elemen1);
                    }
                });
            });
            dataToSend.participant = participantsDeff;
            const response = {
                err: false,
                msg: "Datos de torneo obtenidos",
                servermsg: dataToSend
            };
            req.json(response);
        }));
    }
    catch (error) {
        const response = {
            err: true,
            msg: "Datos de torneo no obtenidos",
        };
        req.json(response);
    }
}));
exports.GetTournamentData = GetTournamentData;
const GetAllParticipants = app.get("/getallparticipants", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fs_1.default.readFile(path, 'utf8', (err, data) => {
            const responsedb = JSON.parse(data);
            const response = {
                err: false,
                msg: "Datos de participantes objetidos",
                servermsg: responsedb.participant
            };
            req.json(response);
        });
    }
    catch (error) {
        const response = {
            err: true,
            msg: "Datos de participantes no objetidos",
        };
        req.json(response);
    }
}));
exports.GetAllParticipants = GetAllParticipants;

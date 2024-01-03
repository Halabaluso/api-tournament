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
exports.DeleteStage = void 0;
const express_1 = require("express");
const app = (0, express_1.Router)();
const brackets_json_db_1 = require("brackets-json-db");
const brackets_manager_1 = require("brackets-manager");
const storage = new brackets_json_db_1.JsonDatabase();
const manager = new brackets_manager_1.BracketsManager(storage);
const DeleteStage = app.get("/delete", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    //http://localhost:5000/delete?id=1
    try {
        const { id } = res.query;
        const idnumber = parseInt(id);
        yield manager.delete.stage(idnumber);
        const response = {
            err: false,
            msg: "Stageborrado",
        };
        req.json(response);
    }
    catch (error) {
        console.log("Error al borrar torneo, falta de información");
        console.log(error);
        const response = {
            err: true,
            msg: "Torneo no borrado",
        };
        req.json(response);
    }
}));
exports.DeleteStage = DeleteStage;

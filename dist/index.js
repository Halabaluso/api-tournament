"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
//Models
const create_1 = require("./models/create");
const get_1 = require("./models/get");
const update_1 = require("./models/update");
const delete_1 = require("./models/delete");
const brackets_json_db_1 = require("brackets-json-db");
const brackets_manager_1 = require("brackets-manager");
const storage = new brackets_json_db_1.JsonDatabase();
const manager = new brackets_manager_1.BracketsManager(storage);
app.get('/create', create_1.Create);
app.get('/gettournament', get_1.GetTournament);
app.get('/getalltournaments', get_1.GetAllTournaments);
app.get('/getbytournamentsid', get_1.GetTournamentData);
app.get('/updateseedings', update_1.UpdateTournametSeedings);
app.get('/updatematch', update_1.UpdateTournametMatch);
app.get('/updateparticipant', update_1.UpdateParticipant);
app.get('/updatestagename', update_1.UpdateParticipant);
app.get('/delete', delete_1.DeleteStage);
app.get("/", (req, res) => {
    res.json({
        msg: "Im working."
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

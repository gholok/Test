"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("./dbConnection"));
require("./model/car");
require("./server");
dbConnection_1.default.sync({ force: true }).then(() => {
    console.log('Database synced');
}); /*.catch((error) => {
    console.log('Error syncing database:', error);
});*/

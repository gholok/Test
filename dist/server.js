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
const server_1 = require("@apollo/server"); //
const standalone_1 = require("@apollo/server/standalone");
const carResolvers_1 = require("./resolvers/carResolvers");
const carSchema_1 = require("./schema/carSchema");
const dbConnection_1 = __importDefault(require("./dbConnection"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const server = new server_1.ApolloServer({
        typeDefs: carSchema_1.typeDefs,
        resolvers: carResolvers_1.resolvers
    });
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)({
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (["http://localhost:3000"].indexOf(origin) === -1) {
                var msg = "The CORS policy for this site does not allow acces from the specified Origin";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
        allowedHeaders: "*",
        exposedHeaders: "*",
    }));
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        context: () => __awaiter(void 0, void 0, void 0, function* () { return ({ sequelize: dbConnection_1.default }); }),
        listen: { port: 4000 },
    });
    console.log(`Server ready at: ${url}`);
    try {
        yield dbConnection_1.default.authenticate();
        console.log('Connected to the postgress is ok');
    }
    catch (error) {
        console.error('Unable to connect to the database', error);
    }
});
startServer();
/*
server.listen().then(({ url }) => {
    console.log('server start')
});*/

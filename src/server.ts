import { ApolloServer } from '@apollo/server'; //
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers/carResolvers';
import { typeDefs } from './schema/carSchema';
import sequelize from './dbConnection';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import './model/car';
import './server';

const startServer= async () => {
    const app= express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    app.use(bodyParser.json());
    app.use(
        cors({
            origin: function (origin: string | undefined, callback: Function) {
                if (!origin) return callback(null, true);
                if (["http://localhost:3000"].indexOf(origin) === -1) {
                    var msg =
                        "The CORS policy for this site does not allow acces from the specified Origin";
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
            credentials: true,
            allowedHeaders: "*",
            exposedHeaders: "*",
        })
    );

    const {url} = await startStandaloneServer(server, {
        context: async () =>({sequelize}),
        listen: {port: 4000},
    });
    console.log (`Server ready at: ${url}`)
    try {
        await sequelize.authenticate();
        console.log('Connected to the postgress is ok');
    } catch(error){
        console.error('Unable to connect to the database', error);
    }
    sequelize.sync({ force: true }).then(() => {
        console.log('Database synced');
    }).catch((error) => {
        console.log('Error syncing database:', error);
    });
}
startServer();

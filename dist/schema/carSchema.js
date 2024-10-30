"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
type Car {
    id: Int!
    Mark: String!
    Model: String!
}
type Query {
    getCars:[Car]!
    getCar(id: Int!): Car
}
type Mutation {
    createCar(Model: String!, Mark: String!): Car!
    updateCar(id: Int!, Model: String!, Mark: String!): Car!
    deleteCar(id: Int!): Boolean!
}
`;
/*type Car {
    id: Int
    Mark: String
    Model: String
}
type Query {
    getCar(id: Int!): Car
}
type Mutation {
    createCar(Model: String!, Mark: String): Car
    updateUser(id: Int!, Model: String, Mark: String): Car
    deleteUser(id: Int!): Car
}*/
;

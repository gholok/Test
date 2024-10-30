import { gql } from 'apollo-server'
export const typeDefs = gql`
type Car {
    id: Int!
    id_Car: Int!
    Mark: String!
    Model: String!
}
type Query {
    getCars:[Car]!
    getCar(id: Int!): Car
}
type Mutation {
    createCar( id_Car: Int! Model: String!, Mark: String!): Car!
    updateCar( id_Car: Int!, Model: String!, Mark: String!): Car!
    deleteCar(id_Car: Int!): Boolean!
}
`;

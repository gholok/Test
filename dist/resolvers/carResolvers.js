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
exports.resolvers = void 0;
const car_1 = require("../model/car");
exports.resolvers = {
    Query: {
        getCars: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield car_1.Car.findAll();
        }),
        getCar: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const car = yield car_1.Car.findByPk(id);
            return car;
        }),
    },
    Mutation: {
        createCar: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const newcar = yield car_1.Car.create(args);
            return newcar;
        }),
        updateCar: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const car = yield car_1.Car.findByPk(args.id);
            yield car.update(args);
            return car;
        }),
        deleteCar: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const car = yield car_1.Car.findByPk(args.id);
            yield car.destroy();
            return true;
        })
    }
};
exports.default = exports.resolvers;
/*
import { Car } from '../model/car';
export const resolvers = {
    Query: {
        getCars: async () =>{
            return await Car.findAll();
        },
        getCar: async (_:any, {id}:{id: number} ) => {
            const car = await Car.findByPk(id);
            return car;
        }
    },
    Mutation: {
        createCar: async (_:any,{ Mark, Model } :{Mark: string; Model: string}) => {
            return await Car.create({ Mark, Model });
        },
        updateCar: async (_:any,{ id, Mark, Model }:{id: number; Mark: string; Model: string}) => {
            await Car.update({ Mark, Model }, { where: { id } });
            return await Car.findByPk(id);
        },
        deleteCar: async (_:any,{ id }:{id:number}) => {
            const car = await Car.findByPk(id);
            await Car.destroy({ where: { id } });
            return car;
        }
    }
};
export default resolvers;*/

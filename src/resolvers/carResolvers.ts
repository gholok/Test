import { Car } from '../model/car';
export const resolvers = {
    Query: {
        getCars: async () =>{
            return await Car.findAll();
        },
        getCar: async (_:any, {id}:{id: number} ) => {
            const car = await Car.findByPk(id);
            return car;
        },
    },
    Mutation: {
        createCar: async (_:any, args: any) => {
            const newcar = await Car.create(args);
            return newcar;
        },
        updateCar: async (_:any,args: any) => {
            const car = await Car.findByPk(args.id_Car);
            await car.update(args);
            return car;
        },
        deleteCar: async (_:any,args:{id_Car:number}) => {
            const car = await Car.findByPk(args.id_Car);
            await car.destroy();
            return true;
        }
    }
};
export default resolvers;



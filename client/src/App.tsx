import 'devextreme/dist/css/dx.light.css';
import React, { useState } from 'react';
import './App.css';
import {
    DataGrid, Column, Editing, Scrolling, Paging,
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { CarValues } from './types';
import _ from 'lodash';


type KeyValues = { key?: number, values?: any };

const GET_CARS = gql`
    query {
        getCars {
            id_Car
            Mark
            Model
        }
    }`;
const DELETE_CAR = gql`
    mutation deleteCar($id_Car: Int!) {
        deleteCar(id_Car: $id_Car)}
`;
const CREATE_CAR = gql`
    mutation createCar(
        $id_Car: Int!
        $Mark: String!
        $Model: String!
    ) {
        createCar(
            id_Car: $id_Car
            Mark: $Mark
            Model: $Model
        ){id}
    }
`;
const UPDATE_CAR = gql`
    mutation updateCar(
        $id_Car: Int!
        $Mark: String!
        $Model: String!
    ) {     updateCar(
        id_Car: $id_Car
        Mark: $Mark
        Model: $Model
    )   {id}
    }`;

export default function App () {
    const apolloClient = useApolloClient();
    const [CreateCar] = useMutation(CREATE_CAR);
    const [DeleteCar] = useMutation(DELETE_CAR);
    const [UpdateCar]=useMutation(UPDATE_CAR);
    const [carsData] = useState(new CustomStore<CarValues, any>({
        key: 'id_Car',
        load: () => sendRequest(`getCars`).then(data => _.cloneDeep(data)),
        insert: (values) => sendRequest(`InsertCar`, {
            values,
        }),
        update: (key, values) => sendRequest(`UpdateCar`, {
            key,
            values,
        }),
        remove: (key) => sendRequest(`DeleteCar`, {
            key,
        }),
    }));
    const sendRequest = (query: any, data: KeyValues = {}) => {
        switch (query) {
            case 'getCars':
                return apolloClient.query({query: GET_CARS}).then(response => response.data.getCars);
            case 'InsertCar':
                return CreateCar({variables: data.values}).then(res => res.data.CreateCar);
            case 'DeleteCar':
                return DeleteCar({variables: { id_Car: data.key }});
            case 'UpdateCar':
                return UpdateCar({variables: { id_Car: data.key, ...data.values }}).then(res => res.data.UpdateCar);
            default:
                return apolloClient.query({query: GET_CARS}).then(response => response.data.getCars);
        }

    }
    return (

        <React.Fragment>
            <DataGrid
                keyExpr="id_Car"
                showBorders={true}
                dataSource={carsData}
                allowColumnReordering={true}
            >
                <Paging enabled={true} />
                <Editing

                    mode="cell"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true}
                />
                <Scrolling
                    mode="virtual"
                />
                <Column dataField="id_Car" dataType="number" >
                </Column>
                <Column dataField="Mark" dataType="string">
                </Column>
                <Column dataField="Model" dataType="string">
                </Column>
            </DataGrid>
        </React.Fragment>

    );
}
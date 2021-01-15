import Vue from 'vue';
import Vuex from 'vuex';

const Sqlite = require("nativescript-sqlite");

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        vehicles: [{
                id: 1,
                name: "Ferrari",
                image: '~/assets/images/vehicles/00001.jpg',
                no_of_seats: 4,
                model: "Toyota",
                speed: "180 Km/hr",
                fuel: "1000cc",
                wheel_type: "4wd",
                type: "Automatic",
                desc: "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with"
            },
            {
                id: 2,
                name: "Audi",
                image: '~/assets/images/vehicles/00002.jpg',
                no_of_seats: 4,
                model: "Nissan",
                speed: "180 Km/hr",
                fuel: "1000cc",
                wheel_type: "4wd",
                type: "Automatic",
                desc: "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with"
            },
            {
                id: 3,
                name: "Premio",
                image: '~/assets/images/vehicles/00003.jpg',
                no_of_seats: 4,
                model: "Toyota",
                speed: "180 Km/hr",
                fuel: "1000cc",
                wheel_type: "4wd",
                type: "Automatic",
                desc: "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with"
            },
            {
                id: 4,
                name: "Bugati",
                image: '~/assets/images/vehicles/00004.jpg',
                no_of_seats: 4,
                model: "Nissan",
                speed: "180 Km/hr",
                fuel: "1000cc",
                wheel_type: "4wd",
                type: "Manual",
                desc: "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with"
            },
            {
                id: 5,
                name: "Demio",
                image: '~/assets/images/vehicles/00005.jpg',
                no_of_seats: 4,
                model: "Mazda",
                speed: "180 Km/hr",
                fuel: "1000cc",
                wheel_type: "4wd",
                type: "Automatic",
                desc: "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with"
            },
        ],
        database: null,
        selectedHireVehicles: []
    },
    mutations: {
        INIT_DATABASE(state, data) {
            state.database = data.database;
        },
        SAVE_VEHICLE_DATA(state, data) {
            state.data.push({
                name: data.data.name,
                image: data.data.image,
                no_of_seats: data.data.no_of_seats,
                model: data.data.model,
                speed: data.data.speed,
                fuel: data.data.fuel,
                wheel_type: data.data.wheel_type,
                type: data.data.type,
                desc: data.data.desc
            });
        },
        LOAD_VEHICLES(state, data) {
            state.vehicles = data.vehicles.data;
        },
        SET_SELECTED_HIRE_VEHICLE(state, vehicle_id) {
            // if (!state.selectedHireVehicles.includes(vehicle_id)) {
            state.selectedHireVehicles.push(vehicle_id);
            // }
        },
        LOAD_SELECTED_HIRE_VEHICLES(state, data) {
            state.selectedHireVehicles = data
        },
        REMOVE_SELECTED_HIRE_VEHICLE(state, vehicle_id) {
            state.selectedHireVehicles = state.selectedHireVehicles.filter(vehicle => vehicle_id !== vehicle_id)
        }
    },
    actions: {
        initialize_database(context) {
            (new Sqlite("car-hire.db")).then(db => {
                context.commit("INIT_DATABASE", { database: db });
            }, error => {
                console.log("OPEN DB ERROR", error);
            });
        },
        init_vehicles(context) {
            context.state.database.execSQL("CREATE TABLE IF NOT EXISTS vehicles (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, no_of_seats integer(10) NOT NULL, model VARCHAR(255) NOT NULL, speed VARCHAR(255) NOT NULL, fuel VARCHAR(255) NOT NULL, wheel_type VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, desc TEXT )").then(id => {}, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        },
        save_vehicle_data(context, data) {
            const vehicle_values = [data.name, data.image, data.no_of_seats, data.model, data.speed, data.fuel, data.wheel_type, data.type, data.desc];
            const vehicle_props = `name, image, no_of_seats, model, speed, fuel, wheel_type, type, desc`;
            context.state.database.execSQL(`INSERT INTO vehicles (${vehicle_props}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, vehicle_values).then(id => {
                context.commit("SAVE_VEHICLE_DATA", { data: data });
            }, error => {
                console.log("INSERT ERROR", error);
            });
        },
        load_vehicles(context) {
            context.state.database.resultType(Sqlite.RESULTSASOBJECT);
            context.state.database.all("SELECT name, image, no_of_seats, model, speed, fuel, wheel_type, type, desc FROM vehicles").then(result => {
                context.commit("LOAD_VEHICLES", { vehicles: result });
            }, error => {
                console.log("SELECT ERROR", error);
            });
        },
        load_selected_hire_vehicles(context) {
            context.state.database.resultType(Sqlite.RESULTSASOBJECT);
            context.state.database.all("SELECT * FROM selected_hire_vehicles").then(result => {
                context.commit('LOAD_SELECTED_HIRE_VEHICLES', result);
            }, error => {
                console.log("SELECT ERROR", error);
            });
        },
        insert_selected_hire_vehicle(context, vehicle_id) {
            context.state.database.execSQL("CREATE TABLE IF NOT EXISTS selected_hire_vehicles (id INTEGER PRIMARY KEY AUTOINCREMENT, vehicle_id INTEGER NOT NULL)").then(id => {
                const checkExists = context.state.selectedHireVehicles.some(vehicle => vehicle.vehicle_id === vehicle_id);
                if (checkExists === false) {
                    context.state.database.execSQL(`INSERT INTO selected_hire_vehicles (vehicle_id) VALUES (?)`, [vehicle_id]).then(ele => {
                        context.commit("SET_SELECTED_HIRE_VEHICLE", vehicle_id)
                    }, error => {
                        console.log("FAILED TO INSERT VEHICLE", error);
                    });
                }
            }, error => {
                console.log("CREATE TABLE selected_hire_vehicles ERROR", error)
            });
        },
        remove_selected_hire_vehicle(context, vehicle_id) {
            context.state.database.get("DELETE FROM selected_hire_vehicles WHERE vehicle_id=?", [vehicle_id]).then(id => {
                context.commit("REMOVE_SELECTED_HIRE_VEHICLE", vehicle_id);
            }, error => {
                console.log("FAILED TO DELETE VEHICLE", error)
            });
        },
    }
});
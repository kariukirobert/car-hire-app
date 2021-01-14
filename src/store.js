import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        vehicles: [{
                id: 1,
                name: "Ferrari",
                image: '~/assets/images/vehicles/00001.jpg',
                price: "120",
                no_of_sits: 4,
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
                price: "200",
                no_of_sits: 4,
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
                price: "300",
                no_of_sits: 4,
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
                price: "400",
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
                price: "500",
                no_of_sits: 4,
                model: "Mazda",
                speed: "180 Km/hr",
                fuel: "1000cc",
                wheel_type: "4wd",
                type: "Automatic",
                desc: "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with"
            },
        ]
    },
    mutations: {

    },
    actions: {

    }
});
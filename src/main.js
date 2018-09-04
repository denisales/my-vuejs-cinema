import Vue from 'vue';
import './style.scss';

import axios from 'axios'
import VueAxios from 'vue-axios'

import moment from 'moment-timezone'

import VueRouter from 'vue-router'

moment.tz.setDefault("UTC")

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

import {checkFilter, setDay} from './util/bus'
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get() {return this.$root.bus}})


import routes from './util/routes'

const router = new VueRouter({
    routes,
})

import Tooltip from './util/tooltip'

Vue.use(Tooltip)

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus

    },
    created() {
        this.$http.get('/api').then(response => {
            //console.log(response.data)
            this.movies = response.data
        })
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this))
    },
    router
});




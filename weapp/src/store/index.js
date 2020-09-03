import Vuex from '@wepy/x';
import Api from '../services/api';
import { wxLogin } from '../services/api/apiRequest';

export default new Vuex.Store({
	state: {
        counter: 0,
        userProfile:{}
	},
	mutations: {
		increment(state, data) {	 		
			state.counter++;
		},
		decrement(state) {
			state.counter--;
        },
	},
	actions: {
		increment({ commit }) {
			commit('increment');
		},
		decrement({ commit }) {
			commit('decrement');
		},
		incrementAsync({ commit }) {
			setTimeout(() => {
				commit('increment');
			}, 1000);
		},
	}
});

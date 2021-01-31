import { apiSend } from '../api/index';

export default {
  async FETCH_DATA({ commit }, data) {
    await apiSend(data).then((res)=>{
      commit('FETCH_DATA', res);
    });
    // return res;
  },
}
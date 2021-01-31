export default {
    FETCH_DATA(state, data) {
        state.data = data;
        state.LoadingStatus = false;
    },
    startSpinner(state){
        state.LoadingStatus = true;
    },
    endSpinner(state){
        state.LoadingStatus = false;
    }
};
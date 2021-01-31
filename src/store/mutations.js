export default {
    FETCH_DATA(state, data) {
        console.log("mutatuons's data ",data);
        state.data = data;
    },
};

// Action Creator

export const setLoginToken = (token) => {
    //Return an action
    return({
        type: 'SET_LOGIN_TOKEN',
        payload:token
    });
}

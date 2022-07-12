
// Action Creator

export const setLoginToken = (token) => {
    //Return an action
    return({
        type: 'SET_LOGIN_TOKEN',
        payload: token
    });
}

export const setWalletHandle = (walletHandle) => {
    //Return an action
    return({
        type: 'SET_WALLET_HANDLE',
        payload: walletHandle
    });
} 

export const setPoolHandle = (poolHandle) => {
    //Return an action
    return({
        type: 'SET_POOL_HANDLE',
        payload: poolHandle
    });
} 

export const setMasterSecret = (masterSecret) => {
    //Return an action
    return({
        type: 'SET_MASTER_SECRET',
        payload: masterSecret
    });
} 
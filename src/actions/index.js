
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

export const setProof = (proof) => {
    //Return an action
    return({
        type: 'SET_PROOF',
        payload: proof
    });
} 

export const setProofReq = (proofReq) => {
    //Return an action
    return({
        type: 'SET_PROOF_REQ',
        payload: proofReq
    });
} 

export const setSchemas = (schemas) => {
    //Return an action
    return({
        type: 'SET_SCHEMAS',
        payload: schemas
    });
} 

export const setCredDefs = (defs) => {
    //Return an action
    return({
        type: 'SET_DEFS',
        payload: defs
    });
} 

export const setVerifyId = (id) => {
    //Return an action
    return({
        type: 'SET_VERIFY_ID',
        payload: id
    });
} 
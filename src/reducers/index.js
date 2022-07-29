import { combineReducers } from "redux";


const loginTokenReducer = (currentToken = null, action) => {
    if(action.type === 'SET_LOGIN_TOKEN'){
        return action.payload;
    }
    return currentToken;
};

const walletHandleReducer = (currentWalletHandle = null, action) => {
  if(action.type === 'SET_WALLET_HANDLE'){
      return action.payload;
  }
  return currentWalletHandle;
};

const poolHandleReducer = (currentPoolHandle = null, action) => {
    if(action.type === 'SET_POOL_HANDLE'){
        return action.payload;
    }
    return currentPoolHandle;
};

const masterSecretReducer = (currentMasterSecret = null, action) => {
    if(action.type === 'SET_MASTER_SECRET'){
        return action.payload;
    }
    return currentMasterSecret;
};


const proofReqReducer = (proofReq = null, action) => {
    if(action.type === 'SET_PROOF_REQ'){
        return action.payload;
    }
    return proofReq;
};

const verifyIdReducer = (verifyId = null, action) => {
    if(action.type === 'SET_VERIFY_ID'){
        return action.payload;
    }
    return verifyId;
};

// use for test
const proofReducer = (proof = null, action) => {
    if(action.type === 'SET_PROOF'){
        return action.payload;
    }
    return proof;
};


const schemasReducer = (schemas = null, action) => {
    if(action.type === 'SET_SCHEMAS'){
        return action.payload;
    }
    return schemas;
};

const defsReducer = (defs = null, action) => {
    if(action.type === 'SET_DEFS'){
        return action.payload;
    }
    return defs;
};
// use for test



export default combineReducers({
    loginToken : loginTokenReducer,
    walletHandle: walletHandleReducer,
    poolHandle: poolHandleReducer,
    masterSecret: masterSecretReducer,
    proof : proofReducer,
    proofReq: proofReqReducer,
    schemas : schemasReducer,
    defs: defsReducer,
    verifyId: verifyIdReducer
    
});
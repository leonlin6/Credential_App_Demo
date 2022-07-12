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

export default combineReducers({
    loginToken : loginTokenReducer,
    walletHandle: walletHandleReducer,
    poolHandle: poolHandleReducer,
    masterSecret: masterSecretReducer
    
});
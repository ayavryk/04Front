import  {fDGet} from '../lib/';
import {MESSAGE} from './rMessage';
declare var appConfig: any;

// =============================================================================================  
// CONST 
// ============================================================================================= 
export const CLOADERROR = 'CLOADERROR';
export const CSET = 'CSET';


// =============================================================================================  
// INITIAL_STATE 
// ============================================================================================= 

interface IData {
  config: any;
  url: any;
}

const INITIAL_STATE: IData = {
  config: null,
  url:null,
};

// =============================================================================================  
// REDUSER 
// =============================================================================================  

export function config(state: IData = INITIAL_STATE, action) {
  switch (action.type) {
    case CSET:
      console.log(action.data);
      return action.data ? action.data : INITIAL_STATE;
    default:
      return state;
  }
}


// =============================================================================================  
// ACTIONS 
// =============================================================================================  

export function loadError() {
  return (dispatch) => dispatch ({
    type: MESSAGE,
    data: {message:'Ошибка загрузки конфигурации'}
  });
}
export function setConfig(data) {
  return (dispatch) => dispatch ({
    type: CSET,
    data
  });
}

export function loadConfig(params) {
  const url = appConfig.configPath.replace('{controller}',params.controller).replace('{method}',params.method);
  return fDGet(url, {
    params,
    success: setConfig,
    error: loadError
  });
}

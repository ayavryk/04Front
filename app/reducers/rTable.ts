import {clone} from '../lib';
import  {fDGet} from '../lib/';
import  {MESSAGE} from './rMessage';

// =============================================================================================  
// CONST 
// ============================================================================================= 
export const TLOADDATA = 'TLOADDATA';
export const TSET = 'TSET';
export const TEXEC = 'TEXEC';
export const TFILTER = 'TFILTER';
export const TGROUPCHECK = 'TGROUPCHECK';
export const TGROUPCHECKALL = 'TGROUPCHECKALL';



// =============================================================================================  
// INITIAL_STATE 
// ============================================================================================= 

interface IData {
  page: any;
  data: any;
  filter: any;
}

const INITIAL_STATE: IData = {
  data: null,
  filter: {
    query: ''
  },
  page: {
    total: 0,
    current: 0,
    visiblePage: 0
  }
};

// =============================================================================================  
// REDUSER 
// =============================================================================================  

export function table(state: IData = INITIAL_STATE, action) {
  let data;
  switch (action.type) {
    case TGROUPCHECKALL:
      data = clone(state);
      data.data.map((item) => {item._selected = action.value;});
      return data;
    case TGROUPCHECK:
      data = clone(state);
      data.data[action.index]._selected = action.value;
      return data;
    case TSET:
      console.log(action.data);
      data =  !action.data ? INITIAL_STATE : Object.assign(clone(state),action.data);
      return data;
    case TFILTER:
      data = clone(state);
      data.filter[action.field] = action.value;
      return data;
    case TLOADDATA:
      data = Object.assign(clone(state),...action.data); // config уже подгружен!!! INITIAL_STATE копировать нельзя
      return action.data;
    default:
      return state;
  }
}

// =============================================================================================  
// ACTIONS 
// =============================================================================================  

export function setData(data) {
  return (dispatch) => dispatch ({
    type: TSET,
    data
  });
}

function loadDataSucess(data) {
  if (data.message || data.command) {
    return (dispatch) => dispatch ({
      type: MESSAGE,
      data
    });
  }
  return (dispatch) => dispatch ({
    type: TLOADDATA,
    data
  });
}

export function loadError() {
  return (dispatch) => dispatch ({
    type: MESSAGE,
    data: {message:'Ошибка загрузки данных таблицы'}
  });
}

export function execSucess() {
  return (dispatch) => dispatch ({
    type: TEXEC
  });
}


export function loadData(path,params) {
  return fDGet(path, {
    params,
    success: loadDataSucess,
    error: loadError
  });
};

export function filter(data) {
  return (dispatch) => dispatch ({
    type: TFILTER,
    field: data.field,
    value: data.value
  });
}

export function check(data) {
  return (dispatch) => dispatch ({
    type: TGROUPCHECK,
    index: parseInt(data.field,10),
    value: data.value
  });
}

export function checkAll(value) {
  return (dispatch) => dispatch ({
    type: TGROUPCHECKALL,
    value
  });
}

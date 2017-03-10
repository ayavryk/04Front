import { clone, fDGet } from '../lib';

// =============================================================================================  
// CONST 
// ============================================================================================= 
export const TLOADDATA = 'TLOADDATA';
export const TSET = 'TSET';
export const TEXEC = 'TEXEC';
export const TFILTER = 'TFILTER';
export const TGROUPCHECK = 'TGROUPCHECK';
export const TGROUPCHECKALL = 'TGROUPCHECKALL';
export const MESSAGE = 'TMESSAGE';


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
    let res;
    switch (action.type) {
        case TGROUPCHECKALL:
            res = clone(state);
            res.data.map(item => { item._selected = action.value; });
            return res;
        case TGROUPCHECK:
            res = clone(state);
            res.data[action.index]._selected = action.value;
            return res;
        case TSET:
            console.log(action.data);
            res =  !action.data ? INITIAL_STATE : Object.assign(clone(state), action.data);
            return res;
        case TFILTER:
            res = clone(state);
            res.filter[action.field] = action.value;
            return res;
        case TLOADDATA:
            const { data = null, page= INITIAL_STATE.page, filter= INITIAL_STATE.filter } = action.data;
            return { data, page, filter };
        default:
            return state;
    }
}

// =============================================================================================  
// ACTIONS 
// =============================================================================================  

export function setData(data) {
    return dispatch => dispatch ({
        type: TSET,
        data
    });
}

function loadDataSucess(data) {
    return dispatch => dispatch ({
        type: TLOADDATA,
        data
    });
}

export function loadError() {
    return dispatch => dispatch ({
        type: MESSAGE,
        data: {message: 'Ошибка загрузки данных таблицы'}
    });
}

export function execSucess() {
    return dispatch => dispatch ({
        type: TEXEC
    });
}


export function loadData(path, params) {
    return fDGet(path, {
        params,
        success: loadDataSucess,
        error: loadError
    });
};

export function filter(data) {
    return dispatch => dispatch ({
        type: TFILTER,
        field: data.field,
        value: data.value
    });
}

export function check(data) {
    return dispatch => dispatch ({
        type: TGROUPCHECK,
        index: parseInt(data.field, 10),
        value: data.value
    });
}

export function checkAll(value) {
    return dispatch => dispatch ({
        type: TGROUPCHECKALL,
        value
    });
}

export function setError() {
    return dispatch => dispatch ({
        type: MESSAGE,
        data: { message: 'Ошибка выполнения команды' }
    });
}

export function setMessage(data) {
    return dispatch => dispatch ({
        type: MESSAGE,
        data
    });
}

export function sendData(path, params) {
    return fDGet(path, {
        params,
        success: setMessage,
        error: setError
    });
}

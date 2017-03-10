
import { LOCATION_CHANGE } from 'react-router-redux';

import { clone, fDGet } from 'lib';

// =============================================================================================  
// CONST 
// ============================================================================================= 
export const UPDATE = 'EDIT_UPDATE';
export const LOAD = 'EDIT_LOAD';
export const LOADERROR = 'EDIT_LOADERROR';
export const SET = 'SET';
export const CLEAR = 'EDIT_CLEAR';
export const CREATE = 'EDIT_CREATE';
export const SAVE = 'EDIT_SAVE';
export const MESSAGE = 'EDIT_MESSAGE';

// =============================================================================================  
// INITIAL_STATE 
// ============================================================================================= 

interface IData {
    data: any;
    isChanged: boolean;
}

const INITIAL_STATE: IData = {
    data: null,
    isChanged: false
};


// =============================================================================================  
// REDUSER 
// =============================================================================================  

export function edit(state: IData = INITIAL_STATE, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return INITIAL_STATE;
        case SET:
            return Object.assign(clone(state), action.data);
        case UPDATE:
            const res = clone(state);
            res.data[action.field] = action.value;
            res.isChanged = true;
            return res;
        case LOAD:
            return {
                isChanged: false,
                data: action.data
            };
        case CLEAR:
            return INITIAL_STATE;
        case CREATE:
            return Object.assign({}, INITIAL_STATE, { data: {}});
        default:
            return state;
    }
}

// =============================================================================================  
// ACTIONS 
// =============================================================================================  


export function update(data) {
    return dispatch => dispatch ({
        type: UPDATE,
        field: data.field,
        value: data.value
    });
}

export function create() {
    return dispatch => dispatch ({
        type: CREATE
    });
}

export function clear() {
    return dispatch => dispatch ({
        type: CLEAR
    });
}

function loadSucess(data) {
    return dispatch => dispatch ({
        type: LOAD,
        data
    });
}

export function loadError() {
    return dispatch => dispatch ({
        type: MESSAGE,
        data: { message: 'Ошибка загрузки данных формы' }
    });
}

export function load(path, params) {
    return fDGet(path, {
        params,
        success: loadSucess,
        error: loadError
    });
};

export function save(path, getParams, postParams) {
    return fDGet(path, {
        getParams,
        postParams,
        success: loadSucess,
        error: loadError
    });
};

export function set(data) {
    return dispatch => dispatch ({
        type: SET,
        data
    });
}



// =============================================================================================  
// CONST 
// ============================================================================================= 
export const MESSAGE = 'MESSAGE';
const SET = 'SET';

// =============================================================================================  
// INITIAL_STATE 
// ============================================================================================= 

interface IData {
    message: string;
    command: string;
}

const INITIAL_STATE: IData = {
    message: '',
    command: ''
};

// =============================================================================================  
// REDUSER 
// =============================================================================================  

export function message(state: IData = INITIAL_STATE, action) {
    switch (action.type) {
        case MESSAGE:
            return Object.assign({}, state, action.data);
        case SET:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

// =============================================================================================  
// ACTIONS 
// =============================================================================================  

export function setMessage(data) {
    return dispatch => dispatch ({
        type: SET,
        data
    });
}



// =============================================================================================  
// CONST 
// ============================================================================================= 

 
const CLEAR = 'MSG_CLEAR';
const SET = 'MSG_SET';

// =============================================================================================  
// INITIAL_STATE 
// ============================================================================================= 

interface IData {
    message: string;
    command: string;
    notify: string;
}

const INITIAL_STATE: IData = {
    message: '',
    command: '',
    notify: ''
};

// =============================================================================================  
// REDUSER 
// =============================================================================================  

export function message(state: IData = INITIAL_STATE, action) {
    switch (action.type) {
        case CLEAR:
            return INITIAL_STATE;
        case SET:
            return { ...state, ...action.data };
        default:
            let res = state;
            if (action.data) {
                const { command, notify, message } = action.data;
                if (command) {
                    res = { ...res, command };
                }
                if (notify) {
                    res = { ...res, notify };
                }
                if (message) {
                    res = { ...res, message };
                }
            }
            return res;
    }
}

// =============================================================================================  
// ACTIONS 
// =============================================================================================  

export function clearMessage() {
    return dispatch => dispatch ({
        type: CLEAR
    });
}

export function setMessage(data) {
    return dispatch => dispatch ({
        type: SET,
        data
    });
}
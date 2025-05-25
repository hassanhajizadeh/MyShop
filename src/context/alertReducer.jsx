export const alertInitialState = {
    message: "",
    type: "success",
    show: false,
    isConfirm: false,
    confirmed: false,
    canceled: false,
};

export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";
export const SHOW_CONFIRM_ALERT = "SHOW_CONFIRM_ALERT";
export const CONFIRM_ALERT = "CONFIRM_ALERT";
export const CANCEL_ALERT = "CANCEL_ALERT";

const alertReducer = (state = alertInitialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                type: action.payload.type,
                message: action.payload.msg,
                show: true,
                isConfirm: false,
                confirmed: false,
                canceled: false,
            };
        case SHOW_CONFIRM_ALERT:
            return {
                ...state,
                type: action.payload.type,
                message: action.payload.msg,
                show: true,
                isConfirm: true,
                confirmed: false,
                canceled: false,
            };
        case CONFIRM_ALERT:
            return {
                ...state,
                confirmed: true,
                canceled: false,
                show: false,
                isConfirm: false,
            };
        case CANCEL_ALERT:
            return {
                ...state,
                confirmed: false,
                canceled: true,
                show: false,
                isConfirm: false,
            };
        case HIDE_ALERT:
            return {
                ...state,
                message: "",
                type: "",
                show: false,
                isConfirm: false,
                confirmed: false,
                canceled: false,
            };
        default:
            return state;
    }
};

export default alertReducer;

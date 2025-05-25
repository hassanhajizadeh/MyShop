export const modalInitialState = {
    isModalOpen : false,
    modalComponent : null,
    modalProps : {}
}

export const SHOW_MODAL = "SHOW_MODAL";;
export const CLOSE_MODAL = "CLOSE_MODAL";

const modalReducer = (state=modalInitialState , action) =>{
    switch(action.type){
        case SHOW_MODAL:
            return {
                ...state,
                isModalOpen:true,
                modalComponent: action.payload.component,
                modalProps : action.payload.props || {}
            }
        case CLOSE_MODAL:
            return{
                ...state,
                isModalOpen:false,
                modalComponent:null,
                modalProps : {}
            }
        default:
            return state
    }
}

export default modalReducer
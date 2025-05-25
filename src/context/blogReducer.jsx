export const blogInitialState = {
    loading:false,
    blogData: [],
    error : null,
}

export const FETCH_BLOG_START = "FETCH_BLOG_START";
export const FETCH_BLOG_SUCCESS = "FETCH_BLOG_SUCCESS";
export const FETCH_BLOG_ERROR = "FETCH_BLOG_ERROR";



const blogReducer = (state = blogInitialState , action) =>{
    switch(action.type){
        case FETCH_BLOG_START:
            return {...state , loading:true}
        case FETCH_BLOG_SUCCESS:
            return {...state , loading:false , blogData:action.payload}
        case FETCH_BLOG_ERROR:
            return {...state , loading:false , blogData:[], error : action.payload}
        default:
            return state   
    }
}

export default blogReducer
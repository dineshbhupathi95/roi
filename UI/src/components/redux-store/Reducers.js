

const useAddProjectReducer =(state={},action)=>{
    switch(action.type){
        case 'ADD_PROJECT':
            return {...state,...action.payload}
        default:
            return state
    }
}


export default useAddProjectReducer;
const initalstate = {expense : []}

const counterReducer = (state = initalstate, action) => {
    switch (action.type) {
        case 'GET-EXPENSE':{
            const currentstate = {...state}
            currentstate.expense.push(action.payload)
            return currentstate;
          }  
        default: return state;
    }
}

export default counterReducer;
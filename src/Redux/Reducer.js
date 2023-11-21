const initalstate = {expense : [],
                    unique : localStorage.getItem('uniqueid')
                }

const counterReducer = (state = initalstate, action) => {
    switch (action.type) {
        case 'GET-EXPENSE':{
            const currentstate = {...state}
            currentstate.expense.push(action.payload)
            return currentstate;
          }
        case 'DELETE-EXPENSE':{
            const deletestate = {...state}
            deletestate.expense.slice(0, action.payload)
            deletestate.expense.slice(action.payload + 1)
            return deletestate;
        }
        case 'UNIQUE-ID':{
            let uniqueid = {...state}
            uniqueid.unique = action.payload
            return uniqueid;
        }
        default: return state;
    }
}

export default counterReducer;
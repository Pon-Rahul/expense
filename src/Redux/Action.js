const saveexpense = (expense) =>({
    type : 'GET-EXPENSE',
    payload : expense
})
const deleteexpense = (expense) =>({
    type : 'DELETE-EXPENSE',
    payload : expense
})
const updatekey = (unique) =>({
    type : 'UNIQUE-ID',
    payload : unique
})
export {saveexpense,deleteexpense,updatekey}
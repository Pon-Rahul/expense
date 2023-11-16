import React, { useState } from "react";
import {  useSelector } from "react-redux";
import './History.css';
import { useNavigate ,useParams} from "react-router-dom";



const History = () => {
    const navigate = useNavigate()
    const infohistory = useSelector((state) => state.expense)
    const [history , setHistory] = useState(infohistory)
    const { index } = useParams();
    const editHandler = (index) =>{
        navigate(`/edit/${index}`)
    }
    const deleteHandler = (i) =>{
       const deletedata = [...history]  
       deletedata.splice(i,1)
       setHistory(deletedata)
    }

    return (
        <div>
            <div>
                HISTORY
                {history.map((o,i)=>
                <div className="history">
                    <span>
                        <span>
                            {o.description}
                        </span>
                        <span>
                            {o.amount}
                        </span>
                        <span>
                            {o.date}
                        </span>
                        <span>
                            {o.category}
                        </span>
                    </span>
                    <span>
                        <button onClick={() => editHandler(i)}> 
                            edit
                        </button>
                        <button onClick={(i) => deleteHandler(index,i)}>
                            delete
                        </button>
                    </span>
                </div>
                )}
            </div>
        </div>
    )
}

export default History;
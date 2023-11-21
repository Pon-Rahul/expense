import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './History.css';
import Header from "../Header/Header";

const History = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const infohistory = useSelector((state) => state.unique);
    const [history, setHistory] = useState([]);
    const [filteredlist, setFilteredlist] = useState([]);
    const { index } = useParams();
    const url = `https://65588f65e93ca47020a97407.mockapi.io/expense?uniqueid=${infohistory}`;
    const [filter, setFilter] = useState({
        startDate: '',
        endDate: '',
        category: '',
        searchTerm: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    const fetchData = async () => {
        try {
            const list = await axios.get(url);
            setHistory(list.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const { startDate, endDate, category, searchTerm } = filter;

        const dateObject = new Date(startDate).getTime();
        const endObject = new Date(endDate).getTime();

        const datearr = history.filter((item) => {
            const start = new Date(item.date).getTime();
            return isNaN(start) || (start >= dateObject && start <= endObject);
        });

        const arr = datearr.filter((item) => item.category === category || category === "");
        const newarr = arr.filter((item) => item.description.includes(searchTerm) || searchTerm === "");

        setFilteredlist(newarr);
    };

    const editHandler = (o) => {
        navigate(`/edit/${o.id}`);
    };

    const deleteHandler = async (o) => {
        await axios.delete(`https://65588f65e93ca47020a97407.mockapi.io/expense/${o.id}`);
        fetchData();
    };

    return (
        <div>
            <Header />
            <div>
                <h2>HISTORY</h2>
                <div className="container">
                    <h2>FILTER</h2>
                <form onSubmit={handleFilterSubmit}>
                    <label>
                        Date Range:
                        <input
                            type="date"
                            name="startDate"
                            value={filter.startDate}
                            onChange={handleFilterChange}
                        />
                        <span>to</span>
                        <input
                            type="date"
                            name="endDate"
                            value={filter.endDate}
                            onChange={handleFilterChange}
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            name="category"
                            value={filter.category}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="entertainment">Entertainment</option>
                        </select>
                    </label>

                    <label>
                        Search Term:
                        <input
                            type="text"
                            name="searchTerm"
                            value={filter.searchTerm}
                            onChange={handleFilterChange}
                        />
                    </label>

                    <button className="filterbtn" type="submit">Apply Filters</button>
                </form>
                </div>
                {filteredlist.length > 0 ? (
                    filteredlist.map((o, i) => renderHistoryItem(o, i))
                ) : (
                    history.map((o, i) => renderHistoryItem(o, i))
                )}
            </div>
        </div>
    );
   

    function renderHistoryItem(o, i) {
        return (
            <div className="history" key={o.id}>
                <span className="spaced">
                    <span>{o.description}</span>
                    <span className="spaced">${o.amount}</span>
                    <span className="spaced">({o.date})</span>
                    <span className="spaced">{o.category}</span>
                </span>
                <span className="btn">
                    <button className="edith" onClick={() => editHandler(o)}>edit</button>
                    <button className= "deleteh"onClick={() => deleteHandler(o)}>delete</button>
                </span>
            </div>
        );
    }
};

export default History;

import React, { useState, useEffect, useRef } from "react";
import { fetchTopic } from "./api/review.api";

function SearchTopic() {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);;
    const inputRef = useRef();

    useEffect(() => {
        (async () => {
            const { data } = await fetchTopic();
            setList(data.data);
        })()
    }, []);

    const onSubmit = () => {
        const { value } = inputRef.current;
        const filtered = list.filter(item => item.tag.includes(value?.trim()));
        setFilteredList(filtered);
    }

    return (
        <div>
            <SearchInput
                onSubmit={onSubmit}
                inputRef={inputRef}
            />
            <List list={list} filteredList={filteredList} />
        </div>
    )
}

const SearchInput = ({ onSubmit, inputRef }) => {
    return (
        <div className="search-input-card">
            <h6>Highlight Tag</h6>
            <input ref={inputRef} />
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

const List = ({ list, filteredList }) => {
    const isActive = (item) => filteredList.includes(item);

    return list.map((item, key) => {
        const { title, name, comment, vote, tag } = item;
        return (
            <div key={key} className={`search-card-item ${isActive(item) ? "active" : ""}`}>
                <div className="d-flex d-column">{title}</div>
                <div className="d-flex d-column tag">{tag.map(item => item.concat(" "))}</div>
                <div className="row content">
                    <div className="col-6">
                        <div className="text-left font-weight-bold">{name}</div>
                    </div>
                    <div className="col-6">
                        <div className="text-right">
                            <span>{vote}</span>
                            <span className="pl-3">{comment}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
}

export default SearchTopic;


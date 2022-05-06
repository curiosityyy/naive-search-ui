import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import SearchResult from './SearchResult';
import Select from 'react-select';

const options = [
    { value: '@timestamp', label: 'Date' },
    { value: 'like_count', label: 'Like Count' },
    { value: 'retweet_count', label: 'Retweet Count' }
];

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    },
    display: "flex"
}
const searchBar = {
    width: 500,
    height: 55,
    display: "flex"
};

const sesarchResultItem = {
    margin: "2%",
    display: "flex",
    flexDirection: "column"
};

let params = {
    "from": 0,
    "size": 100,
    "index": "twitter"
};

const Search = () => {
    const [searchKey, setSearchKey] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const sortBy = async (sortParams) => {
        params['sortby'] = sortParams['value'] + ':desc';
        console.log("search test");
        try {

            console.log(params)
            let res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/search`, params);
            // console.log(res.data['hits']['hits']);
            console.log("-------------------------------");
            setData(res.data['hits']['hits']);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const getData = async (key) => {
        console.log("search test");
        try {
            let match_content = "text:" + key;
            params['match'] = [match_content];
            console.log(params)
            let res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/search`, params);
            // console.log(res.data['hits']['hits']);
            console.log("-------------------------------");
            setData(res.data['hits']['hits']);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    };
    console.log(searchKey);
    console.log(data.length);
    return (
        <div style={{ width: "100%" }}>
            <form style={searchBar} onSubmit={event => {
                event.preventDefault();
                if (searchKey) {
                    setLoading(true);
                    getData(searchKey);
                }
            }} noValidate autoComplete="off">
                <TextField value={searchKey} onChange={(event) => setSearchKey(event.target.value)} id="outlined-basic" label="Search" variant="outlined" style={{ width: '400px', marginRight: "5px" }} />
                <button type="button" onClick={() => {
                        setSearchKey('');
                        setData([]);
                    }
                } >Search</button>
            </form>
            <Select styles={customStyles}
                    name="SortBy"
                    defaultValue={{ label: "SortBy", value: 0 }}
                    onChange = {value => sortBy(value).await}
                    options={options} />

            <div style={{ display: "flex", width: "100%", justifyContent: "center", margin: "5px" }}>{loading ? <p >loading...</p> : (<div style={{ display: "flex" }}>
                {data.length ? (
                    <div style={sesarchResultItem}> {data.map((dataElement, idx) => {
                        return (
                            <SearchResult style={{ margin: "2%" }} key={idx} dataElement={dataElement} />
                        );
                    })} </div>
                ) : <div><h3>No Records</h3></div>}
            </div>)}</div>

        </div>
    );
};



export default Search;

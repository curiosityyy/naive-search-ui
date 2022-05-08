import React, { useState } from 'react';
import chroma from 'chroma-js';
import { ColourOption, colourOptions } from '../utils/data';
import Select, { StylesConfig } from 'react-select';

import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import SearchResult from './SearchResult';

const options = [
    { value: 'none', label: 'Sort By ...', color: '#666666'},
    { value: 'created_at', label: 'Sort By Date',  color: '#00B8D9', isFixed: true },
    { value: 'like_count', label: 'Sort By Like Count', color: '#0052CC'},
    { value: 'retweet_count', label: 'Sort By Retweet Count', color: '#5243AA' }
];

const termsOptions = [
    { value: 'btc', label: 'BTC',  color: '#00B8D9', isFixed: true },
    { value: 'eth', label: 'ETH', color: '#0052CC'},
    { value: 'amp', label: 'AMP', color: '#5243AA' }
];


const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const termsStyles: StylesConfig<termsOptions, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined,
            },
        };
    },
    multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: color.alpha(0.1).css(),
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: data.color,
            color: 'white',
        },
    }),
};

const colourStyles: StylesConfig<options> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined,
            },
        };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};


const searchBar = {
    width: "50%",
    height: 30,
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
    "index": "twitter-indexed-demo"
};

const Search = () => {
    const [searchKey, setSearchKey] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const addTerms = function (terms) {
        if(terms.length > 0) {
            params['term'] = [];
            terms.forEach(term => {
                params['term'].push("index:" + term.value);
            });
        } else {
            delete params['term'];
        }
    }

    const sortBy = async (sortParams) => {
        console.log(sortParams);
        if (sortParams['value'] == 'none') {
            delete  params['sortby'];
        } else {
            params['sortby'] = sortParams['value'] + ':desc';
        }
        console.log(params);
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
        <div style={{ width: "100%", height: "10px" }}>
            <form style={searchBar}>
                <Select options={termsOptions}
                        styles={termsStyles}
                        autosize={true}
                        isMulti
                        name="Index"
                        onChange = {(event) => addTerms(event)}
                />
            </form>
            <br />
            <form style={searchBar} onSubmit={event => {
                console.log(event);
                event.preventDefault();
                if (searchKey) {
                    setLoading(true);
                    getData(searchKey);
                }
            }} noValidate autoComplete="off">
                <TextField value={searchKey} onChange={(event) => setSearchKey(event.target.value)} id="outlined-basic" label="Search" variant="outlined" size="small" style={{ width: '40%', height: '5%'}} />
                {/*<button type="button" style={{ width: '10%', height: '40px', marginRight: "5px" }}*/}
                {/*        onClick={() => {*/}
                {/*            setSearchKey('');*/}
                {/*            setData([]);*/}
                {/*        }*/}
                {/*} >Search</button>*/}

            </form>
            <br />
            <form style={searchBar}>
                <Select defaultValue={options[0]}
                        options={options}
                        styles={colourStyles}
                        name="SortBy"
                        onChange = {value => sortBy(value)}
                        />
            </form>


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

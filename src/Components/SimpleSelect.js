import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useSelectDispatch, useSelectState, useSelectValuesDispatch, useSelectValuesState} from "./SelectContext";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    const selectedState = useSelectState();
    const dispatch = useSelectDispatch();
    const stateValues = useSelectValuesState();
    const dispatchValues = useSelectValuesDispatch();

    const FetchData = async () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                console.log("FetchData", json)
                // setSValues(json.map((value) => {
                //     return {value: value, label: value.name}
                // }));
                dispatchValues({type: "changeSelectValues", payload: json})
                fetch('https://jsonplaceholder.typicode.com/users/2')
                    .then(response => response.json())
                    .then(json => {
                        console.log("FetchDataSelected", json)
                        //setSelected(json)
                        //dispatch({type:"changeSelect", payload: {value: json, label: json.name}})
                        dispatch({type: "changeSelect", payload: json})
                    })
            })
    }

    const FetchDataSelected = async () => {
        fetch('https://jsonplaceholder.typicode.com/users/2')
            .then(response => response.json())
            .then(json => {
                console.log("FetchDataSelected", json)
                //setSelected(json)
                //dispatch({type:"changeSelect", payload: {value: json, label: json.name}})
                dispatch({type: "changeSelect", payload: json})
            })
    }

    useEffect(() => {
        FetchData()// the function fetching the data
    }, [])

    useEffect(() => {
        // FetchDataSelected()// the function fetching the data
    }, [])

    const handleChange = (event) => {
        //dispatch({type:"changeSelect", payload: {value: event.target.value, label: event.target.value.name}})
        console.log("handling selection", event.target.value)
        dispatch({type: "changeSelect", payload: event.target.value})
        //setSelected(event.target.value)
    };

    return (
        <div>
            <div>State:</div>
            <code>{JSON.stringify(selectedState)}</code>
            <div>Selection values:</div>
            <code>{JSON.stringify(stateValues)}</code>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Name</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedState}
                    renderValue={(value) => value.name}
                    onChange={(event) => handleChange(event)}
                >
                    {
                        stateValues.map((item, keyIndex) =>
                            <MenuItem key={keyIndex} value={item}>{item.name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
    );
}

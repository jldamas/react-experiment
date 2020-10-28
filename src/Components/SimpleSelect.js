import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useSelectDispatch, useSelectState, useSelectValuesDispatch, useSelectValuesState} from "./SelectContext";
import _ from "lodash";

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

    //Go get the data for the states
    useEffect(() => {
        const FetchData = async () => {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(values => {
                    console.log("FetchData", values)
                    dispatchValues({type: "changeSelectValues", payload: values})
                    FetchDataSelected(values);
                })
        }
        const FetchDataSelected = async (values) => {
            fetch('https://jsonplaceholder.typicode.com/users/2')
                .then(response => response.json())
                .then(json => {
                    console.log("FetchDataSelected", json)
                    dispatch({type: "changeSelect", payload: _.find(values, json)})
                })
        }

        FetchData()// the function fetching the data
    }, [dispatch, dispatchValues])

    const handleChange = (event) => {
        console.log("handling selection", event.target.value)
        dispatch({type: "changeSelect", payload: event.target.value})
    };

    return (
        <div>
            <div>State:</div>
            <p>{JSON.stringify(selectedState)}</p>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Name</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="nameSelect"
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

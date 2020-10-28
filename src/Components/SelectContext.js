import React from 'react';

const SelectStateContext = React.createContext()
const SelectDispatchContext = React.createContext()

const SelectValuesStateContext = React.createContext()
const SelectValuesDispatchContext = React.createContext()

const initialState = {
        "name": "None"
    }

const initialStateValues = [initialState]

function reducer(state, action) {
    switch (action.type) {
        case 'changeSelect': {
            console.log("setting selected value to", action.payload)
            return action.payload
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function valuesReducer(state, action) {
    switch (action.type) {
        case 'changeSelectValues': {
            console.log("setting selected values to", action.payload)
            return action.payload
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}


function SelectProvider({children}) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const [valuesState, dispatchValues] = React.useReducer(valuesReducer, initialStateValues)
    return (
        <SelectStateContext.Provider value={state}>
            <SelectDispatchContext.Provider value={dispatch}>
                <SelectValuesStateContext.Provider value={valuesState}>
                    <SelectValuesDispatchContext.Provider value={dispatchValues}>
                        {children}
                    </SelectValuesDispatchContext.Provider>
                </SelectValuesStateContext.Provider>
            </SelectDispatchContext.Provider>
        </SelectStateContext.Provider>
    )
}

function useSelectState() {
    const context = React.useContext(SelectStateContext)
    if (context === undefined) {
        throw new Error('useSelectState must be used within a SelectStateProvider')
    }
    return context
}

function useSelectDispatch() {
    const context = React.useContext(SelectDispatchContext)
    if (context === undefined) {
        throw new Error('useSelectDispatch must be used within a SelectStateProvider')
    }
    return context
}
function useSelectValuesState() {
    const context = React.useContext(SelectValuesStateContext)
    if (context === undefined) {
        throw new Error('useSelectValuesState must be used within a SelectValuesStateProvider')
    }
    return context
}

function useSelectValuesDispatch() {
    const context = React.useContext(SelectValuesDispatchContext)
    if (context === undefined) {
        throw new Error('useSelectValuesDispatch must be used within a SelectValuesDiapatchProvider')
    }
    return context
}

export {SelectProvider, useSelectState, useSelectDispatch, useSelectValuesDispatch, useSelectValuesState}
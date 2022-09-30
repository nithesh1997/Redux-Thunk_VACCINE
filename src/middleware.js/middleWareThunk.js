const middleWareThunk = () => {
    return (dispatch) => {
        fetch('http://localhost:4000/vaccine')
            .then(res => res.json())
            .then(fin => dispatch({ type: 'DATA_SUCCESS', payload: fin }))
    }
}

export default middleWareThunk
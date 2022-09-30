import { useState, useEffect } from "react"
import { connect } from 'react-redux'


function VaccineForm(props) {



    // console.log(props.vaccine.editData)
    const [input, setInput] = useState({
        name: '',
        date: '',
        vaccine: ''
    })

    useEffect(() => {
        if (props.vaccine.editData !== {}) {
            const { name, date, vaccine, id } = props.vaccine.editData
            setInput({
                name,
                date,
                vaccine,
                id
            })
        }
    }, [])



    function handleChange(e) {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e) {
        fetchData()
        setTimeout(() => {
            props.history.push('/list')
        }, 500)
        if (input.id) {
            editDetailForm()
        }
    }

    function fetchData() {
        fetch('http://localhost:4000/vaccine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        setInput({
            name: '',
            date: '',
            vaccine: ''
        })
    }

    function editDetailForm() {
        const { id } = props.vaccine.editData
        fetch(`http://localhost:4000/vaccine/${id}`,
            {
                method: "PUT",
                body: JSON.stringify({ ...input, id }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }

    function handleFormNew() {
        props.newUserDisaptch({})
        setInput({
            name: '',
            date: '',
            vaccine: ''
        })

    }



    const { name, date, vaccine } = input
    return (
        <div>
            <div className="row">
                <h1 className="col-md-9">Vaccine Form</h1><br />
                {input.id && <button style={{ height: '3rem' }} className="col-md-1 btn btn-success" onClick={handleFormNew}>New User</button>}
            </div><br />
            <input type="text" id="name" value={name} onChange={handleChange} placeholder="Name" className="form-control mb-3" />
            <input type="date" id="date" value={date} onChange={handleChange} className="form-control mb-3" />
            <input type="text" id="vaccine" value={vaccine} onChange={handleChange} placeholder="Vaccine" className="form-control mb-3" />
            <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        newUserDisaptch: (data) => dispatch({ type: 'EDIT_DATA', payload: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaccineForm)
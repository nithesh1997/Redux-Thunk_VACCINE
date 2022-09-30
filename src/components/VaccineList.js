import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import middleWareThunk from '../middleware.js/middleWareThunk'

function VaccineList(props) {

    const { vaccine } = props
    const [pageno, setPageno] = useState(1)
    const [paginatedDataSet, setPaginatedDataSet] = useState({})
    const [paginationItems, setPaginationItems] = useState(null)

    const createPagination = async (vaccine) => {
        let count = 1;
        return await vaccine.reduce((acc, curr, index) => {
            if (index % 5 == 0 && index != 0) {
                count++;
                acc[count] = [curr];
            } else {
                acc[count] = acc[count] ? [...acc[count], curr] : [curr];
            }
            setPaginatedDataSet(acc)
            return acc;
        }, {});
    };


    useEffect(() => {
        setPaginationItems(paginatedDataSet[pageno])
    }, [pageno, paginatedDataSet])

    useEffect(() => {
        props.addFetchDispatch()
        createPagination(vaccine)
    }, [vaccine])

    function handleDelete(id) {
        fetch('http://localhost:4000/vaccine/' + id, {
            method: 'DELETE'
        })
    }

    function handleEdit(data) {
        props.editFetchDispatch(data)
        props.history.push('/')
        props.editFormPermisson()
    }

    function handleNewUser() {
        props.history.push('/')
        props.editFetchDispatch({})
    }

    function handleBtn(id) {
        setPageno(id)
    }


    return (
        <div><br />
            <div className='row'>
                <h3 className='col-md-10'>VaccineList</h3><br />
                <button className='col-md-1 btn btn-success' onClick={handleNewUser}>New User</button>
            </div><br /><br />
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Vaccine</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {paginationItems && paginationItems.map(e => (
                        <tr>
                            <th scope="row">{e.id}</th>
                            <td>{e.name}</td>
                            <td>{e.date}</td>
                            <td>{e.vaccine}</td>
                            <td><button className='btn btn-primary' onClick={() => handleEdit(e)}>Edit</button></td>
                            <td><button className='btn btn-danger' onClick={() => handleDelete(e.id)}>Delete</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {paginatedDataSet !== {} && Object.keys(paginatedDataSet).map(e => (
                        <li class="page-item"><a class="page-link" href="#" onClick={() => handleBtn(e)}>{e}</a></li>
                    ))}
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        vaccine: state.vaccine.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFetchDispatch: () => dispatch(middleWareThunk()),
        editFetchDispatch: (data) => dispatch({ type: 'EDIT_DATA', payload: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaccineList)
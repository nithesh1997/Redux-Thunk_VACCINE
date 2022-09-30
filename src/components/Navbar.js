import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to={'/'}>TaskCast</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <Link class="nav-link active" aria-current="page" to={'/'}>Vaccine Form</Link>
                            <Link class="nav-link" to={'/list'}>Vaccine List</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
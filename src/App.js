import React from 'react'
import VaccineForm from './components/VaccineForm'
import Navbar from './components/Navbar'
import VaccineList from './components/VaccineList'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Navbar />
          <Switch>
            <div className="container">
              <Route exact path={'/'} component={VaccineForm} />
              <Route path={'/list'} component={VaccineList} />
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
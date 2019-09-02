import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import HomePage from '../Components/homePage.js'

const ReactRouter = () => {
    return(
        <React.Fragment>
            <Route exact path='/' component={HomePage}/>
        </React.Fragment>
    )
}

export default ReactRouter
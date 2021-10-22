import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({

    auth,
    component: Component,
    ...rest

}) => {

    return (

        <Route
            {...rest}
            component={

                (props) => (

                    (auth)
                        ? <Redirect to='/'/>
                        : <Component {...props }/>

                )

            }
        />

    )

}


export default PublicRoute

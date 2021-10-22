import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({

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
                        ? <Component {...props}/>
                        : <Redirect to='/login'/>

                )

            }
        />

    )

}


export default PrivateRoute

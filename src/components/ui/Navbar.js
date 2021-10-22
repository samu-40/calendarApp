import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { eventClearStore } from '../../actions/calendar';

const Navbar = () => {

    const { name } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const onClick = () => {

        dispatch( eventClearStore() )
        dispatch( startLogout() )

    }

    return (

        <nav className='container'>

            <h3>{ name }</h3>

            <button
                className='btn white-ghost'
                onClick={ onClick }
            >
                <i className='fas fa-sign-out-alt'></i> Logout
            </button>
            
        </nav>

    );

};

export default Navbar;

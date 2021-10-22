import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDeleted } from '../../actions/calendar';

const DeletedFAB = () => {

    const dispatch = useDispatch();

    const onClick = () => {

        dispatch( eventStartDeleted() );
        
    };

    return (

        <button className='FABD' onClick={ onClick }>
            <i className='fas fa-trash'></i>
        </button>
    );

};

export default DeletedFAB;

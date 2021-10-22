import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

const AddNewFAB = () => {

    const dispatch = useDispatch();

    const onClick = () => {

        dispatch( uiOpenModal() );
        
    };

    return (

        <button className='FABN' onClick={ onClick }>
            <i className='fas fa-plus'></i>
        </button>
    );

};

export default AddNewFAB;

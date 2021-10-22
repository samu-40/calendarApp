import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/calendar';
import { useForm } from '../../hooks/useForm';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    start: now.toDate(),
    end: nowPlus.toDate(),
    notes: ''
};

const CalendarModal = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus.toDate());

    const [ formValues, handleInputChange, , setValues ] = useForm( initEvent )
    const { title, notes, start, end } = formValues;

    useEffect(() => {

        if ( activeEvent ){

            setValues( activeEvent );

        } else {

            setValues( initEvent );

        }

    }, [activeEvent, setValues]);

    const closeModal = () => {

        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setValues( initEvent );

    };

    const onStartDateChange = (e) => {

        setDateStart(e);

        setValues({
            ...formValues,
            start: e
        });

    };

    const onEndDateChange = (e) => {

        setDateEnd(e);

        setValues({
            ...formValues,
            end: e
        });

    };

    const onSubmit = ( e ) => {

        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if (momentStart.isSameOrAfter( momentEnd )){
            
            return Swal.fire('Error', 'La hora de fin del evento debe ser mayor a la de inicio', 'error');

        };

        if (title.trim().length < 2){

            return Swal.fire('Error', 'El titulo debe tener por lo menos 2 letras', 'error');

        };

        if ( activeEvent ){

            dispatch( eventStartUpdate( formValues ) );

        } else {

            dispatch( eventStartAddNew( formValues ) );
            
        };


        closeModal();

    }

    return (

        <Modal
            isOpen={ modalOpen }
            // onAfterOpen={ afterOpenModal }
            onRequestClose={closeModal}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >

            <h1 className='title-modal'>{ ( activeEvent ) ? 'Editar' : 'Nuevo evento' }</h1>

            <form className='form-container' onSubmit={onSubmit}>

                <div>

                    <p>Titulo</p>
                    <input
                        type='text'
                        name='title'
                        value={title}
                        onChange={handleInputChange}
                    />

                </div>
                <div>

                    <p>Fecha y hora de inicio</p>
                    <DateTimePicker
                        onChange={onStartDateChange}
                        value={dateStart}
                    />
                    {/* <input type='time' onChange={ onStartDateChange }/> */}

                </div>
                <div>

                    <p>Fecha y hora de cierre</p>
                    <DateTimePicker
                        onChange={onEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                    />
                    {/* <input type='time'/> */}

                </div>
                <div>

                    <p>Notas</p>
                    <textarea
                        type='text'
                        name='notes'
                        value={notes}
                        onChange={handleInputChange}
                    />

                </div>

                <button
                    type='submit'
                    className='btn blue-ghost'
                >
                    <i className='far fa-save'></i> Guardar
                </button>

            </form>

        </Modal>

    );

};

export default CalendarModal;

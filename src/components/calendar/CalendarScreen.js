import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/calendar';
import AddNewFAB from '../ui/AddNewFAB';
import DeletedFAB from '../ui/DeletedFAB';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {

        dispatch( eventStartLoading() )

    }, [dispatch])

    const onDoubleClick = ( e ) => {

        dispatch( uiOpenModal() );

    };

    const onSelectEvent = ( e ) => {

        dispatch( eventSetActive( e ) );

    };

    const onViewChange = ( e ) => {

        setLastView( e );
        localStorage.setItem('lastView', e);

    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367cf7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        };

        return {
            style
        };

    };

    const onSelectSlot = () => {

        dispatch( eventClearActiveEvent() );

    };

    return (

        <div className='calendar-screen'>

            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFAB/>

            { activeEvent && <DeletedFAB/> }

            <CalendarModal/>
            
        </div>

    );

};

export default CalendarScreen;

import React from 'react';

const CalendarEvent = ({ event }) => {

    const { title, user:{ name } } = event;

    return (

        <div>

            <span>{ title }</span> <br/>
            <small>- { name }</small>
            
        </div>

    );

};

export default CalendarEvent;

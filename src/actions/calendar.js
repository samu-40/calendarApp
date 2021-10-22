import Swal from "sweetalert2";

import { fetchConToken } from "../helpers/fetch";
import { transformDate } from "../helpers/transformDate";
import { types } from "../types/types";

export const eventStartAddNew = ( event ) => {

    return async ( dispatch, getState ) => {

        const { name, uid } = getState().auth

        try {
            
            const resp = await fetchConToken( 'events', event, 'POST' )
            const body = await resp.json()

            if (body.ok) {

                event.id = body.evento.id
                event.user = {
                    _id: uid,
                    name
                }
                
                dispatch( eventAddNew( event ) )

            }


        } catch (err) {
            
            console.log(err)

        }

    }

}

const eventAddNew = ( event ) => ({

    type: types.eventAddNew,
    payload: event

});

export const eventSetActive = ( event ) => ({

    type: types.eventSetActive,
    payload: event

});

export const eventClearActiveEvent = () => ({

    type: types.eventClearActiveEvent    

});

export const eventStartUpdate = ( event ) => {

    return async ( dispatch ) => {

        try {

            const resp = await fetchConToken( `events/${ event.id }`, event, 'PUT' )
            const body = await resp.json()

            if ( body.ok ) {

                dispatch( eventUpdated( event ) )

            } else {

                Swal.fire( 'Error', body.msg, 'error' )

            }

        } catch (err) {
         
            console.log(err)

        }

    }

}

export const eventUpdated = ( event ) => ({

    type: types.eventUpdated,
    payload: event

});

export const eventStartDeleted = ( event ) => {

    return async( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent

        try {

            const resp = await fetchConToken( `events/${ id }`, {}, 'DELETE' )
            const body = await resp.json()

            if ( body.ok ) {

                dispatch( eventDeleted() )

            } else {

                Swal.fire( 'Error', body.msg, 'error' )

            }

        } catch (err) {
         
            console.log(err)

        }

    }

}

const eventDeleted = () => ({

    type: types.eventDeleted

});

export const eventStartLoading = () => {

    return async ( dispatch ) => {

        try {
            
            const resp = await fetchConToken( 'events' )
            const body = await resp.json()
            const events = transformDate( body.eventos )
    
            dispatch( eventLoaded( events ) )

        } catch (err) {

            console.log(err)
            
        }

    }

}

const eventLoaded = ( events ) => ({

    type: types.eventLoaded,
    payload: events

})

export const eventClearStore = () => ({

    type: types.eventClearStore

})
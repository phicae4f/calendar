import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../../models/IEvent";
import { IUser } from "../../models/IUser";


const loadEvents = (): IEvent[] => {
    try {
        const saved = localStorage.getItem("events")
        return saved ? JSON.parse(saved) : []
    } catch (error) {
        console.log(error)
        return []
    }
}


export interface EventState {
    guests: IUser[],
    events: IEvent[]
}

const initialState: EventState = {
    guests: [],
    events: loadEvents()
}


const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setGuests: (state, action: PayloadAction<IUser[]>) => {
            state.guests = action.payload
        },
        setEvents: (state, action: PayloadAction<IEvent[]>) => {
            state.events = action.payload
            localStorage.setItem("events", JSON.stringify(action.payload))
        },
        addEvent: (state, action: PayloadAction<IEvent>) => {
            state.events.push(action.payload)
            localStorage.setItem("events", JSON.stringify(state.events))
        }
    }
})

export const {setGuests, setEvents, addEvent} = eventSlice.actions

export default eventSlice.reducer;

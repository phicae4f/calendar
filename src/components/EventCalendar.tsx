import { Calendar } from "antd"
import { FC } from "react"
import { IEvent } from "../models/IEvent"
import { formatDate } from "../utils/date"
import { Dayjs } from "dayjs"


interface EventCalendarProps {
    events: IEvent[]
}

export const EventCalendar: FC<EventCalendarProps> = (props) => {
    const dateCellRender = (value: Dayjs) => {
        const formatedDate = formatDate(value.toDate())
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
        return (
          <div>
            {currentDayEvents.map((ev, index) => (
              <div key={index}>
                <p><strong>date: </strong>{ev.date}</p>
                <p><strong>author: </strong>{ev.author}</p>
                <p><strong>guest: </strong>{ev.guest}</p>
                <p><strong>description: </strong>{ev.description}</p>
              </div>
            ))}
          </div>
        );
      };
    return (
        <Calendar cellRender={dateCellRender}/>
    )
}
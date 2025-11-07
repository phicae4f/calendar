import { Button, Layout,  Modal, Row } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { EventCalendar } from "../components/EventCalendar";
import { EventForm } from "../components/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addEvent, setGuests } from "../store/event/eventSlice";
import axios from "axios";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";


export const Event: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { guests, events } = useSelector((state: RootState) => state.event);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();


  const fetchGuests = useCallback( async () => {
      try {
        const res = await axios.get<IUser[]>("/users.json");
        dispatch(setGuests(res.data));
      } catch (error) {
        console.log(error);
      }
  }, [dispatch])
  

  useEffect(() => {
    fetchGuests()
  }, [fetchGuests])


  const handleSubmit =  (formData: Omit<IEvent, "author"> & {author?: string}) => {
    if(!user) {
      return
    }
    const newEvent: IEvent = {
      ...formData,
      author: user.username
    }
    dispatch(addEvent(newEvent))
    console.log(newEvent)
    setIsModalOpen(false);
  };


  const userEvents = events.filter(event => event.author === user?.username || event.guest === user?.username )

  return (
    <Layout>
      <EventCalendar events={userEvents} />
      <Row justify="center">
        <Button onClick={() => setIsModalOpen(true)}>Add Event</Button>
      </Row>
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <EventForm guests={guests} onSubmit={handleSubmit} />
      </Modal>
    </Layout>
  );
};

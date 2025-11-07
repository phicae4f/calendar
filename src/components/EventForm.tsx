import { DatePicker, Select } from "antd";
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form";
import { IUser } from "../models/IUser";
import { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


type FormFields = {
    description: string;
    date: string;
    guest: string;
    author: string;
};

interface EventFormProps {
  guests: IUser[],
  onSubmit: (data: FormFields) => void,
}

export const EventForm: FC<EventFormProps> = ({guests, onSubmit}) => {
    const{register, handleSubmit, formState: { errors, isLoading }, setValue } = useForm<FormFields>()
    const {user} = useSelector((state: RootState) => state.auth)

    useEffect(() => {
      if(user) {
        setValue("author", user.username)
      }
    }, [user, setValue])

    const handleFormSubmit = handleSubmit((data) => {
      const eventData = {
        ...data,
        author: user?.username || ""
      }
      onSubmit(eventData)
    })

    const selectDate = (date: Moment | null) => {
      if(date) {
        const formattedDate = formatDate(date?.toDate())
        setValue("date", formattedDate, {shouldValidate: true})  
      }
    }

    return (
        <form className="descForm" onSubmit={handleFormSubmit}>
        <h1 className="descFormTitle">Add Event</h1>
        <div className="customInput">
          <input
            className="customInputField"
            type="text"
            placeholder="Description"
            required
            id="description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 3,
                message: "Description must be at least 3 characters",
              },
            })}
          />
          {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
        </div>

        <DatePicker onChange={selectDate}/>

        <Select placeholder="Select Guest"
      options={guests.map((guest) => ({
        value: guest.username,
        label: guest.username
      }))}
      onChange={(value: string) => setValue("guest", value)}
    />
    <input type="hidden"{...register("author")} />

        <button className="descFormBtn" type="submit" disabled={isLoading}>
          {isLoading ? "loading..." : "create"}
        </button>
      </form>
    )
}
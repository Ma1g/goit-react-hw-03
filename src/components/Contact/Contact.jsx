import css from './Contact.module.css'
import { IoCall } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

export default function Contact({ data: { id, name, number }, onDelete }) {
    return (
        <div className={css.container}>
            <div className={css.contact}>
                <p className={css.text}>
                    <IoPerson />
                    {name}
                </p>
                <p className={css.text}>
                    <IoCall />
                    {number}
                </p>
            </div>

            <button className={css.btn} onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}
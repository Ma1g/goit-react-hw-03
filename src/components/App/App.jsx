import { useEffect, useState } from 'react';
import css from './App.module.css';
import InitialContacts from '../../contacts.json';
import ContactForm from '../ContactForm/ContactForm.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ContactList from '../ContactList/ContactList.jsx';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contact");
    if (savedContacts !== null) {
      return JSON.parse(savedContacts)
    }
    return InitialContacts;
  });

  const [searchQuery, setSearchQuery] = useState("");

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [{ ...prevContacts, newContact }];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };
 
  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter((contact) => 
    contact.name.toLowerCase().split(" ").some((word) => word.startWith(searchQuery.toLocaleLowerCase()))
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={css.box}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox handleSearch={handleSearch} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}
import Notiflix from 'notiflix';
import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import './App.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  /*після першого рендеру запускається цей метод і в ньому
  ми зчитуємо список номерів з localStorage*/
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    } 
  }

  /*після поновленн state або props запускається цей метод в ньому ми 
  записуємо поновлений список номерів в localStorage*/
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  //ф-ція приймає обьект (дані  нового введеного користувача)
  //і якщо користувача з таким номером телефону енмає, то додоється в state
  createContact = data => {
    //перевіряємо чи є такий користувач з таким номером телефона
    const isThereSuchUser = this.state.contacts.some(
      ({ name, number }) => name === data.name && number === data.number
    );

    if (isThereSuchUser) {
      Notiflix.Notify.info(`${data.name} is slready in contact`);
      return;
    }

    this.setState({ contacts: [...this.state.contacts, data] });
  };

  //ф-ція отримує id контакта, який потрібно видалити і 
  //перемальовує state без цього контакта
  deleteContact = data => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== data)
    }))
  }

  //в компоненті Filter відстежується те, що введено у фільтрі і відправляється у цю
  //ф-цію і те, що введено додається в state у поле filter
  changeFilter = value => {
    this.setState({
      filter: value
    })
  }

  //ф-ція вертає цілий масив, якщо в полі filter нічого немає і -
  //відфільтрований масив по полю filter 
  //для поравняння усі слова приведені в нижній регістр а у номерів тел. приблані знаки тире
  filteredContacts = () => {
    if (this.state.filter === '') {
      return this.state.contacts;
    }
    else {
      return this.state.contacts.filter(
        ({ name, number }) =>
          name.toLowerCase().includes((this.state.filter).toLowerCase()) ||
          number.split('-').join('').includes(this.state.filter)
      );
    }    
  }


  render() {
    return (
      <div>
        <h1 className="title">Phonebook</h1>
        <ContactForm createContact={this.createContact} />
        <h2 className="title">Contacts</h2>
        <Filter changeFilter={this.changeFilter} />
        <ContactList
          contacts={this.filteredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;

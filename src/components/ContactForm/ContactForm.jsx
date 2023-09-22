import { Component } from 'react';
import './ContactForm.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  //при натисненні на кнопку add contact викликається ф-ція з app, яка додає новий контакт
  //і в ту ф-цію відправляється обьект з даними нового користувача
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createContact({
          id: `${this.state.name}_${this.state.number}`,
          name: this.state.name,
          number: this.state.number,
        });
      this.setState({ name: '', number: '' });
    }
    
  render() {
    return (
      <div>
        <form className="contactForm" onSubmit={this.handleSubmit}>
          <label>
            <p className="textLabel">Name</p>
            <input
              className="inputName"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
              value={this.state.name}
              
            />
          </label>

          <label>
            <p className="textLabel">Number</p>
            <input
              className="inputTel"
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
              value={this.state.number}
            />
          </label>

          <button className="btnAdContact" type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
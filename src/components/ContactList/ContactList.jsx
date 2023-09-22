import { Component } from 'react';
import './ContactList.css';

class ContactList extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.deleteContact(e.target.name);
  }

  render() {
    console.log(this.props);
    return (
      <div className="conteinerContactList">
        <ul className="contactList">
          {this.props.contacts.map(contact =>        
              (
                <li
                  key={`${contact.name}_${contact.number}`}
                  className="contactInfo"
                >
                  <p className="contactName">{contact.name}: </p>
                  <p className="contactPhone"> {contact.number}</p>
                  <button
                    className="btnContact"
                    name={contact.id}
                    onClick={this.handleSubmit}
                  >
                    Delete
                  </button>
                </li>
              )          
          
          )}
        </ul>
      </div>
    );
  }
}

export default ContactList;
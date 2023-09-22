import { Component } from 'react';
import './Filter.css';

class Filter extends Component {
  selectByValues = (e) => {
    this.props.changeFilter(e.target.value);
  }

  render() {
    return (
      <div className="containerFilter">
        <label>
          <p className="textLabel">Find contacts by name</p>
          <input
            className="inputTel"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.selectByValues}
          />
        </label>
      </div>
    );
  }
}

export default Filter;
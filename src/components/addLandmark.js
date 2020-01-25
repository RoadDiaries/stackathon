import React, { Component } from 'react';

class AddLandmark extends Component {
  state = {
    name: '',
    address: '',
    content: '',
    date: new Date(),
    picture: []
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onCreate(this.state);

    this.setState({
      name: '',
      address: '',
      content: '',
      date: new Date(),
      picture: []
    });
  };

  render() {
    const { name, address, content, date, picture } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="AddLandmark">
        <input
          type="text"
          name="name"
          placeholder="landmark"
          value={name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="address"
          value={address}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="content"
          value={content}
          onChange={this.handleChange}
        />
        <input
          type="date"
          name="date"
          value={date}
          onChange={this.handleChange}
        />
        <input
          type="file"
          name="pictures"
          value={picture}
          accept="image/png, image/jpeg"
          multiple={true}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Landmark" />
      </form>
    );
  }
}

export default AddLandmark;

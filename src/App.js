import React, { Component } from 'react';
import axios from 'axios';

import Table from './components/Table';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => this.setState({ users: res.data }))
      .catch(err => {
        throw err;
      });
  }

  renderUsername(value) {
    return (
      <div className="username">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="profile pic"/>
        {value}
      </div>
    );
  }

  renderAddress({ street, suite, city }) {
    return (
      <div>
        <div>{street}</div>
        <div>{`${suite} ${city}`}</div>
      </div>
    );
  }

  renderURL(value) {
    return <a href={`http://${value}`}>{value}</a>;
  }

  render() {
    const columns = [
      {
        key: 'name',
        title: 'Full Name'
      },
      {
        key: 'username',
        title: 'User Name',
        renderItem: this.renderUsername
      },
      {
        key: 'address',
        title: 'Address',
        renderItem: this.renderAddress
      },
      {
        key: 'website',
        title: 'URL',
        renderItem: this.renderURL
      }
    ];

    return (
      <div>
        <h1>React Challenge: Reusable Table</h1>
        <p>Author: Josue Comoto</p>
        <div className="table-container">
          <Table
            className="userlist"
            title="User list"
            columns={columns}
            data={this.state.users}
            placeholder="No users registered yet"
            keyExtractor={item => item.id}
          />
        </div>
      </div>
    );
  }
}

export default App;

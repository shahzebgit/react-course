import React, { Component } from "react";
import "./App.css";
import { CardList } from './components/card-list/card-list';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };


  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(Response => Response.json())
      .then(users => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filterdMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className="App">

        <h1>Monsters rolodex</h1>

        <SearchBox
          placeholder='search monsters'
          change={this.handleChange} />

        <CardList monsters={filterdMonsters} />

      </div>
    );
  }
}

export default App;

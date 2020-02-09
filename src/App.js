import React, { Component } from 'react';
// import { Search } from './Search.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Pages from './Pages';
import Navigation from './Navigation';

class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getName() {
    return this.firstname + ' ' + this.lastname;
  }
}

const helloWorld = 'Time to Start Reacting!';

const robin = new Developer('Robin', 'Thorn');
const george = new Developer('George', 'Takei');

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: 'Civilization VI',
    url: 'http://civilizationvi.com/',
    author: 'Angel M Mendoza',
    num_comments: 180,
    points: -9,
    objectID: 2
  }
];

function isSearched(searchTerm) {
  return function (item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

const Search = ({ value, onChange, children }) => 
  <form>
      {children} <input
          type="text"
          value={value}
          onChange={onChange}
      />
  </form>
const largeColumn = { width: '40%' };
const midColumn = { width: '30%' };
const smallColumn = { width: '10%' };
const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => 
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}> by {item.author},</span>
        <span style={smallColumn}> comments: {item.num_comments}</span>
        <span style={smallColumn}> score: {item.points} </span>
        <span style={smallColumn}>
          <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>


const Button = ({ 
  onClick, 
  className = '',
  children,
}) =>
  <button onClick={onClick} className={className} type="button">{children}</button>


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      helloWorld,
      robin,
      george,
      searchTerm: '',
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(function isNotId(item) {
      return item.objectID !== id;
    });
    this.setState({list: updatedList});
  }

  render () {

    const{ 
      searchTerm,
      list
    } = this.state;
    
    return (
      <div className="page">
        <BrowserRouter>
          <div>
            <Navigation />
              <Switch>
              <Route path="/pages" component={Pages} exact/>
            </Switch>
          </div> 
        </BrowserRouter>
        <h2>{this.state.helloWorld}</h2>
        <p>The world is so reactable!</p>
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search:
          </Search>
        </div>
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        <p>Hello my name is {this.state.robin.getName()}. I am a software developer.</p>
        <p>Ohayou, Boku wa {this.state.george.getName()} desu. Shigoto wa compyutaa desu.</p>
      </div>
    );
  }
}

export default App;

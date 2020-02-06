import React, { Component } from 'react';
import './App.css';

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
    url: 'http://civilizatonvi.com/',
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
      <div className="App">
        <h2>{this.state.helloWorld}</h2>
        <p>The world is so reactable!</p>

        <form>
          <input type="text" onChange={this.onSearchChange} />
        </form>

        {list.filter(isSearched(searchTerm)).map(item => 
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> by {item.author},</span>
            <span> comments: {item.num_comments}</span>
            <span> score: {item.points} </span>
            <span>
              <button onClick={() => this.onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </span>
          </div>
        )}
        <p>Hello my name is {this.state.robin.getName()}. I am a software developer.</p>
        <p>Ohayou, Boku wa {this.state.george.getName()} desu. Shigoto wa compyutaa desu.</p>
      </div>
    );
  }
}

export default App;

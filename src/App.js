import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    var initialList = "Drink Bourbon\nEat tacos\nGo to sleep";

    this.state = {
      progress: 'making-list',
      todoList: initialList,
      startListBtnDisabled: initialList === ''
    };

    this.handleTodoListChange = this.handleTodoListChange.bind(this);
    this.startToDoing = this.startToDoing.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.resetList = this.resetList.bind(this);
  }

  handleTodoListChange(event) {
    var updatedList = event.target.value;
    this.setState((state, props) => {
      return {
        ...state,
        todoList: updatedList,
        startListBtnDisabled: updatedList === ''
      }
    });
  }

  startToDoing(event) {
    console.log("Start ToDoing!!");
    this.setState((state, props) => {
      return {
        ...state,
        progress: 0
      }
    });
  }

  nextItem(event) {
    console.log("Start ToDoing!!");
    this.setState((state, props) => {
      return {
        ...state,
        progress: state.progress + 1
      }
    });
  }

  resetList(event) {
    console.log("Reset the list");
    this.setState((state, props) => {
      return {
        ...state,
        progress: 'making-list',
        todoList: '',
        startListBtnDisabled: true
      };
    });
  }

  renderMakingList(props) {
    return (
      <div id='todo-container'>
        <p className="App-intro">
          What things do you want to get done next?
        </p>
        <textarea
          id="todo-list"
          placeholder="e.g. Drink Bourbon"
          value={ props.todoList }
          onChange={ this.handleTodoListChange }
        />
        <button id="primary-btn" onClick={this.startToDoing} disabled={props.btnDisabled}>
          Let's Do This
        </button>
      </div>
    );
  }

  renderListItem(props) {
    var listItems = props.todoList.split("\n")

    if(props.todoItemIndex >= listItems.length) {
      return (
        <div id='todo-container'>
          <p className="App-intro">
            All Done!!
          </p>
          <button id="primary-btn" onClick={this.resetList}>
            New list
          </button>
        </div>
      );
    }
    else {
      return (
        <div id='todo-container'>
          <p className="App-intro">
            { props.todoList.split("\n")[props.todoItemIndex] }
          </p>
          <button id="primary-btn" onClick={this.nextItem}>
            Next!
          </button>
        </div>
      );
    }
  }

  render() {
    var listSection = null;
    if(this.state.progress === 'making-list') {
      listSection =
        this.renderMakingList({
          todoList: this.state.todoList,
          btnDisabled: this.state.startListBtnDisabled
        });
    }
    else {
      listSection = this.renderListItem({todoItemIndex: this.state.progress, todoList: this.state.todoList});
    };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Do This Next</h2>
        </div>
        { listSection }
      </div>
    );
  }
}

export default App;

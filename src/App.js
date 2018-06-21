import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      question: '',
      answer: ''
    };

    this.onAddTask = this.onAddTask.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/tasks')
      .then(response => this.setState({ tasks: response.data }));
  }

  onAddTask() {
    const { question, answer } = this.state;

    axios
      .post('/api/tasks', {
        question,
        answer
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <br />

        <div>
          <div>
            <span>Question</span>
            &nbsp;
            <span>Answer</span>
          </div>

          {
            this.state.tasks && this.state.tasks.length &&
            this.state.tasks.map(({ _id, question, answer }) =>
              <div key={_id}>
                <span>{question}</span>
                &nbsp;
                <span>{answer}</span>
              </div>
            )
          }

          <br />

          <div>
            <div>
              <label>
                <span>Question: </span>
                <input type='text'
                       value={this.state.question}
                       onChange={e => this.setState({ question: e.target.value })}
                />
              </label>
            </div>

            <div>
              <label>
                <span>Answer: </span>
                <input type='text'
                       value={this.state.answer}
                       onChange={e => this.setState({ answer: e.target.value })}
                />
              </label>
            </div>

            <button onClick={this.onAddTask}>
              Add task
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

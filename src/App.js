import React, { Component } from 'react';
import './App.css';
import * as jsPDF from 'jspdf'


class App extends Component {
  constructor(){
    super();
    this.newTodoChanged = this.newTodoChanged.bind(this);
    //this.toggleTodoDone = this.toggleTodoDone.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
    this.state = {
      message: "I 👅 to eat ass 🙊",
      newTodo: "",
      todos: []      
    }
  }

  toggleTodoDone(event, index){
    const todos = [...this.state.todos];
    todos[index].done = event.target.checked;
    this.setState(
      {
        todos
      }
    )
  }

  newTodoChanged(event){
    this.setState({
      newTodo: event.target.value,
      
    });
  }

  formSubmitted(event){
    event.preventDefault();
    this.setState({
      newTodo: 'Added!',
      todos: [...this.state.todos, {
        title: this.state.newTodo,
        done: false
      }
    ]
  });
  console.log(this.state.todos);
  }

  removeTodo(event, index){
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState(
      {
        todos
      }
    )

  }

  generatePDF(){
    var doc = new jsPDF();
    const todos = this.state.todos;
    for(let i = 0; i < todos.length; i++){
      doc.text(todos[i].title, 10, 10*(i+1));
    }
    doc.save('to-ass.pdf');
  }


  render() {
    return (
      <div className="App">
        <h2>{this.state.message}</h2>
        <form onSubmit = {this.formSubmitted}>
          <label htmlFor = "newTodo">Add that 🔥 ass</label>
          <input  onChange={this.newTodoChanged} id = "newTodo" name = "newTodo" value = {this.state.newTodo}/>
          <button type = "submit">Spank it👌😈</button>
        </form>
        <ul>
          {this.state.todos.map((todo, index) => {
            return <li key={todo.title}>
            <input type="checkbox" onChange={(event) => this.toggleTodoDone(event, index)}/>
            <span style={
              {textDecoration: todo.done ? 'line-through' : 'inherit'}
              }>{todo.title}</span>
            <button onClick={(event) => this.removeTodo(event, index)}>Finna done it! 🎉</button>
            </li>
          })}
        </ul>
        <button onClick={this.generatePDF.bind(this)}>Generate PDF</button>
      </div>
    );
  }
}

export default App;

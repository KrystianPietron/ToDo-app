import React, { Component } from 'react'
import Button from './Elements/Button'
import Input from './Elements/Input'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

const style = {
  paper: {
    margin: 20,
    padding: 50
  },
  checkbox: {
    marginBottom: 16,
    marginTop: 10
  },
}


const API_URL = 'https://poniedzialek-60723.firebaseio.com'
class App extends Component {
  state = {
    tasks: [],
    taskName: "",
    completed: null,
  }

  componentWillMount() {
    this.loadData()
  }

  loadData() {
    fetch(`${API_URL}/firebasecw.json`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          this.setState({tasks: []})
          return;
        }
        const array = Object.entries(data)
        const tasksList = array.map(([id, values]) => {
          values.id = id
          return values
        })
        this.setState({ tasks: tasksList })
      })
  }

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }

  addTask = (event) => {
    let tasks = this.state.tasks
    const newTask = { taskName: this.state.taskName, completed: false }
    fetch(`${API_URL}/firebasecw.json`, {
      method: "POST",
      body: JSON.stringify(newTask)
    }).then(response => response.json())
      .then(data => {
        newTask.id = data.name
        tasks.push(newTask)
        this.setState({ tasks, taskName: "" })
      }
      )
  }

  handleClick = () => {
    this.addTask()
  }

  isCompleted = (task) => {
    fetch(`${API_URL}/firebasecw/${task.id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ completed: !task.completed })
    }).then(() => { this.loadData() })
  }

  taskIsCompleted(id) {
    let completed = this.state.tasks
    completed.map((task) => {
      if (task.id === id) {
        if (task.completed === true) {
          return true
        } else { return false }
      }
    }
    )
  }

  taskRemove = (id) => {
    fetch(`${API_URL}/firebasecw/${id}.json`, {
      method: 'DELETE'
    })
      .then(() => { this.loadData() })
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleClick()
    }
  }
  render() {
    return (
      <div>
        <Paper style={style.paper}>
          <div>
            <Input
              label='Task'
              hintText="Task Name"
              fullWidth={false}
              value={this.state.taskName}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
            <Button
              primary={true}
              label='Dodaj'
              onClick={this.handleClick}
            />
          </div>
          <List>
            {this.state.tasks.map(
              (task) =>
                <ListItem
                  key={task.id}
                  primaryText={task.taskName}
                  rightIconButton={
                    <span>
                      <IconButton>
                        <DeleteIcon
                          onClick={() => this.taskRemove(task.id)}
                        />
                      </IconButton>
                      <IconButton>
                        <Checkbox
                          defaultChecked={task.completed}
                          label="Completed?"
                          style={style.checkbox}
                          onCheck={() => this.isCompleted(task)}
                        />
                      </IconButton>
                    </span>
                  }
                />)}
          </List>
        </Paper>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Button from './Elements/Button'
import Input from './Elements/Input'
import Paper from 'material-ui/Paper'

const style = {
  paper: {
    margin: 20,
    padding: 50
  }
}

class App extends Component {
  state = {
    tasks: [],
    taskName: ""
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

            />
            <Button
              primary={true}
              label='Dodaj'
              onClick={() => { }}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;

import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect, useDispatch } from 'react-redux';
// import { completeItem, removeItem, addItem } from './states/store';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Button, TextField, Typography } from "@material-ui/core";
import { addTodos, updateTodos } from "./states/reducers/index";
import TodoList from './components/todo_list';


const useStyles = makeStyles(({
  container: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '50px auto 0px',
    flexDirection: 'column'
  },
  formTodo: {
    width: '500px'
  },
  taskInput: {
    display: 'flex',
    width: '100%',
    borderBottom: '1px dashed #CCC',
    paddingBottom: 10,
    height: 67,
  },
  addTask: {
    background: '#000',
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 10px',
    whiteSpace: 'nowrap',
    margin: '15px 0 0 20px',
  },
  label: {
    width: '80%'
  }
}))

function App({ theme, ...props }) {
  console.log(props, '<<<props')
  const c = useStyles()
  const noteRef = useRef({});
  const [stateInput, setStateInput] = useState("")
  const [stateTodos, setStateTodos] = useState([])
  const preventSubmit = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (stateInput === "") {
      alert("Input can't be empty")
    } else {
      const newTodos = [...stateTodos, { title: stateInput, isComplete: false, isEditing: false }]
      setStateTodos(newTodos);
      console.log(newTodos, '<<<ne')
      setStateInput('')
      inputRef.current.focus();
    }
  }


  const saveTodo = (index) => {
    const newTodos = [...stateTodos];
    newTodos[index].isEditing = !newTodos[index].isEditing;
    newTodos[index].title = noteRef.current[index].value;
    setStateTodos(newTodos);
  }

  const editTodo = index => {
    const newTodos = [...stateTodos];
    console.log(newTodos, '<<<newTodos')
    newTodos[index].isEditing = !newTodos[index]?.isEditing;
    setStateTodos(newTodos);
  }

  
  const completeTodo = index => {
    const newTodos = [...stateTodos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setStateTodos(newTodos);
};

  const clearInput = () => {
    setStateInput('');
  }
  const inputRef = useRef()

  const deleteTodo = index => {
    const newArr = [...stateTodos]
    newArr.splice(index, 1)
    setStateTodos(newArr)
}

  // const updateTodo = inx => {
  //   // const newTodos = [...props?.todos];
  //   // newTodos[inx].isEditing = !newTodos[inx].isEditing;
  //   // setStateTodos(newTodos);
  //   const newTodos = [...props?.todos];
  //   const id = newTodos?.find((e) => e?.id === inx)
  //   if (id){  
  //     props.editTodo({id: id, isEditing: true })
  //     // set
  //   }
  //   // newTodos[inx].isEditing = !newTodos[inx].isEditing
  //   // console.log(newTodos[inx].isEditing = !newTodos[inx]?.isEditing)
  // }
  return (
    <div className={c.container}>
      <form onSubmit={handleSubmit} className={c.formTodo}>
        <ThemeProvider theme={props.theme}>
          <div className={c.taskInput}>
            <FormControl className={c.label}>
              <TextField
                id="outlined-basic"
                label="Input tast here"
                value={stateInput}
                variant="outlined"
                onChange={(e) => setStateInput(e.target.value)}
                onFocus={clearInput}
                ref={inputRef}
                aria-describedby="component-error-text"
                onKeyPress={preventSubmit}
              />
            </FormControl>
            <Button
              type='submit'
              alt={'add-task'}
              className={c.addTask}
              onKeyPress={preventSubmit}
            >
              <Typography>ADD Me</Typography>
            </Button>
          </div>
        </ThemeProvider>
        <TodoList
          theme={theme}
          todos={stateTodos}
          editTodo={editTodo}
          preventSubmit={preventSubmit}
          noteRef={noteRef}
          saveTodo={saveTodo}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      </form>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return { todos: state }
// }

// const mapDispatcherstoProps = dispatch => {
//   return {
//     addTodo: (title) => dispatch(addTodos(title)),
//   }
// }

// export default connect(mapStateToProps, mapDispatcherstoProps)(App);
export default App
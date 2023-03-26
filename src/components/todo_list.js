import React, { Fragment, useState } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { addTodos, completeTodos, removeTodos, updateTodos } from '../states/reducers';

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};


const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 0
  },
  li: {
    borderBottom: '1px dashed black'
  }
}));

const TodoList = ({ theme, todos, completeTodo, updateTodo, deleteTodo, saveTodo, noteRef, preventSubmit, editTodo, ...props }) => {
  const c = useStyles()
  const [stateChecked, setStateChecked] = useState([0])

  const handleToggle = (value, index) => () => {
    const currentIndex = stateChecked.indexOf(value);
    const newChecked = [...stateChecked];

    if (currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }
    setStateChecked(newChecked);
    completeTodo(index);
};

  return (
    <ThemeProvider theme={props.theme}>
      <List className={c.root}>
        {
          todos?.map((todo, index) => {
            console.log(todo, '<<<todoList')
            const labelId = `list-todo-${todo}`
            return (
              <ListItem
                key={`todo-${index}`}
                role={undefined}
                dense
                button
                className={c.li}
              >
                <ListItemIcon>
                  <Checkbox
                    color="primary"
                    edge="start"
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    checked={stateChecked.indexOf(todo) !== -1}
                    tabIndex={-1}
                    onClick={handleToggle(todo, index)}
                    onKeyPress={props.preventSubmit}
                  />
                </ListItemIcon>
                {
                  (!todo?.isEditing) ?
                    <Fragment>
                      <ListItemText
                        id={labelId}
                        primary={`${todo?.title}`}
                        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
                      />
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => editTodo(index)}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemIcon>
                    </Fragment>
                    :
                    <Fragment>
                      <label
                        htmlFor="task"
                        className="visuallyhidden"
                      >
                        {todo?.title}
                      </label>
                      <input
                        className="form__edit-input"
                        defaultValue={todo.title}
                        ref={(element) => noteRef.current[index] = element}
                        onKeyPress={preventSubmit}
                        id="task"
                      />
                      <ListItemIcon>
                        <IconButton onClick={() => saveTodo(index)} edge="end" aria-label="delete">
                          <BookmarkIcon />
                        </IconButton>
                      </ListItemIcon>
                    </Fragment>

                }
                <ListItemSecondaryAction>
                  <IconButton onClick={() => deleteTodo(index)} edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        }
      </List>
    </ThemeProvider>
  )
}



export default TodoList
// export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import CheckBox from 'react-native-checkbox'

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:[],
      currentTodoDesc:'',
      editing:false,
      filterCompleted:false,
    };
    this.addTodo = this.addTodo.bind(this);
    this.updateCurrentTodoDesc = this.updateCurrentTodoDesc.bind(this);
    this.toggleTodoState = this.toggleTodoState.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }
  allTodos(){
    let {todos,filterCompleted} = this.state;
    let allTodos = todos.map((e) => {
      if (filterCompleted) {
        if(!e.complete){
          return <ToDoItem key={e.key} completeTodoFunc={this.toggleTodoState} todo={e} editingState={this.state.editing} deleteTodoFunc={this.deleteTodo} updateTodoFunc={this.updateTodo}/>
        }
      }
      else {
        return <ToDoItem key={e.key} completeTodoFunc={this.toggleTodoState} todo={e} editingState={this.state.editing} deleteTodoFunc={this.deleteTodo} updateTodoFunc={this.updateTodo}/>
      }
    });
    return allTodos
  }
  updateCurrentTodoDesc(text){
    this.setState({currentTodoDesc:text})
  }
  addTodo(){
    let {todos, currentTodoDesc} = this.state;
    let todosArray = todos;
    let todosCount = todos.length;
    let newKey
    if (todosCount > 0) {
      newKey = todos[todosCount-1].key + 1
    } else {
      newKey = 0
    }
    let newTodo = {
      key:newKey,
      desc:currentTodoDesc,
      complete:false,
    };
    todosArray.push(newTodo);
    this.setState({
      todos:todosArray,
      currentTodoDesc:''
    });
  }
  toggleTodoState(val,key){
    let {todos} = this.state;
    let todoIndex = todos.findIndex((e) => {
      return e.key === key
    });
    todos[todoIndex].complete = !val
    this.setState({todos})
  }
  deleteTodo(key){
    let {todos} = this.state;
    let todoIndex = todos.findIndex((e) => {
      return e.key === key
    });
    todos.splice(todoIndex,1);
    this.setState({todos});
  }
  updateTodo(text,key){
    let {todos} = this.state;
    todos[key].desc=text;
    this.setState({todos})
  }
  toggleEditState(){
    let {editing} = this.state;
    this.setState({editing:!editing});
  }
  applyFilter(){
    let {filterCompleted} = this.state;
    this.setState({filterCompleted:!filterCompleted});
  }
  filterText(){
    let {filterCompleted} = this.state;
    if (filterCompleted) {
      return 'Show All';
    } else {
      return 'Hide Completed';
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
            Money Pool's Todo List
            </Text>
          </View>
          <ToDoInput currentTodo={this.state.currentTodoDesc} addTodoFunc={this.addTodo} updateCurrentTodoDescFunc={this.updateCurrentTodoDesc}/>
          <TouchableHighlight style={styles.editingContainer} onPress={() => this.toggleEditState()} underlayColor='#90caf9'>
          <Text style={styles.editingText}>
          Delete Items
          </Text>
          </TouchableHighlight>
          <ScrollView>
              {this.allTodos()}
          </ScrollView>
        </View>
        <TouchableHighlight style={styles.filterContainer} onPress={() => this.applyFilter()} underlayColor='#90caf9'>
        <Text style={styles.filterText}>
          {this.filterText()}
        </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export  class ToDoInput extends Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Add new item' placeholderTextColor='#b3e5fc' value={this.props.currentTodo} onChangeText={(text) => this.props.updateCurrentTodoDescFunc(text)} onSubmitEditing={() => this.props.addTodoFunc()}/>
      </View>
    );
  }
}

export  class ToDoItem extends Component {

  render() {
    const isEditing = this.props.editingState;
    let button = null;
    if(isEditing){
      button = <TouchableHighlight style={styles.deleteButton}  onPress={() => this.props.deleteTodoFunc(this.props.todo.key)}>
                  <Text style={styles.deleteButtonText}>
                    delete
                  </Text>
               </TouchableHighlight>
    }
    return (
      <View style={styles.todoContainer}>
        <CheckBox style={styles.checkBox} label='' checked={this.props.todo.complete} onChange={(checked) => this.props.completeTodoFunc(checked,this.props.todo.key)}/>
        <TextInput style={styles.todoItem} value={this.props.todo.desc}  onChangeText={(text) => this.props.updateTodoFunc(text,this.props.todo.key)} placeholderTextColor='#b3e5fc'/>
        {button}
      </View>
    );
  }
}

let {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  upperContainer:{
    flex:1,
  },
  titleContainer:{
    height:100,
    width:width,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'#cfd8dc'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  inputContainer: {
    height:50,
    padding:10,
    flexDirection:'row',
    justifyContent:'center'
  },
  input:{
    flex:4,
    fontSize:16,
    color:'#03a9f4'
  },
  addButton:{
    flex:1,

  },
  todoContainer:{
    flexDirection:'row',
    height:30,
    justifyContent:'center',
    width:width,
    paddingLeft:20,
    paddingRight:10,
    marginTop:5
  },
  checkBox:{
    flex:1,
  },
  todoItem:{
    flex:9,
    fontSize:14
  },
  editingContainer:{
    width:width,
    height:30,
    alignItems:'flex-end',
    justifyContent:'center',
    padding:10
  },
  editingText:{
    fontSize:12,
    color:'blue'
  },
  deleteButton:{
    flex:2,
    alignItems:'center',
    justifyContent:'center'
  },
  deleteButtonText:{
    fontSize:10,
    color:'#e57373'
  },
  todoList:{
    height:100,
    width:width,
  },
  filterContainer:{
    height:50,
    width:width,
    justifyContent:'center',
    alignItems:'center',
  },
  filterText:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight:'600',
    color:'#fbc02d',
  }
});

AppRegistry.registerComponent('ToDoList', () => ToDoList);

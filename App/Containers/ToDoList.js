import React, { Component } from 'react'
import {
  View
} from 'react-native'
import Header from '../Components/Header'
import CustomList from '../Components/CustomList'
import Styles from './Styles/ToDoListStyle'

export default class ToDoList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newTask: ''
    }
  }

  render () {
    return (
      <View style={Styles.mainContainer} >
        <Header />
        <CustomList />
      </View>
    )
  }
}

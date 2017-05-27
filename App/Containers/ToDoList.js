import React, { Component } from 'react'
import {
  View
} from 'react-native'
import Header from '../Components/Header'
import CustomList from '../Components/CustomList'
import Styles from './Styles/ToDoListStyle'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'

class ToDoList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newTask: ''
    }
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
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

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(ToDoList)

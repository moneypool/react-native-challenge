import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import { filter } from 'ramda'
import PillButton from '../Components/PillButton'
import Styles from './Styles/HeaderStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ToDosActions from '../Redux/ToDosRedux'

export class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    addTask: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      selectedFilter: 'All',
      addMode: false,
      newTask: '',
      pendingLength: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    // Get data from Redux
    const { tasks } = nextProps
    // Get pending tasks length
    const pendingLength = tasks ? filter(n => !n.completed, tasks).length : 0

    // Update dataSource with completely processed data
    this.setState({ pendingLength })
  }

  _onToggleAdd = () => {
    const { addMode } = this.state
    // If buttons are shown, animate in the input. Else animate in the buttons
    if (!addMode) {
      this.refs.buttonsContainer.fadeOut(300)
        .then(endState => {
          if (endState.finished) {
            // When new state is set, animate in the new container
            this.setState({ addMode: true, newTask: '' }, () => {
              this.refs.inputContainer.fadeIn(300)
            })
          }
        })
    } else {
      this.refs.inputContainer.fadeOut(300)
        .then(endState => {
          if (endState.finished) {
            // When new state is set, animate in the new container
            this.setState({ addMode: false, newTask: '' }, () => {
              this.refs.buttonsContainer.fadeIn(300)
            })
          }
        })
    }
  }

  _handleChangeTask = (newTask) => this.setState({ newTask })
  _handlePressAdd = () => {
    const { newTask } = this.state
    this.props.addTask(newTask)
    this.refs.inputContainer.fadeOut(300)
      .then(endState => {
        if (endState.finished) {
          // When new state is set, animate in the new container
          this.setState({ addMode: false, newTask: '' }, () => {
            this.refs.buttonsContainer.fadeIn(300)
          })
        }
      })
  }

  _onPressFilterAll = () => {
    this.props.changeFilter('All')
    this.setState({ selectedFilter: 'All' })
  }
  _onPressFilterCompleted = () => {
    this.props.changeFilter('Completed')
    this.setState({ selectedFilter: 'Completed' })
  }
  _onPressFilterPending = () => {
    this.props.changeFilter('Pending')
    this.setState({ selectedFilter: 'Pending' })
  }

  _renderFiltersOrAdd () {
    const { addMode, selectedFilter, newTask, pendingLength } = this.state
    if (addMode) {
      return (
        <Animatable.View
          ref='inputContainer'>
          <View style={Styles.addInput}>
            <TextInput
              style={Styles.addInputText}
              value={newTask}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              onChangeText={this._handleChangeTask}
              underlineColorAndroid='transparent'
              onSubmitEditing={this._handlePressAdd}
              placeholder='Type to add new tasks' />
          </View>
          <TouchableWithoutFeedback onPress={this._handlePressAdd}>
            <Icon style={Styles.addSubmit} name='check-circle' />
          </TouchableWithoutFeedback>
        </Animatable.View>
      )
    } else {
      return (
        <Animatable.View
          style={Styles.filters}
          ref='buttonsContainer'>
          <PillButton
            text={'All'}
            onPress={this._onPressFilterAll}
            isActive={selectedFilter === 'All'} />
          <PillButton
            text={'Completed'}
            onPress={this._onPressFilterCompleted}
            isActive={selectedFilter === 'Completed'} />
          <PillButton
            text={`Pending - ${pendingLength}`}
            onPress={this._onPressFilterPending}
            isActive={selectedFilter === 'Pending'} />
        </Animatable.View>
      )
    }
  }

  render () {
    const { addMode } = this.state
    const addIcon = !addMode ? 'add' : 'close'
    return (
      <View style={Styles.navBar}>
        <Text style={[Styles.title, Styles.centered]}>myTODOS</Text>
        <TouchableWithoutFeedback onPress={this._onToggleAdd}>
          <Icon style={Styles.add} name={addIcon} />
        </TouchableWithoutFeedback>

        {this._renderFiltersOrAdd()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.todos.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: task => dispatch(ToDosActions.addTask(task)),
    changeFilter: filterBy => dispatch(ToDosActions.changeFilter(filterBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

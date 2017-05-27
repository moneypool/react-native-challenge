import React from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native'
import PillButton from '../Components/PillButton'
import Styles from './Styles/HeaderStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedFilter: 'All',
      addMode: false,
      newTask: ''
    }
  }

  _onPressAdd = () => this.setState({ addMode: !this.state.addMode, newTask: '' })

  _handleChangeTask = (newTask) => this.setState({ newTask })
  _handlePressAdd = () => console.log('added')

  _onPressFilterAll = () => this.setState({ selectedFilter: 'All' })
  _onPressFilterCompleted = () => this.setState({ selectedFilter: 'Completed' })
  _onPressFilterPending = () => this.setState({ selectedFilter: 'Pending' })

  _renderFiltersOrAdd () {
    const { addMode, selectedFilter, newTask } = this.state
    const editable = true
    if (addMode) {
      return (
        <View>
          <View style={Styles.addInput}>
            <TextInput
              style={Styles.addInputText}
              value={newTask}
              editable={editable}
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
        </View>
      )
    } else {
      return (
        <View style={Styles.filters}>
          <PillButton
            text={'All'}
            onPress={this._onPressFilterAll}
            isActive={selectedFilter === 'All'} />
          <PillButton
            text={'Completed'}
            onPress={this._onPressFilterCompleted}
            isActive={selectedFilter === 'Completed'} />
          <PillButton
            text={'Pending'}
            onPress={this._onPressFilterPending}
            isActive={selectedFilter === 'Pending'} />
        </View>
      )
    }
  }

  render () {
    const { addMode } = this.state
    const addIcon = !addMode ? 'add' : 'close'
    return (
      <View style={Styles.navBar}>
        <Text style={[Styles.title, Styles.centered]}>myTODOS</Text>
        <TouchableWithoutFeedback onPress={this._onPressAdd}>
          <Icon style={Styles.add} name={addIcon} />
        </TouchableWithoutFeedback>

        {this._renderFiltersOrAdd()}
      </View>
    )
  }
}

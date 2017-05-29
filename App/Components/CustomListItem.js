import React, { PropTypes } from 'react'
import {
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import Swipeout from 'react-native-swipeout'
import CheckBox from 'react-native-checkbox'
import Styles from './Styles/CustomListItemStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../Themes/Colors'
import ToDosActions from '../Redux/ToDosRedux'

export class CustomListItem extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    taskInfo: PropTypes.shape({
      index: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      favorite: PropTypes.bool
    }).isRequired,
    toggleCompletedTask: PropTypes.func.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    const { title = '' } = this.props

    this.state = {
      editMode: false,
      editText: title
    }
  }

  _onToggleCheckbox (index) {
    this.props.toggleCompletedTask(index)
  }

  _deleteTask (index) {
    this.props.removeTask(index)
  }

  _addFavorite (index) {
    this.props.toggleFavorite(index)
  }

  _toggleEdit () {
    this.setState({ editMode: !this.state.editMode })
  }

  _handleEditTask = (editText) => this.setState({ editText })

  _handlePressEdit = () => {
    const { editText, editMode } = this.state
    const { index } = this.props.taskInfo
    this.props.editTask(editText, index)
    this.setState({ editMode: !editMode })
  }

  _renderFavorite (favorite) {
    if (favorite) {
      return (
        <Icon style={Styles.favorite} name='star' />
      )
    } else return null
  }

  _renderEditOrCheckbox () {
    const { editMode, editText } = this.state
    const { index = 0, title = '', completed = true, favorite = true } = this.props.taskInfo || {}
    const swipeBtns = [
      {
        text: 'Favorite',
        backgroundColor: 'gold',
        underlayColor: 'gold',
        onPress: () => this._addFavorite(index)
      },
      {
        text: 'Edit',
        backgroundColor: 'blue',
        underlayColor: 'blue',
        onPress: () => this._toggleEdit()
      },
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: Colors.error,
        onPress: () => this._deleteTask(index)
      }
    ]
    // When edit mode is off, the normal cell is rendered, with the checkbox
    if (!editMode) {
      return (
        <Swipeout
          right={swipeBtns}
          autoClose
          backgroundColor='transparent'>
          <View>
            <CheckBox
              label={title}
              checked={completed}
              onChange={() => this._onToggleCheckbox(index)}
              containerStyle={Styles.listCheckboxContainer}
              checkboxStyle={Styles.listCheckbox}
              labelStyle={Styles.listText}
            />
            {this._renderFavorite(favorite)}
          </View>
        </Swipeout>
      )
    } else {
      // Edit mode is on, so render input
      return (
        <View>
          <View style={Styles.editInput}>
            <TextInput
              style={Styles.editInputText}
              value={editText}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              onChangeText={this._handleEditTask}
              underlineColorAndroid='transparent'
              onSubmitEditing={this._handlePressEdit}
              placeholder='Type to edit task' />
          </View>
          {/* Submit edit button */}
          <TouchableWithoutFeedback onPress={this._handlePressEdit}>
            <Icon style={[Styles.editButtons, Styles.editSubmit]} name='check-circle' />
          </TouchableWithoutFeedback>
          {/* Cancel edit button */}
          <TouchableWithoutFeedback onPress={() => this._toggleEdit()}>
            <Icon style={[Styles.editButtons, Styles.editClose]} name='close' />
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={Styles.listContainer}>
        {this._renderEditOrCheckbox()}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCompletedTask: index => dispatch(ToDosActions.toggleCompletedTask(index)),
    removeTask: index => dispatch(ToDosActions.removeTask(index)),
    toggleFavorite: index => dispatch(ToDosActions.toggleFavorite(index)),
    editTask: (task, index) => dispatch(ToDosActions.editTask(task, index))
  }
}

export default connect(null, mapDispatchToProps)(CustomListItem)

import React, { PropTypes } from 'react'
import {
  View
} from 'react-native'
import { connect } from 'react-redux'
import Swipeout from 'react-native-swipeout'
import CheckBox from 'react-native-checkbox'
import Styles from './Styles/CustomListStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../Themes/Colors'
import ToDosActions from '../Redux/ToDosRedux'

class CustomListItem extends React.Component {
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

  _onToggleCheckbox (index) {
    this.props.toggleCompletedTask(index)
  }

  _deleteTask (index) {
    this.props.removeTask(index)
  }

  _addFavorite (index) {
    this.props.toggleFavorite(index)
  }

  _renderFavorite (favorite) {
    if (favorite) {
      return (
        <Icon style={Styles.favorite} name='star' />
      )
    } else return null
  }

  render () {
    const swipeBtns = [
      {
        text: 'Favorite',
        backgroundColor: 'gold',
        underlayColor: 'gold',
        onPress: () => { this._addFavorite(index) }
      },
      {
        text: 'Edit',
        backgroundColor: 'blue',
        underlayColor: 'blue',
        //onPress: () => { this._edit(rowData) }
      },
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: Colors.error,
        onPress: () => { this._deleteTask(index) }
      }]
    const { index, title, completed, favorite } = this.props.taskInfo
    return (
      <Swipeout
        right={swipeBtns}
        autoClose
        backgroundColor='transparent'>
        <View style={Styles.listContainer}>
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
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.todos.tasks,
    filterBy: state.todos.filterBy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCompletedTask: (index) => dispatch(ToDosActions.toggleCompletedTask(index)),
    removeTask: (index) => dispatch(ToDosActions.removeTask(index)),
    toggleFavorite: (index) => dispatch(ToDosActions.toggleFavorite(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem)

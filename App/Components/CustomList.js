import React, { PropTypes } from 'react'
import {
  ScrollView,
  RefreshControl,
  ListView,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { filter, sort, toLower } from 'ramda'
import Swipeout from 'react-native-swipeout'
import CheckBox from 'react-native-checkbox'
import Styles from './Styles/CustomListStyles'
import Colors from '../Themes/Colors'
import ToDosActions from '../Redux/ToDosRedux'

class CustomList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    tasks: PropTypes.array,
    filterBy: PropTypes.string,
    toggleCompletedTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    // This could be faster, but checkbox crashes
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentWillReceiveProps (nextProps) {
    // Get data from Redux
    const { tasks, filterBy } = nextProps
    // Get dataSource for ListView
    const { dataSource } = this.state
    // Sort data in descending order by title
    let filteredTasks = sort((a, b) => toLower(a.title) > toLower(b.title), tasks)
    // Apply filters if necessary
    if (filterBy === 'Completed') filteredTasks = filter(n => n.completed, filteredTasks)
    if (filterBy === 'Pending') filteredTasks = filter(n => !n.completed, filteredTasks)

    // Update dataSource with completely processed data
    this.setState({dataSource: dataSource.cloneWithRows(filteredTasks)})
  }

  _onClick (rowData) {
    this.props.toggleCompletedTask(rowData.index)
  }

  _deleteTask (rowData) {
    this.props.removeTask(rowData.index)
  }

  _renderRow (rowData) {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: Colors.error,
      onPress: () => { this._deleteTask(rowData) }
    }]
    return (
      <Swipeout
        right={swipeBtns}
        autoClose
        backgroundColor='transparent'>
        <View style={Styles.listContainer}>
          <CheckBox
            label={rowData.title}
            checked={rowData.completed}
            onChange={() => this._onClick(rowData)}
            containerStyle={Styles.listCheckboxContainer}
            checkboxStyle={Styles.listCheckbox}
            labelStyle={Styles.listText}
          />
        </View>
      </Swipeout>
    )
  }

  render () {
    const { dataSource } = this.state
    const searching = false
    return (
      <ScrollView style={Styles.container}>
        <ListView
          enableEmptySections
          automaticallyAdjustContentInsets={false}
          dataSource={dataSource}
          renderRow={row => this._renderRow(row)}
          refreshControl={
            <RefreshControl
              refreshing={searching}
            />
          }
        />
      </ScrollView>
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
    resetTasks: () => dispatch(ToDosActions.resetTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomList)

import React, { PropTypes } from 'react'
import {
  ScrollView,
  RefreshControl,
  ListView,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { filter } from 'ramda'
import Swipeout from 'react-native-swipeout'
import CheckBox from 'react-native-check-box'
import Styles from './Styles/CustomListStyles'
import Colors from '../Themes/Colors'
import ToDosActions from '../Redux/ToDosRedux'

const rawData = [
  {
    title: 'Drink water',
    completed: false
  },
  {
    title: 'Go to the gym',
    completed: true
  },
  {
    title: 'Do homework',
    completed: false
  },
  {
    title: 'Watch TV',
    completed: true
  }
]

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

    const rowHasChanged = (r1, r2) => r1.index !== r2.index
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentWillReceiveProps (nextProps) {
    const { tasks, filterBy } = nextProps
    console.log(tasks)
    const { dataSource } = this.state
    let filteredTasks = tasks
    if (filterBy === 'Completed') filteredTasks = filter(n => n.completed, filteredTasks)
    if (filterBy === 'Pending') filteredTasks = filter(n => !n.completed, filteredTasks)
    console.log('filter', filteredTasks)
    this.setState({dataSource: dataSource.cloneWithRows(filteredTasks)})
  }

  _onClick (rowData) {
    console.log('clicked', rowData)
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
    console.log('render', rowData)
    return (
      <Swipeout
        right={swipeBtns}
        autoClose
        backgroundColor='transparent'>
        <View style={Styles.listContainer}>
          <CheckBox
            style={Styles.listCheckbox}
            isChecked={rowData.completed}
            onClick={() => this._onClick(rowData)}
            rightText={rowData.title}
            rightTextStyle={Styles.listText}
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
    filterBy: state.todos.filterBy,
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

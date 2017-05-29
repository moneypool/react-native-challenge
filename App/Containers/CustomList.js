import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  ListView,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import CustomListItem from '../Components/CustomListItem'
import { filter, sort, toLower } from 'ramda'
import Styles from './Styles/CustomListStyles'
import ToDosActions from '../Redux/ToDosRedux'

export class CustomList extends React.Component {
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

  _renderRow (rowData) {
    return (
      <CustomListItem taskInfo={rowData} />
    )
  }

  _renderResults () {
    const { dataSource } = this.state
    const { tasks } = this.props
    if (tasks && tasks.length) {
      return (
        <ListView
          enableEmptySections
          automaticallyAdjustContentInsets={false}
          dataSource={dataSource}
          renderRow={row => this._renderRow(row)}
        />
      )
    } else {
      return (
        <View>
          <Text style={Styles.noResults}>No tasks yet :(</Text>
          <Text style={Styles.noResults}>Let's add something fun</Text>
        </View>
      )
    }
  }

  render () {
    return (
      <ScrollView style={Styles.container}>
        {this._renderResults()}
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
    toggleCompletedTask: index => dispatch(ToDosActions.toggleCompletedTask(index)),
    removeTask: index => dispatch(ToDosActions.removeTask(index)),
    resetTasks: () => dispatch(ToDosActions.resetTasks()),
    toggleFavorite: index => dispatch(ToDosActions.toggleFavorite(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomList)

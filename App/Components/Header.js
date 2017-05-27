import React from 'react'
import {
  View,
  Text
} from 'react-native'
import PillButton from '../Components/PillButton'
import Styles from './Styles/HeaderStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedFilter: 'All'
    }
  }

  _onPressFilterAll = () => this.setState({ selectedFilter: 'All' })
  _onPressFilterCompleted = () => this.setState({ selectedFilter: 'Completed' })
  _onPressFilterPending = () => this.setState({ selectedFilter: 'Pending' })

  render () {
    const { selectedFilter } = this.state
    console.log(selectedFilter)
    return (
      <View style={Styles.navBar}>
        <Text style={[Styles.title, Styles.centered]}>myTODOS</Text>
        <Icon style={Styles.add} name='add' />
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
      </View>
    )
  }
}

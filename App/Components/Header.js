import React from 'react'
import {
  View,
  Text
} from 'react-native'
import Styles from './Styles/HeaderStyles'

export default class Header extends React.Component {
  render () {
    return (
      <View style={Styles.navBar}>
        <Text style={[Styles.title, Styles.centered]}>myTO-DO-S</Text>
      </View>
    )
  }
}

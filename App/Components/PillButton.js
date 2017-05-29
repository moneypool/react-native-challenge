import React, { PropTypes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Styles from './Styles/PillButtonStyles'

export default class PillButton extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    isActive: PropTypes.bool.isRequired
  }

  render () {
    const { isActive } = this.props
    let buttonStyles = [Styles.button]
    let textStyles = [Styles.buttonText]
    if (isActive) {
      buttonStyles.push(Styles.buttonActive)
      textStyles.push(Styles.buttonTextActive)
    }
    return (
      <TouchableOpacity style={buttonStyles} onPress={this.props.onPress}>
        <Text style={textStyles}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

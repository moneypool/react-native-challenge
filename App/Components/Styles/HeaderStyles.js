import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  navBar: {
    height: Metrics.navBarHeight,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.turquoise
  },
  title: {
    ...Fonts.style.h1,
    color: Colors.cream,
    textAlign: 'center',
    marginTop: Metrics.smallMargin
  }
})

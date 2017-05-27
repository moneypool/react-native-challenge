import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  navBar: {
    flex: 1,
    height: Metrics.navBarHeight,
    paddingTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.white
  },
  title: {
    ...Fonts.style.h1,
    fontSize: Fonts.size.input,
    color: Colors.black,
    textAlign: 'center',
    marginTop: Metrics.smallMargin
  },
  add: {
    color: Colors.mainColor,
    position: 'absolute',
    right: Metrics.baseMargin,
    fontSize: 24,
    top: 24
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

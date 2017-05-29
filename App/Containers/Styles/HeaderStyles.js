import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  navBar: {
    paddingTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.white,
    borderBottomWidth: 3,
    borderBottomColor: Colors.mainColor
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
  addSubmit: {
    backgroundColor: Colors.transparent,
    color: Colors.lightGray,
    position: 'absolute',
    right: Metrics.baseMargin,
    fontSize: 24,
    top: 16
  },
  addInput: {
    height: 56,
    backgroundColor: Colors.lighterGray,
    paddingRight: 33,
    paddingLeft: Metrics.baseMargin
  },
  addInputText: {
    height: 56,
    color: Colors.mainColor
  },
  filters: {
    backgroundColor: Colors.backgroundLLight,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    borderColor: Colors.lightGray,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: Colors.transparent,
    height: 36,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    minWidth: 60
  },
  buttonActive: {
    backgroundColor: Colors.mainColor,
    borderColor: Colors.transparent,
    overflow: 'hidden'
  },
  buttonText: {
    textAlign: 'center',
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin,
    color: Colors.lightGray,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold
  },
  buttonTextActive: {
    color: Colors.white
  }
})

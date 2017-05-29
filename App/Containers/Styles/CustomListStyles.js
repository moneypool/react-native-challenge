import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background
  },
  noResults: {
    ...Fonts.style.h2,
    color: Colors.mainColor,
    textAlign: 'center',
    marginTop: Metrics.doubleBaseMargin
  }
})

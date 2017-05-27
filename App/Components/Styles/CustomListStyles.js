import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background
  },
  listContainer: {
    borderBottomColor: Colors.mainColor,
    borderBottomWidth: 3
  },
  listCheckbox: {
    padding: Metrics.baseMargin,
    backgroundColor: Colors.white,
    margin: 0
  },
  listText: {
    ...Fonts.style.normal
  }
})

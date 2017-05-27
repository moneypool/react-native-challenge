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
  listCheckboxContainer: {
    padding: Metrics.baseMargin,
    backgroundColor: Colors.white,
    margin: 0,
    marginBottom: 0,
    paddingRight: 43
  },
  listText: {
    ...Fonts.style.normal
  },
  favorite: {
    color: 'gold',
    position: 'absolute',
    fontSize: 24,
    right: Metrics.smallMargin,
    top: 10

  }
})

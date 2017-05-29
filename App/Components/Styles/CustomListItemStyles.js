import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  editButtons: {
    backgroundColor: Colors.transparent,
    color: Colors.lightGray,
    position: 'absolute',
    fontSize: 24,
    top: 16
  },
  editSubmit: {
    right: 25
  },
  editClose: {
    right: 0
  },
  editInput: {
    height: 49,
    backgroundColor: Colors.lighterGray,
    paddingRight: 40,
    paddingLeft: Metrics.baseMargin
  },
  editInputText: {
    height: 49,
    color: Colors.mainColor
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

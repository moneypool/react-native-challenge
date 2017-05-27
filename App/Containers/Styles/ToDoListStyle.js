import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.general,
  mainContent: {
    flex: 1,
    paddingTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.background
  },
  addInput: {
    height: 40,
    marginLeft: Metrics.doubleBaseMargin,
    marginRight: Metrics.doubleBaseMargin,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 3
  }
})

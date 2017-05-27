import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.general,
  mainContent: {
    paddingTop: Metrics.doubleBaseMargin
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

import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    titleText: {
      ...Fonts.style.h2,
      color: Colors.brightBlue
    }
  },
  general: {
    centered: {
      alignItems: 'center'
    },
    marginLeft: {
      marginLeft: Metrics.baseMargin
    }
  }
}

export default ApplicationStyles

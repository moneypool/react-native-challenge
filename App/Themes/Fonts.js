const type = {
  base: 'Avenir',
  bold: 'Avenir-Black'
}

const size = {
  h1: 38,
  h2: 34,
  input: 18,
  regular: 17,
  medium: 14
}

const style = {
  h1: {
    fontFamily: type.bold,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}


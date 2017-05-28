import 'react-native'
import React from 'react'
import App from '../App/Containers/App'
import { Header } from '../App/Components/Header'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

describe('>>>App --- Snapshot', () => {
  it('render correctly', () => {
    const renderedComponent = renderer.create(
      <App />
    ).toJSON()
    expect(renderedComponent).toMatchSnapshot()
  })
})

describe('>>>Header --- Snapshot', () => {
  it('render correctly', () => {
    const renderedComponent = renderer.create(
      <Header />
    ).toJSON()
    expect(renderedComponent).toMatchSnapshot()
  })
})

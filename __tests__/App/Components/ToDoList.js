import 'react-native'
import React from 'react'
import ToDoList from '../../../App/Containers/ToDoList'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const component = renderer.create(
    <ToDoList />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

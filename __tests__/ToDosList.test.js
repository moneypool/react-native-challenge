import React from 'react'
import {
  TextInput,
  Text
} from 'react-native'
import { shallow } from 'enzyme'
import { Header } from '../App/Containers/Header'
import { CustomList } from '../App/Containers/CustomList'
import { CustomListItem } from '../App/Components/CustomListItem'
import App from '../App/Containers/App'
import PillButton from '../App/Components/PillButton'
import * as Animatable from 'react-native-animatable'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

// Contains 2 completed tasks, and 1 pending
const tasks = [
  {
    title: 'Take a shower',
    index: 1,
    completed: false,
    favorite: true
  },
  {
    title: 'Drink water',
    index: 2,
    completed: true,
    favorite: false
  },
  {
    title: 'Go to the store',
    index: 3,
    completed: true,
    favorite: false
  }
]

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

describe('>>>CustomList --- Snapshot', () => {
  it('render correctly', () => {
    const renderedComponent = renderer.create(
      <CustomList />
    ).toJSON()
    expect(renderedComponent).toMatchSnapshot()
  })
})

describe('>>>CustomListItem --- Snapshot', () => {
  it('render correctly', () => {
    const renderedComponent = renderer.create(
      <CustomListItem />
    ).toJSON()
    expect(renderedComponent).toMatchSnapshot()
  })
})

describe('>>>Header --- Shallow Render', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Header />)
    wrapper.setProps({ tasks })
  })

  it('render the dumb component', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('contains three buttons when rendered', () => {
    expect(wrapper.find(PillButton)).toHaveLength(3)
  })

  it('contains no buttons when addMode active', () => {
    expect(wrapper.find(PillButton)).toHaveLength(3)
    wrapper.setState({ addMode: true })
    expect(wrapper.find(PillButton)).toHaveLength(0)
  })

  it('contains input addMode', () => {
    wrapper.setState({ addMode: true })
    expect(wrapper.find(TextInput)).toHaveLength(1)
  })

  it('pending button, contains correct pending tasks number', () => {
    expect(wrapper.find(PillButton).at(2).props().text).toBe('Pending - 1')
  })
})

describe('>>>CustomList --- Shallow Render', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CustomList />)
  })

  it('render the dumb component', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('containt no results text when no tasks are defined', () => {
    expect(wrapper.find(Animatable.Text)).toHaveLength(1)
    expect(wrapper.find(Text)).toHaveLength(1)
    expect(wrapper.find(Animatable.Text).first().props().children).toBe('No tasks yet :(')
    expect(wrapper.find(Text).last().props().children).toBe(`Let's add something fun`)
  })
})

describe('>>>CustomListItem --- Shallow Render', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CustomListItem />)
  })

  it('render the dumb component', () => {
    expect(wrapper.length).toEqual(1)
  })
})

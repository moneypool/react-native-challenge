import Actions, { reducer, INITIAL_STATE } from '../App/Redux/ToDosRedux'

describe('>>>ToDos --- Redux', () => {
  it('add task', () => {
    const state = reducer(INITIAL_STATE, Actions.addTask('New Task'))

    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].title).toBe('New Task')
    expect(state.tasks[0].index).toBe(1)
    expect(state.tasks[0].completed).toBe(false)
    expect(state.tasks[0].favorite).toBe(false)

    expect(state.index).toBe(2)
  })

  it('remove task', () => {
    let state = reducer(INITIAL_STATE, Actions.addTask('New Task'))
    expect(state.tasks).toHaveLength(1)

    state = reducer(state, Actions.removeTask(1))

    expect(state.tasks).toHaveLength(0)
    expect(state.index).toBe(2)
  })

  it('toggle completed task', () => {
    let state = reducer(INITIAL_STATE, Actions.addTask('New Task'))
    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].completed).toBe(false)

    state = reducer(state, Actions.toggleCompletedTask(1))

    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].completed).toBe(true)
  })

  it('toggle favorite task', () => {
    let state = reducer(INITIAL_STATE, Actions.addTask('New Task'))
    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].favorite).toBe(false)

    state = reducer(state, Actions.toggleFavorite(1))

    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].favorite).toBe(true)
  })

  it('change filter', () => {
    let state = INITIAL_STATE
    expect(state.filterBy).toBe('All')

    state = reducer(INITIAL_STATE, Actions.changeFilter('Pending'))
    expect(state.filterBy).toBe('Pending')
  })

  it('edit task title', () => {
    let state = reducer(INITIAL_STATE, Actions.addTask('New Task'))
    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].title).toBe('New Task')

    state = reducer(state, Actions.editTask('Edited task', 1))

    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].title).toBe('Edited task')
  })

  it('reset task state', () => {
    let state = reducer(INITIAL_STATE, Actions.addTask('New Task'))

    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].title).toBe('New Task')
    expect(state.tasks[0].index).toBe(1)
    expect(state.tasks[0].completed).toBe(false)
    expect(state.tasks[0].favorite).toBe(false)

    expect(state.index).toBe(2)

    state = reducer(state, Actions.resetTasks())

    expect(state.tasks).toHaveLength(0)
    expect(state.index).toBe(1)
    expect(state.filterBy).toBe('All')
  })
})

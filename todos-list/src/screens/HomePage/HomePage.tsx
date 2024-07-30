import { LIST_FILTER_TYPE, ListFilterType } from 'constants/listFilterType'
import { todos } from 'mockups/todos'
import { useState } from 'react'

interface TodoType {
  title: string
  completed: boolean
}

export const HomePage = () => {
  const [todosItems, setTodosItems] = useState(todos)
  const [filterType, setFilterType] = useState<ListFilterType>(LIST_FILTER_TYPE.All)
  const [newTodo, setNewTodo] = useState('')

  const handleClearCompletedTodos = () => {
    const uncompletedTodos = todosItems.filter(item => !item.completed)
    setTodosItems(uncompletedTodos)
  }

  const handleChangeFilterType = (filterType: ListFilterType) => {
    setFilterType(filterType)
  }

  const getFilterFunction = (item: TodoType) => {
    switch (filterType) {
      case LIST_FILTER_TYPE.All:
        return true
      case LIST_FILTER_TYPE.Active:
        return !item.completed
      case LIST_FILTER_TYPE.Completed:
        return item.completed
    }
  }

  const handleAddNewTodoOnEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setTodosItems(prev => [
        ...prev,
        { title: newTodo, completed: false, id: prev[length - 1].id + 1 },
      ])
      setNewTodo('')
    }
  }

  const handleChangeCompletionStatus = (newValue: string, itemId: number) => {
    const todo = todos.find(item => item.id === itemId)
    setTodosItems(prev =>
      [
        ...prev.filter(item => item.id !== itemId),
        {
          id: itemId,
          completed: newValue === 'on',
          title: todo?.title || '',
        },
      ].sort((a, b) => a.id - b.id)
    )
  }

  return (
    <div className="flex flex-col w-full h-screen text-sm md:text-md">
      <img src="bg-desktop-light.jpg" className="w-full object-cover h-[280px]" />
      <div className="bg-lightGray grow" />
      <div className="z-[10] absolute top-[100px] right-0 bottom-0 m-auto left-0 flex flex-col px-12 md:px-0 md:w-[500px] gap-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl text-white font-semibold rounded-sm">T O D O</h1>
          <img src="./icons/icon-moon.svg" className="w-[20px] h-[20px]" />
        </div>
        <div className="bg-white flex items-center gap-3 px-4 shadow-sm rounded-sm">
          <input type="checkbox" />
          <input
            placeholder="Create a new todo..."
            onKeyDown={handleAddNewTodoOnEnterClick}
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            className="p-3 font-JosefinSans"
          />
        </div>
        <div className="flex flex-col bg-white rounded-sm shadow-lg">
          {todosItems.filter(getFilterFunction).map(item => (
            <div
              key={item.id}
              className="flex border-b items-center border-lightGrayishBlue gap-3 px-4 py-3 font-JosefinSans"
            >
              <input
                type="checkbox"
                className="peer relative appearance-none w-5 h-5 
                          border rounded-full border-lightGrayishBlue 
                          cursor-pointer  
                          checked:bg-gradient-to-r from-lightBlue to-pink"
                checked={item.completed}
                onChange={e => handleChangeCompletionStatus(e.target.value, item.id)}
              />
              <label>
                {item.completed ? (
                  <s className="text-lightGrayishBlue">{item.title}</s>
                ) : (
                  <>{item.title}</>
                )}
              </label>
              <svg
                className="absolute left-[68px] md:left-[20px] w-4 h-4 mt-1 hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
              >
                <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
              </svg>
            </div>
          ))}

          <div className="flex justify-between bg-white text-xs p-3 rounded-sm font-JosefinSans">
            <p className="text-darkGrayishBlue">{`${
              todosItems.filter(item => !item.completed).length
            } items left`}</p>
            <div className="hidden gap-1 md:flex">
              {Object.keys(LIST_FILTER_TYPE).map(item => (
                <button
                  key={item}
                  className={`${
                    item === filterType ? 'text-blue-500' : 'text-darkGrayishBlue'
                  } font-bold`}
                  onClick={() => handleChangeFilterType(item as ListFilterType)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="text-darkGrayishBlue" onClick={handleClearCompletedTodos}>
              Clear completed
            </button>
          </div>
        </div>
        <div className="md:hidden bg-white flex items-center justify-center font-JosefinSans p-3 gap-3 px-4 shadow-sm rounded-sm">
          {Object.keys(LIST_FILTER_TYPE).map(item => (
            <button
              key={item}
              className={`${
                item === filterType ? 'text-blue-500' : 'text-darkGrayishBlue'
              } font-bold`}
              onClick={() => handleChangeFilterType(item as ListFilterType)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

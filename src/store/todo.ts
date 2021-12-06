import useStorage from "@/hooks/useStorage"
import delay from "@/utils/delay"
import { nanoid } from "nanoid"
import { defineStore } from "pinia"

export interface Todo {
  title: string;
  content: string;
  level: number;
  done?: boolean;
  createdAt?: Date;
  id?: string;
}

interface State {
  todoList: Todo[]
}

const localStorage = useStorage().localStorage

async function fetchData () {
  await delay(250)
  return localStorage.getItem<Todo[]>('todo')
}

async function saveData (todoList: Todo[]) {
  await delay(200)
  localStorage.setItem('todo', todoList)
}

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
    todoList: []
  }),
  actions: {
    async addTodo (params: Todo) {
      const id = nanoid()
      const createdAt = new Date()
      const done = false
      const todo: Todo = { ...params, id, createdAt, done }
      this.todoList.push(todo)
      await saveData([...this.todoList, todo])
    },
    async removeTodo (params: Todo) {
      const targetData = this.todoList.filter(x => x.id !== params.id)
      await saveData(targetData)
      this.todoList.splice(0, this.todoList.length, ...targetData)
    },
    async modifyTodo (params: Todo) {
      const index = this.todoList.findIndex(x => x.id === params.id)

      if (index < 0) {
        throw new Error(`Can't find todo item [${params.id}]`)
      }

      const targetData = this.todoList.splice(index, 1, params)
      await saveData(targetData)
    },
    async fetchTodo () {
      const targetData = await fetchData()
      this.todoList.splice(0, this.todoList.length, ...targetData)
    }
  },
  getters: {
    getDoneList: state => state.todoList.filter(x => x.done),
    getNotDoneList: state => state.todoList.filter(x => !x.done),
    getAllList: state => state.todoList
  }
})

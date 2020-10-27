//import axios from 'axios'

import Axios from "axios"

export const todos = {

    state: {

        todos: [

        ]
    },

    actions: {
        async fetchTodos({ commit }) {
            const response = await Axios.get('http://jsonplaceholder.typicode.com/todos')
            commit('setTodos', response.data)
        },

        async addTodo({ commit }, title) {
            const response = await Axios.post('http://jsonplaceholder.typicode.com/todos', { title, completed: false });
            commit('newTodo', response.data)
        },
        
        async deleteTodo({ commit }, id) {
            // Removed 'await' to speed up deleting
             Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
            commit('removeTodo', id)
        },

        async filterTodos({ commit },e){
            // Get the value from dropdown in FilterTodos.vue
            const limit = e.target.value
            const response = await Axios.get(`http://jsonplaceholder.typicode.com/todos?_limit=${limit}`)

            commit('setTodos', response.data)

        },

        async updateTodo({ commit }, updatedTodo) {
            const response = await Axios.put(`http://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo)
            commit('updateTodo', response.data)
        }

    },

    mutations: {
        setTodos: (state, todos) => (state.todos = todos),
        newTodo: (state, todo) => state.todos.unshift(todo),
        removeTodo: (state, id ) => (state.todos = state.todos.filter( todo => todo.id !== id )),
        updateTodo: (state, updatedTodo) => {
            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
            if (index !== -1){
                state.todos.splice(index, 1, updatedTodo)
            }
        }
    },

    getters: {
        allTodos: (state) => state.todos
    }

}
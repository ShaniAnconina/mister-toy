// import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'
// import { localStorageService } from './storage.service.js'
// import { httpService } from './http.service.js'

// const USER_KEY = 'userDB'
// const BASE_URL = 'user/'
// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

// export const userService = {
//   get,
//   getById,
//   remove,
//   signup,
//   login,
//   logout,
//   update,
//   getEmptyCredentials,
//   getLoggedinUser,
// }

// window.userService = userService


// function get(userId) {
//   // return httpService.get(BASE_URL, userId)
//   return httpService.get(`user`)
// }

// async function getById(userId) {
//   // const user = await storageService.get('user', userId)
//   const user = await httpService.get(`user/${userId}`)
//   return user
// }

// // function update(user) {
// //   return httpService.put(BASE_URL, user).then((user) => {
// //     _saveLoggedinUser(user)
// //     return user
// //   })
// // }

// // function remove(userId) {
// //   return httpService.delete(BASE_URL, userId)
// // }

// function signup(credentials) {
//   return httpService.post('auth/signup', credentials).then((user) => {
//     _saveLoggedinUser(user)
//     return user
//   })
// }

// function login(credentials) {
//   return httpService.post('auth/login', credentials).then((user) => {
//     // const user = users.find((u) => u.username === credentials.username)
//     // if (!user) return Promise.reject('Logddin failed')
//     _saveLoggedinUser(user)
//     return user
//   })
// }

// function getEmptyCredentials(
//   fullname = '',
//   username = '',
//   password = 'secret',
// ) {
//   return {
//     fullname,
//     username,
//     password,
//     isAdmin: false
//   }
// }

// function getLoggedinUser() {
//   return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
// }

// function logout() {
//   sessionStorage.removeItem('loggedinUser')
//   return Promise.resolve()
// }


// function _saveLoggedinUser(user) {
//   sessionStorage.setItem('loggedinUser', JSON.stringify(user))
// }

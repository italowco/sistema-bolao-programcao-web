import axios from 'axios'

const url = "//191.252.196.91:3000/"
//const url = "//localhost:3000/"
const user = JSON.parse(localStorage.getItem('user'));


export const authService = {
    login,
    checkAuth,
    getAllUsers,
    deleteUser,
    updateUser,
    createUser
}

function login(username, password) {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"},
        email: username, password: password
    }

    return axios.post(url +"authenticate", requestOptions)
        .then(
          (success) => {
            return success.data.user
        },(error) => {
            return error.response.data
          }
        )
}

function checkAuth(userToken) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Authorization': userToken
    }
  }


  return axios.get(url +"users", "", requestOptions)
    .then(
      (success) => {
        return success.data.user
      },(error) => {

        return error.response.data
      }
    )
}

function getAllUsers() {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Authorization': user.user.token
        }
    }

    return axios.get(url +"users", requestOptions)
        .then(
            (success) => {
                console.warn(success)
                return success.data
            },(error) => {

                return error.response.data
            }
        )
}

function deleteUser(id) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Authorization': user.user.token
        }
    }

    return axios.delete(url +"users/" + id, requestOptions)
        .then(
            (success) => {
                return success
            },(error) => {

                return error.response.data
            }
        )
}

function updateUser(userData) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Authorization': user.user.token
        }
    }

    return axios.patch(url +"users/" + userData.id.toString(), userData, requestOptions)
        .then(
            (success) => {
                return success.data
            },(error) => {

                return error.response.data
            }
        )
}

function createUser(userData) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Authorization': user.user.token
        }
    }

    return axios.post(url +"users/", userData, requestOptions)
        .then(
            (success) => {
                return success.data
            },(error) => {

                return error.response.data
            }
        )
}

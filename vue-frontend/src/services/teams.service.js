import axios from 'axios'

const url = "//191.252.196.91:3000/"
//const url = "//localhost:3000/"


export const teamService = {
  getTeams
}

function getTeams() {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*"}
  };


  return axios.get(url + "/teams", requestOptions)
    .then( (response) => {
      return response.data
    })
}

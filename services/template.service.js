import mainRequestService from 'project-components/request.service.js'

export const postService = (url, body) => {
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body
  }
  return mainRequestService(url, options)
}

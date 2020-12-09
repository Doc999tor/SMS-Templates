import mainRequestService from 'project-components/request.service.js'

export const postService = url => {
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }
  return mainRequestService(url, options)
}

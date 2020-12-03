import mainRequestService from 'project-components/request.service.js'

export const postService = body => {
  const mainUrl = config.urls.main + config.urls.templates
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body
  }
  return mainRequestService(mainUrl, options)
}

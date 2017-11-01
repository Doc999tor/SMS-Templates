import mainRequestService from './request.service'

export const postService = body => {
  const mainUrl = config.urls.main + config.urls.reminders
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

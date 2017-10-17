import mainRequestService from './request.service'

const mainUrl = config.urls.main + config.urls.reminders

export const postService = async body => {
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body
  }
  return await mainRequestService(mainUrl, options)
}
export const putService = async (body, id) => {
  const url = mainUrl + '/' + id
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'PUT',
    body
  }
  return await mainRequestService(url, options)
}
export const patchService = async (body, id) => {
  const url = mainUrl + '/' + id
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'PATCH',
    body
  }
  return await mainRequestService(url, options)
}
export const deleteService = async id => {
  const url = mainUrl + '/' + id
  const options = {
    mode: 'cors',
    method: 'DELETE'
  }
  return await mainRequestService(url, options)
}
export const getService = async q => {
  const url = config.urls.main + config.urls.get_clients.replace('{query}', q)
  const options = {
    mode: 'cors',
    method: 'GET'
  }
  const r = await mainRequestService(url, options)
  return r.json()
}

export const mainRequestService = (url, options) => fetch(url, options).then(res => {
  if (res.status === 503) setTimeout(() => { mainRequestService(url, options) }, res.headers.get('Retry-After') * 1000)
  return res
})

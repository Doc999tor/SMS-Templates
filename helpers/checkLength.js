export default p => {
  if (p) {
    let tagsLength = 0
      Object.keys(config.translations.tags).forEach(i => {
        p = p.replace(new RegExp(config.translations.tags[i].label, 'gm'), () => { tagsLength += config.translations.tags[i].average_length; return '' })
      })
    let length = p.length
    let l = length + tagsLength
    return l
  }
  return 0
}

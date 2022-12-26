export default (p, t) => {
  Object.keys(config.translations.tags).forEach(i => {
    p = p.replace(new RegExp(config.translations.tags[i].label, 'gm'), t ? `$${config.tag_list[i]}$` : config.translations.tags[i].preview_text)
  })
  return p
}

export default Component => {
  const rights = {
    add: false,
    name: false,
    text: false,
    tags: false,
    save: false
  }
  const AccessRights = props => {
    const admin = {}
    Object.keys(rights).forEach(i => { admin[i] = true })
    const junior = {
      ...rights
    }
    const readonly = {
      ...rights
    }
    const rightsObj = {
      untrusted: rights,
      senior: admin,
      readonly,
      junior,
      admin
    }
    const res = rightsObj[config.user.permission_level] || rights
    return <Component rights={res} {...props} />
  }
  AccessRights.displayName = `AccessRights(${Component.displayName || Component.name || 'Component'})`
  return AccessRights
}

import requireIndex from 'es6-requireindex'
import controllers from '../controllers/'

export default (router) => {
  const routes = requireIndex(__dirname)
  Object.keys(routes).forEach(route => {
    routes[route]({ router, controllers })
  })
}
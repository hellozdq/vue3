import { createStore } from 'vuex'

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)
const modulesFiles = import.meta.globEager("./modules/*.js")

console.log(modulesFiles);
console.log(Object.keys(modulesFiles));
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  console.log(moduleName)
  const value = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})
console.log(modules)

const store = createStore({
  modules
})
export default store

## 创建项目
yarn create @vitejs/app

### 创建好项目后按照提示运行项目


### 在src添加views 文件
views 添加home/index.vue 

### 添加router
yarn add vue-router@next -D

1. 建立路由
```
<!-- 在src建立 router/index.js
     在router/index.js在设置路由 -->
import { createRouter, createWebHistory } from "vue-router";
 
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component:() => import('../views/app/index.vue')
        }
    ]
})
```

2. 将App.vue 的模板修改
```
    <template>
        <router-view></router-view>
    </template>
```

3. 在main.js 引入router
```
import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

const app = createApp(App)
app.use(router);
app.mount('#app')
```

### 添加vuex
yarn add vuex@next --D

1. 建立store
```
<!-- 在src建 store 文件夹
store 文件夹再建 index.js 、modules/home.js 文件
modules 主要用于分模块 
 -->
//home.js 
const state = {
    name:'storeName'
}

const mutations = {
  SET_NAME: (state,name) => {
      state.name = name
  }
}

const actions = {
  setName:({ commit }, name)=>{
    commit("SET_NAME",name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

//index.js
import { createStore } from 'vuex'

// 获取文件名 自动读取modules文件
const modulesFiles = import.meta.globEager("./modules/*.js")

const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})


const store = createStore({
  modules
})
export default store
```

2. 添加store到main.js 中
```
import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'

const app = createApp(App)
app.use(router);
app.use(store);
app.mount('#app')

```

3. 在views/home 中使用vuex
	因为在store 使用了模块 获取名字和方法时要加上模块名（文件名）
```
<template>
    <div>{{name}}</div>
    <button @click="setStoreName('name2')">按钮</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    setup(props) {
        const store = useStore();
        const name = computed(() => store.state.app.name);
        function setStoreName(name){
            store.dispatch('app/setName',name)
        }
        return { name , setStoreName };
    }
}
</script>
```

#### 最后运行项目




# vue-project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run dev
```

### Compiles and minifies for production
```
yarn run build
```

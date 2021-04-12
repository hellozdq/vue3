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
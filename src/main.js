import Vue from 'vue'
import Inventory from './Inventory.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Inventory)
}).$mount('#app')
<template>

  <div class="cart-list">
    <scroll class="content" :data="[cartList]" ref="scroll">

      <!-- 将遍历的item的信息传入子组件中 -->
      <cart-list-item v-for="(item,index) in cartList" :key="item.iid" :item-info="item"></cart-list-item>

    </scroll>
  </div> 
  
</template>

<script>

  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import { mapGetters } from 'vuex'

	export default {
		name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed:{

      ...mapGetters(['cartList'])

    },
    activated(){

      this.$refs.scroll.refresh()

    },
   /*  props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    } */

  }
  
</script>

<style scoped>
  .cart-list {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>

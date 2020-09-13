<template>
  <div class="goods-list">
    <!-- 将每次遍历的item传入子组件，将Item在子组件中进行显示， -->
    <goods-list-item
            v-for="item in goods"
            :goods-item="item" class="item">
    </goods-list-item>
   
  </div>
</template>

<script>
  /* 引入GoodListItem */
  import GoodsListItem from './GoodsListItem'
  
  export default {
    name: "GoodsList",
    /* 注册GoodsListItem */
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  .goods-list .item {
    width: 48%;
  }
</style>
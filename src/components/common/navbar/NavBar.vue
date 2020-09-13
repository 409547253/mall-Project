<template>
  <div class="nav-bar ignore">
    <!-- 不能够直接单独的slot，需要在外面包裹一层能够减少问题 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {  
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }

  .left {
    width: 60px;
  }

  .right {
    width: 60px;
  }
  /* 将左右划分为60px,中间占据剩余的位置 */
  .center {
    flex: 1;
  }
</style>
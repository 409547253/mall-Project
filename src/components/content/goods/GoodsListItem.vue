<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img @load="imgLoad" v-lazy="showImage" :key="showImage" alt=""> -->
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
 
<script>
  export default {
    name: "GoodsListItem", 
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
    	showImage() {
    		return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      itemClick() {
        // 1.获取iid
        const iid = this.goodsItem.iid;
        // 2.跳转到详情页面
        this.$router.push('/detail/' + this.goodsItem.iid)
        this.$bus.$emit('backFresh')
        
      },
	    imgLoad() {
        
        /* 当图片加载完毕后，发送事件 */
        this.$bus.$emit('itemImgLoad')

        /* 如果这个路由是来自home页才会进行事件总线上的传递 */
       /*  if(this.$route.path.indexOf('/home')){

          this.$bus.$emit('itemImgLoad')

        }else if(this.$route.path.indexOf('/detail')){
          
          this.$bus.$emit('detailItemImgLoad')

        } */

      }
      
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
<template>
  <div id="detail">
    
      <detail-nav-bar class="detail-nav" 
                      @titleClick="titleClick"
                      ref="nav"/>

      <scroll class="content" 
              ref="scroll" 
              @scroll="contentScroll"
              :probe-type="3"
              
              >

          <detail-swiper :top-images="topImages"/>
          <detail-base-info :goods="goods"/>
          <detail-shop-info :shop="shop"/>
          <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
          <detail-param-info :paramInfo="paramInfo" ref="params"/>
          <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
          <goods-list :goods="recommends" ref="recommend"/>

      </scroll>
      
      <back-top @click.native="backTop" v-show="isShowBackTop"/>
      <detail-bottom-bar @addCart="addToCart"/>
      

  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailBottomBar from './childComps/DetailBottomBar';


  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from 'components/content/goods/GoodsList';


  import {getDetail, Goods ,Shop ,GoodsParam ,getRecommend} from 'network/detail.js';
  import {debounce} from 'common/utils';
  import {itemListenerMinxin,backTopMixin} from 'common/mixin';


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
    },
    mixins:[itemListenerMinxin,backTopMixin],
    data() {
      return {

        iid:null,
        topImages:[],
        goods: {},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        message: '',
        show:false

      }
    },
    created() {
        /* 1.保存传入的iid */
        this.iid = this.$route.params.iid
        /* 2.根据请求iid请求详情数据 */
        getDetail(this.iid).then((res) => {

          const data = res.result
          //1.获取顶部的图片轮播数据
          this.topImages = data.itemInfo.topImages

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //3.创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)
 
          //4.获取店铺信息
          this.detailInfo = data.detailInfo

          //5.获取参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          
          //6.取出评论的信息
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
        
        })

        /* 请求推荐数据 */
        getRecommend().then(res => {
          this.recommends = res.data.list
        })

        // 4.给getThemeTopY赋值
        this.getThemeTopY = debounce(() => {

          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)

        },100)

    },
    mounted(){
        
    },
    methods: {

        imageLoad(){
            this.refresh()
          
            this.getThemeTopY()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
        },
        
        /* 实时监听滚动 */
        contentScroll(position) {
          
          this._listenScrollTheme(position)
          
          //3.是否显示回到顶部
          /* bug必须加入(-position.y)减少不必要的错误否则会报错 */
          this.listenShowBackTop(position)

         },
        _listenScrollTheme(position){
              //1.获取y值
              const positionY = -position.y
              //2.positionY和主题中值进行对比
              //[0,2895,4317,4512]
              //positionY在 0 和 7938之间，index = 0
              //positionY在 2895 和 4317之间，index = 1
              //positionY在 4317 和 4512之间，index = 2
              //positionY在 大于等于4512以上，index = 3
              let length = this.themeTopYs.length - 1
              for(let i in this.themeTopYs){

                  i = parseInt(i)
                  /* 当currentIndex == i时则不会进行if条件语句判断， */
                  if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ){
                      this.currentIndex = i
                      this.$refs.nav.currentIndex = this.currentIndex
                  }

              }
          },
          
        addToCart(){
          //1.获取购物车需要展示的信息
          const product = {}
          product.image = this.topImages[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.price = this.goods.newPrice
          product.iid = this.iid

          //2.将我们的商品添加到购物车
          // this.$store.commit('addCart',product)
          this.$store.dispatch('addCart',product).then(res => {

              console.log(this.$toast)
              this.$toast.show(res,2000)

          })

          //3.添加到购物车

        }
      },

      destroyed(){
        this.$bus.$off('itemImgLoad', this.itemImgListener)
        /* 销毁后将toast变为false */
        this.$toast.isShow = false
      }, 

      


  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  
  .detail-nav{
    position: relative;
    z-index: 9;
  }
  .content {
   /*  position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0; */
    height: calc(100% - 44px - 58px);
  }
</style>
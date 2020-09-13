<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 在scroll区域内是不可滚动的,且接收到子组件传入scroll事件以及position属性 -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >

        <home-swiper :banners="banners" ref="aaa"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control class="tab-control" 
              :titles="['流行','新款','精选']" 
              @tabClick="tabClick"
              />
        <good-list :goods="showGoods"/>

    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div> 
</template> 

<script>
  
  /* 私有组件 */
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';


  /* 公共组件 */
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';
  import BackTop from 'components/content/backTop/BackTop';


  /* 方法 */
  import { getHomeMultidata,getHomeGoods } from 'network/home';


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
          banners:[],
          recommends:[],
          goods:{

            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]}

          },
          /* 默认当前类型是一个pop */
          currentType:'pop',
          isShowBackTop:false
      }
    },
    /* 计算属性 */
    computed: {
        showGoods(){
          return this.goods[this.currentType].list
        }
    },
    /* 当组件创建完毕后发送请求 */
    created(){
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){
      console.log(this.$refs)
    },
    methods:{
      /* 
        事件监听相关的方法
      */
      tabClick(index){

          switch(index){

            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break

          }
      },
      /* 网络请求相关的方法 */
      backClick(){

        /* 拿到对应scroll组件中 */
        this.$refs.scroll.scrollTo(0,0)

      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)


        /* 当图片加载完毕后，进行对于better-scroll的刷新 */
        this.$refs.scroll.scroll.refresh()

      },
      getHomeMultidata(){
        getHomeMultidata().then(res => {
            console.log(res)
            /* 
              因为此时是箭头函数，没有自己的this,
              而created里面的this就是当前组件的对象,则函数内部就会向上寻找this,
              直到找到组件对象,获取data中的数据 
            */ 
            this.banners = res.data.banner.list  
            this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){ 

        /* 此时const所定义的值被发生了修改 */
        /* 先定义一个值将其+1,当刷新过后再将对象中的页码加1 */
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          

          /* res => pop前30 page */
          /* 属于goods所在type类型的list，将其所得到的数据，添加其对应的数组 */
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()


        })

      },

    },
   
  }
    
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }

  .home-nav { 
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  }

  .tab-control {
    /* 移动端属性不用担心这个 */
    position: sticky;
    top: 44px;
  }
 
  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 48px; 
    left: 0;
    right: 0;
  }
  /* 第一种方案 */
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  
</style>

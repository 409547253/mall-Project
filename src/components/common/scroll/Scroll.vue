<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
 
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      click: {
        type: Boolean,
        default: true
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    computed: {
    	scrollY() {
    		return this.scroll.y
      }
    }, 
    mounted() {

     setTimeout(this.initScroll,20)

    },
    methods: {  
      
      initScroll(){
          /* 1.获取的是上面data中的scroll的值,将其赋值为BScroll */
          this.scroll = new BScroll(this.$refs.wrapper,{

                  click:true,
                  probeType:this.probeType,
                  pullUpLoad:this.pullUpLoad

          })

          /* 如果probeType的值为2或者3才可以监听滚动事件 */
          if (this.probeType === 2 || this.probeType === 3) {
              
              /* 2.监听滚动的位置 */
              this.scroll.on('scroll',(position) =>{

                this.$emit('scroll',position)

              })

          }

          //3.监听scroll滚动到底部
          if (this.pullUpLoad) {

            this.scroll.on('pullingUp', () => {

              this.$emit('pullingUp')

            })
      
          }
      },

      scrollTo(x,y,time=300){
        /* 获得scroll(better-scroll) */
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        /* 先去判断有没有值，有值再去进行刷新 */
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }


    },
    watch: {
      /* data() {
	      setTimeout(this.refresh, 20)
      } */
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>
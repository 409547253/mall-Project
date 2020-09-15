<template>
    <swiper>
      <swiper-item v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
      </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",

    /* 获取父组件传入的banners数据 */
    props: {
      banners: {
        type: Array,
        required: true
      }
    },
    data() {
    	return {
    		isLoaded: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      startTimer() {
	      this.$refs.swiper && this.$refs.swiper.startTimer()
      },
      stopTimer() {
        this.$refs.swiper && this.$refs.swiper.stopTimer()
      },  

	    imageLoad() {
        /* 这个事件只会执行一次，当首页的第一张图片加载完毕后，就会返回总体高度的值 */
      	if (!this.isLoaded) {
      		this.$emit('swiperImageLoad')
          this.isLoaded = true
        }
      },
      
    }
  }
</script>

<style scoped>

</style>
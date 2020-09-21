<template>

    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in topImages"
                  :key="index" class="swiper-item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: "DetailSwiper",
    components: {
			Swiper,
      SwiperItem
    },
    props: {
      topImages:{
        type:Array,
        default(){

        }
      }
    }
	}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
  }
  .swiper-item img{
    height: 100%;
  }
</style>
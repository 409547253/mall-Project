<template>
  <div>
      <nav-bar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <div v-for="(item,index) in titles"
              class="title-item"
              :key="index"
              :class="{active: index === currentIndex}"
              @click="titleClick(index)">
              {{item}}
          </div>
        </div>
      </nav-bar>
  </div>
  
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'
  
	export default {
		name: "DetailNavBar",
    /* props: {
			titles: {
				type: Array,
        default: () => {
        	return ['商品', '参数', '评论', '推荐']
        }
      },
      currentIndex: {
				type: Number,
        default: 0
      }
    }, */
    prop:{
      currentIndex:{
        type:Number,
        default:0
      }
    },
    data() {
			return {
        titles:['商品', '参数', '评论', '推荐'],
				currentIndex: 0
      }
    },
    components: {
			NavBar
    },
    methods: {
	    backClick() {
	    	this.$router.back()
      },
	    titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      }
    }
	}
</script>

<style scoped>
  .back{
    height: 43px;
  }
  .back img{
    margin-top: 12px;
  }

  .title {
    display: flex;
    padding: 0 20px;
  }

  .title-item {
    flex: 1;
    font-size: 14px;
  }

  /* .title-item.active {
    color: var(--color-high-text)
  } */
  .active{
    color: var(--color-high-text)
  }
</style>
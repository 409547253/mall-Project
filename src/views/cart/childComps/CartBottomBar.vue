<template>
  <div class="bottom-menu">

    <CheckButton class="select-all" 
                 :is-checked="isSelectAll" 
                 @checkBtnClick="checkBtnClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>

  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { mapGetters } from 'vuex'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters([
      	'cartList',
        'cartLength'
      ]),

		  totalPrice() {
        const cartList = this.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price.substr(1)
        }, 0).toFixed(2)
      },

      checkLength(){
          return this.cartList.filter(item => item.checked).length
      },

      isSelectAll() {

          /* 性能不好，需要将item一个个的遍历，不如使用find查找，当找到一个选项的checked是false，就直接判断不选中 */
          // return this.cartList.find(item => item.checked === false) === undefined;
          /* 
             find只会查找返回为true的item，下面这句话返回的是查找没有被选中的商品个数是多少
             如果主要length长度不为0则说明有没被选中的，则取反后返回false，使得全选按钮不被选中
          */
          // return !( this.cartList.filter(item => !item.checked).length )

          /* 进行性能优化，当cartList.length为0时，会直接返回false */
          if(this.cartList.length === 0) return false
          /* 在下面这种情况，如果find没有找到任何东西，那么此时会返回undifind，此时取反是true */
          return !this.cartList.find(item => !item.checked)

          /* 
            再或者使用此种方法，去遍历cartList，如果有没被选中的直接返回false，如果遍历一圈都没有的话直接返回true 
          */
          /*  
            for(let item of this.cartList){
                if(!item.checked){
                    return false
                }
            }
            return true 
          */

      }

    },
    methods: {
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          })
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          })
        } 
        /* 这句代码不行，当我们进行遍历该值时，当改掉第一个，可能会使isSelectAll的值发生改变，从而导致下一个遍历该值不成功 */
        // this.cartList.forEach( item => item.checked = !this.isSelectAll )
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
    
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>

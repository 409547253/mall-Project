import {BACK_POSITION} from "./const";
import BackTop from 'components/content/backTop/BackTop';

import {POP, NEW, SELL} from "./const";
import {debounce} from 'common/utils';

export const itemListenerMinxin = {
	data(){
		return {
			itemImgListener:null,
			refresh:null
		} 
	},
	mounted(){

		/* 图片加载完的事件监听 */
		this.refresh = debounce(this.$refs.scroll.refresh,200)

		//1.监听item图片中加载完成
		//对监听的事件进行保存
		this.itemImgListener = () => {
			this.refresh()  
		}
		
		/* 此时接收的事件是GoodListItem所发出的 */
		/* 需要接收的事件，以及接收事件后执行的事件*/
		this.$bus.$on('itemImgLoad', this.itemImgListener)
		
	}
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backTop() { 
			this.$refs.scroll.scrollTo(0, 0, 300)
		},
		listenShowBackTop(position){
			this.isShowBackTop = -position.y > BACK_POSITION
		}
	}
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
			console.log(this.currentType);
		}
	}
}
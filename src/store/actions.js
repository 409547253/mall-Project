import {
    ADD_COUNTER,
    ADD_TO_CART
    } from './mutation-types';

export default {
    // addCart({state,commit},payload){

    addCart(context,payload){
        return new Promise((resolve,reject) => {
            //1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //2.判断oldProduct
            if(oldProduct){

                /* 为什么要将payload函数的操作提交到commit再进行操作？ */
                /* 方便对padload.count的数据进行跟踪 */
                // oldProduct.count += 1
                context.commit(ADD_COUNTER,oldProduct)
                resolve('当前的商品数量+1')
                

            }else{
                
                payload.count = 1
                context.commit(ADD_TO_CART,payload)
                resolve('增加了新的商品')

            }   
        })
    }

}
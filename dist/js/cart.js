"use strict";$(function(){getCookie("nickname")||($(".cart_null").show().next().hide(),location.href="./login.html"),loginSuccess(),loginout();var a=JSON.parse(localStorage.getItem("goods"))||[];function t(){var n,s,o,t;0!=a.length?(n=a.every(function(n){return n.is_select}),o=s=0,t='<ul>\n  <li class="goods_all">\n      <input type="checkbox" class="checkedAll" '.concat(n?"checked":"",'>\n      全选\n  </li>\n  <li class="goods_name">商品名称</li>\n  <li>销售单价</li>\n  <li>购买数量</li>\n  <li>小计(元)</li>\n  <li>操作</li>\n</ul>\n<ol class="goods_items">'),a.forEach(function(n){n.is_select&&(s+=n.goodsnum,o+=+(n.goodsnum*n.price).toFixed(2)),t+='\n    <li class="goods_each">\n                <div class="goods_one">\n                    <input type="checkbox" data-id="'.concat(n.goodsId,'"  class="checkone"  ').concat(n.is_select?"checked":"",'>\n                </div>\n                <div class="goods_name">\n                    <div class="goods_img">\n                        <a href="#"data-id="').concat(n.goodsId,'">\n                        <img width="75px" height="75px"\n                                src="').concat(n.goodsimg,'"\n                                alt=""></a>\n                    </div>\n                    <div>\n                        <a href="#" class="goods_title" data-id="').concat(n.goodsId,'" >').concat(n.goodsname,'</a>\n                    </div>\n                </div>\n                <div class="goods_price">￥').concat(n.price,'</div>\n                <div class="goods_num">\n                    <span class="reduce" data-id="').concat(n.goodsId,'" ></span>\n                    <input class="goodsnum" data-id="').concat(n.goodsId,'" type="text" value="').concat(n.goodsnum,'">\n                    <span class="add" data-id="').concat(n.goodsId,'"></span>\n                </div>\n                <div class="goods_subtotal">￥').concat((n.goodsnum*n.price).toFixed(2),'</div>\n                <div class="goods_oper">\n                    <span data-id="').concat(n.goodsId,'" class="del">删除</span>\n                </div>\n            </li>\n    ')}),t+='</ol>\n<div class="goods_p1" >\n<div class="p1_left">\n    <span class="del_all">\n      <i></i>\n      删除选中的商品</span>\n    <span class="shop_again">\n      <i></i>\n      继续购物</span>\n</div>\n<div class="p1_right">\n    <span class="total_num">'.concat(s,'</span>件商品,总计：￥\n    <span class="total_price">').concat(o,'</span>\n</div>\n</div>\n<div class="goods_p2">\n <div>\n  商品总金额：￥ <span class="total_price">').concat(o,'</span>\n     <button class="go_order"></button>\n </div>\n</div>'),$(".cart_list").html(t),localStorage.setItem("goods",JSON.stringify(a))):$(".cart_null").removeClass("h").next().addClass("h")}a?($(".cart_null").addClass("h").next().removeClass("h"),t()):$(".cart_null").removeClass("h").next().addClass("h"),$(".cart_list").on("click",".checkedAll",function(){var s=this;a.forEach(function(n){n.is_select=s.checked}),t()}),$(".cart_list").on("click",".checkone",function(){var s=this;a.filter(function(n){return n.goodsId==$(s).attr("data-id")})[0].is_select=this.checked,t()}),$(".cart_list").on("click",".del",function(){var o=this;a.forEach(function(n,s){n.goodsId==$(o).attr("data-id")&&a.splice(s,1)}),t()}),$(".cart_list").on("click",".add",function(){var s=this,n=a.filter(function(n){return n.goodsId==$(s).attr("data-id")})[0];n.goodsnum<999&&n.goodsnum++,t()}),$(".cart_list").on("click",".reduce",function(){var s=this,n=a.filter(function(n){return n.goodsId==$(s).attr("data-id")})[0];1<n.goodsnum&&n.goodsnum--,t()}),$(".cart_list").on("click",".del_all",function(){for(var n=0;n<a.length;n++)a[n].is_select&&(a.splice(n,1),n--);localStorage.setItem("goods",JSON.stringify(a)),t()}),$(".cart_list").on("click",".shop_again",function(){location.href="./list.html"}),$(".cart_list").on("input",".goodsnum",function(){var s=this;/^[1-9]{1}\d{0,2}$/.test($(this).val())?($(this).attr("data-id"),a.filter(function(n){return n.goodsId==$(s).attr("data-id")})[0].goodsnum=$(this).val(),t()):($(this).val(this.defaultValue),layer.alert("输入范围0~999整数",{icon:2}))})});
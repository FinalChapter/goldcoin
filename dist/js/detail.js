"use strict";$(function(){wxCodeShow(),loginSuccess(),loginout(),searchMsg();var p={},s=location.search,s=queryParser(s);$.get("./serve/getgoodsInfo.php",s,function(s){var n,i,e,a,o,t,c,d,l,r;(function(s){var n="\n   <h2>".concat(s[0].goodsname,"</h2>\n   <i>").concat(s[0].goodsinfo,'</i>\n   <span class="detail_msg">该商品已下架</span>\n   <div class="distribution">\n       <p>金币网价：￥<span class="des_price">').concat(s[0].price,'</span> </p>\n       <p>运　　费：已享受包邮服务</p>\n       <p>物流配送：快递配送</p>\n       <p class="member_msg">会员类别：<b>仅限实名会员购买</b></p>\n       <div class="des_box">\n           <span>只换不退</span>\n           <div class="t_box">\n               该商品执行只换不退的<a href="#">售后政策</a>\n           </div>\n       </div>\n   </div>\n   <p class="buy_limit">限　　购：单用户限购10枚（套）</p>\n\n   <form class="buy_num">\n       数量选择:\n       <input type="number" value="1" name="goodsnum" class="goods_num">\n       <span class="hidden">暂无库存，您可以先关注此商品</span>\n   </form>\n   <p><button class="buy_now">立即购买</button> <button class="addCart" data-id="').concat(s[0].goodsId,'">加入购物车</button></p>\n   <p class="clearfix"><a class="fan">关注商品</a><a href="#" class="wx_buy">微信购\n           <i class="wx_code">\n               <img src="data:image/png;base64,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"\n                   alt="">\n           </i>\n       </a></p>');$(".detail_info").html(n);var i=' <div class="middle_pic">\n  <div class="mark"></div>\n  <img src="'.concat(s.imgs[0].imgsrc,'" alt="">\n</div>\n<div class="large" style="display: none;">\n</div>\n<div class="preview_list clearfix">\n  <div class="pre_one"></div>\n  <div class="imgs">\n      <div class="swiper-container swiper-no-swiping">\n          <div class="swiper-wrapper">');s.imgs.forEach(function(s){i+='<div class="swiper-slide"><img\n            src="'.concat(s.imgsrc,'"\n            alt=""></div>')}),i+='</div>\n      </div>\n      <div class="swiper-button-prev pre_icon pre_one" aria-disabled="false"></div>\n      <div class="swiper-button-next pre_icon next_one"></div>\n  </div>\n  <div class="next_one"></div>\n</div>',$(".preview").html(i),$(".preview .large").css("backgroundImage","url(".concat(s.imgs[0].imgsrc,")"))})(p=s.list),n=$(".preview .middle_pic"),i=$(".preview .large"),e=$(".preview .mark"),a=n.height(),o=n.width(),t=i.width(),c=i.height(),s=i.css("backgroundSize").split(" "),d=parseInt(s[0]),s=parseInt(s[1]),l=t/d*o,r=c/s*a,$(".preview .mark").css({width:l,height:r}),$(".preview").on("mouseover",".middle_pic",function(){e.css({display:"block"}),i.css({display:"block"})}),$(".preview").on("mouseout",".middle_pic",function(){e.css({display:"none"}),i.css({display:"none"})}),$(".preview").on("mousemove",".middle_pic",function(s){var n=s.offsetX-l/2,s=s.offsetY-r/2;n<0&&(n=0),s<0&&(s=0),o-l<n&&(n=o-l),a-r<s&&(s=a-r),e.css({left:n,top:s}),i.css({backgroundPosition:"-".concat(d/t*n,"px -").concat(d/t*s,"px ")})}),$(".preview").on("mouseover",".swiper-slide",function(){n.find("img").attr("src",$(this).find("img").attr("src")),i.css("backgroundImage","url(".concat($(this).find("img").attr("src"),")"))}),s=5<$(".swiper-slide").length,new Swiper(".swiper-container",{loop:s,speed:2e3,slidesPerView:5,spaceBetween:10,allowSlideNext:s,allowSlidePrev:s,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})},"json"),$(".des_box").mouseover(function(){$(".t_box").stop().animate({width:168}).css({display:"block"})}),$(".des_box").mouseleave(function(){$(".t_box").stop().animate({width:0},function(){$(".t_box").css({display:"none"})})}),$(".detail_info").on("input",".goods_num",function(){/^[1-9]{1}\d{0,2}$/.test($(this).val())||($(this).val(this.defaultValue),layer.alert("输入范围0~999整数",{icon:2}))}),$(".detail_info").on("click",".addCart",function(){var s=JSON.parse(localStorage.getItem("goods"))||[],n=$(this).attr("data-id");s.some(function(s){return s.goodsId==n})?s.filter(function(s){return s.goodsId==n})[0].goodsnum+=+$(".goods_num").val():(p[0].goodsnum=+$(".goods_num").val(),p[0].is_select=!1,s.push(p[0])),layer.alert("加入购物车成功",{icon:1}),localStorage.setItem("goods",JSON.stringify(s)),setCount()})});
"use strict";!function(t){wxCodeShow(),loginSuccess(),loginout(),t.get("./serve/getIndex.php",{cate_two:"熊猫币"},function(n){!function(n){var o='\n    <h2>\n      <div>\n        <span class="icon panda_f1"></span>\n        熊猫币\n      </div>\n      <a href="#">更多</a>\n    </h2>\n    <div class="coin_list">\n      <div class="coin_pic coin_item">\n        <div>\n          <img src="http://img2.ecgci.com/upload/default/20190830/xd_20190830100859233_k.jpg" />\n        </div>\n      </div>';n.forEach(function(n){o+='\n         <div class="item coin_item" data-id="'.concat(n.goodsId,'">\n         <span class="coin_img"></span>\n         <div>\n           <div>\n             <img src="').concat(n.goodsimg,'"  data-src="').concat(n.goodsimg,'" />\n           </div>\n         </div>\n \n         <div class="item_info">\n           <h5>').concat(n.goodsname,"</h5>\n           <p>￥").concat(n.price,"</p>\n         </div>\n       </div>")}),o+="</div>",t(".panda_coin").html(o);var c=document.querySelectorAll(".item img");t(window).on("scroll",function(){lazyLoad(c);for(var n=document.documentElement.scrollTop||document.body.scrollTop,o=document.documentElement.clientHeight,i=0;i<t(".floor").length;i++)t(t(".floor .coin_pic")[i]).offset().top+t(t(".floor .coin_pic")[i]).outerHeight()<=n+o&&t(t(".l_menu li")[i]).addClass("cur").siblings().removeClass("cur");n>t(".other").offset().top+t(".other").outerHeight()&&t(".l_menu").css({display:"none"})})}(n.list)},"json"),new Swiper(".swiper-container",{spaceBetween:30,autoplay:{delay:3e3},loop:!0,pagination:{el:".swiper-pagination",clickable:!0}}),window.onscroll=function(){500<(document.documentElement.scrollTop||document.body.scrollTop)?t(".gotop,.l_menu").fadeIn(300,"linear",function(){t(".gotop").css({display:"block"}),t(".l_menu").css({display:"block"})}):t(".gotop ,.l_menu").fadeOut(300,"linear",function(){})},t(".right_menu").on("click",".gotop",function(){t("html").animate({scrollTop:0})}),t(".l_menu").on("click","li",function(){var n=this;t("html").animate({scrollTop:t(".floor").eq(t(this).index()).offset().top},function(){t(n).addClass("cur").siblings().removeClass("cur")})}),t(".panda_coin").on("click",".item",function(){var n=t(this).attr("data-id");location.href="./detail.html?keyVal="+n}),searchMsg(),loginout()}($);
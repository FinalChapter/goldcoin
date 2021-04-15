$(function(){
    wxCodeShow();
    loginSuccess();
    loginout()
    searchMsg()
  var obj ={}
  var search=location.search;
  var info= queryParser(search)
  $.get("./serve/getgoodsInfo.php",info,function(res){
       obj = res.list
      bindHtml(obj);
      enlarge();
      showSwiper();
  },"json")
 
  //页面渲染
  function bindHtml(obj) {
    var str = `
   <h2>${obj[0].goodsname}</h2>
   <i>${obj[0].goodsinfo}</i>
   <span class="detail_msg">该商品已下架</span>
   <div class="distribution">
       <p>金币网价：￥<span class="des_price">${obj[0].price}</span> </p>
       <p>运　　费：已享受包邮服务</p>
       <p>物流配送：快递配送</p>
       <p class="member_msg">会员类别：<b>仅限实名会员购买</b></p>
       <div class="des_box">
           <span>只换不退</span>
           <div class="t_box">
               该商品执行只换不退的<a href="#">售后政策</a>
           </div>
       </div>
   </div>
   <p class="buy_limit">限　　购：单用户限购10枚（套）</p>

   <form class="buy_num">
       数量选择:
       <input type="number" value="1" name="goodsnum" class="goods_num">
       <span class="hidden">暂无库存，您可以先关注此商品</span>
   </form>
   <p><button class="buy_now">立即购买</button> <button class="addCart" data-id="${obj[0].goodsId}">加入购物车</button></p>
   <p class="clearfix"><a class="fan">关注商品</a><a href="#" class="wx_buy">微信购
           <i class="wx_code">
               <img src="data:image/png;base64,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"
                   alt="">
           </i>
       </a></p>`;

    $(".detail_info").html(str);

    var str2 = ` <div class="middle_pic">
  <div class="mark"></div>
  <img src="${obj.imgs[0].imgsrc}" alt="">
</div>
<div class="large" style="display: none;">
</div>
<div class="preview_list clearfix">
  <div class="pre_one"></div>
  <div class="imgs">
      <div class="swiper-container swiper-no-swiping">
          <div class="swiper-wrapper">`;
    obj.imgs.forEach((item) => {
      str2 += `<div class="swiper-slide"><img
            src="${item.imgsrc}"
            alt=""></div>`;
    });
    str2 += `</div>
      </div>
      <div class="swiper-button-prev pre_icon pre_one" aria-disabled="false"></div>
      <div class="swiper-button-next pre_icon next_one"></div>
  </div>
  <div class="next_one"></div>
</div>`; 

    $(".preview").html(str2);
    $(".preview .large").css("backgroundImage", `url(${obj.imgs[0].imgsrc})`);
  }
  // 政策运动效果
  $(".des_box").mouseover(function () {
    $(".t_box")
      .stop()
      .animate({
        width: 168,
      })
      .css({
        display: "block",
      });
  });
  $(".des_box").mouseleave(function () {
    $(".t_box")
      .stop()
      .animate(
        {
          width: 0,
        },
        () => {
          $(".t_box").css({
            display: "none",
          });
        }
      );
  });
  //放大镜
  function enlarge() {
    const mp = $(".preview .middle_pic");
    const large = $(".preview .large");
    const mark = $(".preview .mark");
    const mpHeight = mp.height();
    const mpWidth = mp.width();
    const largeWidth = large.width();
    const largeHeight = large.height();
    const bgSize = large.css("backgroundSize").split(" ");
    const bgWidth = parseInt(bgSize[0]);
    const bgHeight = parseInt(bgSize[1]);
    const markWidth = (largeWidth / bgWidth) * mpWidth;
    const markHeight = (largeHeight / bgHeight) * mpHeight;
    //设置mark大小
    $(".preview .mark").css({
      width: markWidth,
      height: markHeight,
    });

    $(".preview").on("mouseover", ".middle_pic", () => {
      mark.css({
        display: "block",
      });
      large.css({
        display: "block",
      });
    });
    $(".preview").on("mouseout", ".middle_pic", () => {
      mark.css({
        display: "none",
      });
      large.css({
        display: "none",
      });
    });
    $(".preview").on("mousemove", ".middle_pic", (e) => {
      let x = e.offsetX - markWidth / 2;
      let y = e.offsetY - markHeight / 2;
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      if (x > mpWidth - markWidth) {
        x = mpWidth - markWidth;
      }
      if (y > mpHeight - markHeight) {
        y = mpHeight - markHeight;
      }
      mark.css({
        left: x,
        top: y,
      });
      large.css({
        backgroundPosition: `-${(bgWidth / largeWidth) * x}px -${
          (bgWidth / largeWidth) * y
        }px `,
      });
    });
    $(".preview").on("mouseover", ".swiper-slide", function () {
      mp.find("img").attr("src", $(this).find("img").attr("src"));
      large.css("backgroundImage", `url(${$(this).find("img").attr("src")})`);
    });
  }

  //校验
  function showSwiper() {
    var flag = $(".swiper-slide").length > 5;
    new Swiper(".swiper-container", {
      loop: flag,
      speed: 2000,
      slidesPerView: 5,
      spaceBetween: 10,
      //设置右箭头禁止点击
      allowSlideNext: flag,
      //设置左箭头禁止点击
      allowSlidePrev: flag,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  //校验
  $(".detail_info").on("input", ".goods_num", function () {
    if (!/^[1-9]{1}\d{0,2}$/.test($(this).val())) {
      $(this).val(this.defaultValue);
      layer.alert("输入范围0~999整数", {
        icon: 2,
      });
    }
  });
  $(".detail_info").on("click", ".addCart", function () {
    var goods = JSON.parse(localStorage.getItem("goods")) || [];
    var id = $(this).attr("data-id");
    var flag = goods.some((item) => item.goodsId == id);
    if (flag) {
      var index = goods.filter((item) => item.goodsId == id)[0];
      index.goodsnum += $(".goods_num").val() - 0;
    } else {
      obj[0].goodsnum = $(".goods_num").val() - 0;
      obj[0].is_select = false;
      goods.push(obj[0]);
    }
    layer.alert("加入购物车成功", {
      icon: 1,
    });
    localStorage.setItem("goods", JSON.stringify(goods));
    setCount()
  });

});

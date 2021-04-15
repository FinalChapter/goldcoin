(function ($) {
  wxCodeShow();
  loginSuccess();
  loginout();
  getPandaData();
  //获取页面数据
  function getPandaData() {
    $.get(
      "./serve/getIndex.php",
      { cate_two: "熊猫币" },
      function (res) {
        bindfloor(res.list);
      },
      "json"
    );
  }

  //渲染熊猫币部分页面
  function bindfloor(res) {
    var str = `
    <h2>
      <div>
        <span class="icon panda_f1"></span>
        熊猫币
      </div>
      <a href="#">更多</a>
    </h2>
    <div class="coin_list">
      <div class="coin_pic coin_item">
        <div>
          <img src="http://img2.ecgci.com/upload/default/20190830/xd_20190830100859233_k.jpg" />
        </div>
      </div>`;
    res.forEach((ele) => {
      str += `
         <div class="item coin_item" data-id="${ele.goodsId}">
         <span class="coin_img"></span>
         <div>
           <div>
             <img src="${ele.goodsimg}"  data-src="${ele.goodsimg}" />
           </div>
         </div>
 
         <div class="item_info">
           <h5>${ele.goodsname}</h5>
           <p>￥${ele.price}</p>
         </div>
       </div>`;
    });
    str += `</div>`;
    $(".panda_coin").html(str);
    var imgs = document.querySelectorAll(".item img");
    $(window).on("scroll", function () {
      lazyLoad(imgs);

      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      for (var i = 0; i < $(".floor").length; i++) {
        var floorTop = $($(".floor .coin_pic")[i]).offset().top;
        var picHeight = $($(".floor .coin_pic")[i]).outerHeight();
        if (floorTop + picHeight <= scrollTop + clientHeight) {
          $($(".l_menu li")[i]).addClass("cur").siblings().removeClass("cur");
        }
      }
      if (scrollTop > $(".other").offset().top + $(".other").outerHeight()) {
        $(".l_menu").css({ display: "none" });
      }
    });
  }
  //轮播图
  var swiper = new Swiper(".swiper-container", {
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  //显示二维码
  //回到顶部
  window.onscroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 500) {
      $(".gotop,.l_menu").fadeIn(300, "linear", () => {
        $(".gotop").css({ display: "block" });
        $(".l_menu").css({ display: "block" });
      });
    } else {
      $(".gotop ,.l_menu").fadeOut(300, "linear", () => {});
    }
  };
  gotop();
  function gotop() {
    $(".right_menu").on("click", ".gotop", () => {
      $("html").animate({ scrollTop: 0 });
    });
  }
  //楼层导航
  //点击跳转
  $(".l_menu").on("click", "li", function () {
    $("html").animate(
      { scrollTop: $(".floor").eq($(this).index()).offset().top },
      () => {
        $(this).addClass("cur").siblings().removeClass("cur");
      }
    );
  });

  //点击进入详情
  $(".panda_coin").on("click", ".item", function () {
    const id = $(this).attr("data-id");
    location.href = "./detail.html?keyVal=" + id;
  });
  //搜索部分
  searchMsg();
  loginout();
  //登录成功
})($);

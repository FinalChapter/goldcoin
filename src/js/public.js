function queryParser(qs) {
  if(!qs){
    return
  }
   if(qs.indexOf("?")!=-1){
    qs=qs.slice(1)
  }
  var obj = {};
  if (qs.indexOf("&")) {
    qs.split("&").forEach((ele) => {
      var arr = ele.split("=");
      obj[arr[0]] = arr[1];
    });
  } else {
    var arr = ele.split("=");
    obj[arr[0]] = arr[1];
  }
  return obj;
}
function getCookie(key) {
  const obj = {};
  const tmp = document.cookie.split("; ");
  tmp.forEach((item) => {
    const t = item.split("=");
    obj[t[0]] = t[1];
  });
  return key ? obj[key] : obj;
}
function setCookie(key,value,path,expries) {
  if (!expries) return (document.cookie = key + "=" + value + ";path=" + path);
  const time = new Date();
  time.setTime(time.getTime() - 8 * 1000 * 60 * 60 + 1000 * expries);
  document.cookie = `${key}=${value};path=${path};expires=` + time;
}
function loginSuccess() {
  //登录切换
  var nickname = getCookie("nickname");
  if (nickname) {
    $(".login_1").hide();
    $(".tb_right>p").text(nickname);
    $(".loginout").show(); 
  } else {
    $(".login_1").show();
    $(".tb_right>p").text("");
    $(".loginout").hide();
  }
  //设置购物车条数
  setCount()
}
function setCount(){
  const goods = JSON.parse(localStorage.getItem("goods")) || [];
  $(".cart i").text(goods.length);
}
function loginout(){
    //退出登录
    $(".loginout").on("click", function () {
      layer.confirm(
        "是否确定退出？",
        {
          btn: ["确定", "取消"],
        },
        function () {
          setCookie("nickname", "", "/goldcoin", -1);
          layer.alert("退出登录成功");
          location.href='./index.html';
        }
      );
    });
}

function wxCodeShow() {
  $(".mini_shop").mouseover(() => {
    $(".w_shop").fadeIn(400, "linear", () => {});
  });
  $(".mini_shop").mouseleave(() => {
    $(".w_shop").fadeOut(400, "linear", () => {});
  });
}

function searchMsg(){
  $(".head").on("input", ".search input", function () {
    console.log(".....");
    if (!$(this).val()) {
      $(".search_list").hide();
      return;
    }
    if (/^[\u4e00-\u9fa5]*$/.test($(this).val())) {
      $.get(
        "./serve/search.php",
        { searchkey: $(this).val() },
        (res) => {
          if (res.list.length) {
            var str = ``;
            res.list.forEach((item) => {
              str += `  <li class="search_item" data-id="${item.goodsId}">${item.goodsname}</li>`;
            });
            $(".search_list").html(str).show();
            if (!$(this).val()) {
              $(".search_list").hide();
              return;
            }
          }
        },
        "json"
      );
    } else {
      $(".search_list").hide();
    }
  });
}

function lazyLoad(imgs){
  var clientHeight = window.innerHeight;
  for(var i=0 ;i<imgs.length;i++){
    var top= imgs[i].getBoundingClientRect().top
    if(top<=clientHeight){
      if(imgs[i].src){
        console.log(imgs[i].dataset.src)
        imgs[i].src=imgs[i].dataset.src
      }
    }
  }


}

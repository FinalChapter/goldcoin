$(function () {
  if (!getCookie("nickname")) {
    $(".cart_null").show().next().hide();
    location.href = "./login.html";
  }
  loginSuccess();
  loginout();

  var goods = JSON.parse(localStorage.getItem("goods")) || [];
  if (goods) {
    $(".cart_null").addClass("h").next().removeClass("h");
    bindHtml();
  } else {
    $(".cart_null").removeClass("h").next().addClass("h");
  }
  function bindHtml() {
    if (goods.length == 0) {
      $(".cart_null").removeClass("h").next().addClass("h");
      return;
    }
    var is_selectAll = goods.every((item) => {
      return item.is_select;
    });
    var totalnum = 0;
    var totalprice = 0;
    var str = `<ul>
  <li class="goods_all">
      <input type="checkbox" class="checkedAll" ${
        is_selectAll ? "checked" : ""
      }>
      全选
  </li>
  <li class="goods_name">商品名称</li>
  <li>销售单价</li>
  <li>购买数量</li>
  <li>小计(元)</li>
  <li>操作</li>
</ul>
<ol class="goods_items">`;
    goods.forEach((ele) => {
      if (ele.is_select) {
        totalnum += ele.goodsnum;
        totalprice += (ele.goodsnum * ele.price).toFixed(2) - 0;
      }
      str += `
    <li class="goods_each">
                <div class="goods_one">
                    <input type="checkbox" data-id="${
                      ele.goodsId
                    }"  class="checkone"  ${ele.is_select ? "checked" : ""}>
                </div>
                <div class="goods_name">
                    <div class="goods_img">
                        <a href="#"data-id="${ele.goodsId}">
                        <img width="75px" height="75px"
                                src="${ele.goodsimg}"
                                alt=""></a>
                    </div>
                    <div>
                        <a href="#" class="goods_title" data-id="${
                          ele.goodsId
                        }" >${ele.goodsname}</a>
                    </div>
                </div>
                <div class="goods_price">￥${ele.price}</div>
                <div class="goods_num">
                    <span class="reduce" data-id="${ele.goodsId}" ></span>
                    <input class="goodsnum" data-id="${
                      ele.goodsId
                    }" type="text" value="${ele.goodsnum}">
                    <span class="add" data-id="${ele.goodsId}"></span>
                </div>
                <div class="goods_subtotal">￥${(
                  ele.goodsnum * ele.price
                ).toFixed(2)}</div>
                <div class="goods_oper">
                    <span data-id="${ele.goodsId}" class="del">删除</span>
                </div>
            </li>
    `;
    });
    str += `</ol>
<div class="goods_p1" >
<div class="p1_left">
    <span class="del_all">
      <i></i>
      删除选中的商品</span>
    <span class="shop_again">
      <i></i>
      继续购物</span>
</div>
<div class="p1_right">
    <span class="total_num">${totalnum}</span>件商品,总计：￥
    <span class="total_price">${totalprice}</span>
</div>
</div>
<div class="goods_p2">
 <div>
  商品总金额：￥ <span class="total_price">${totalprice}</span>
     <button class="go_order"></button>
 </div>
</div>`;
    $(".cart_list").html(str);

    localStorage.setItem("goods", JSON.stringify(goods));
  }
  //全选
  $(".cart_list").on("click", ".checkedAll", function () {
    goods.forEach((item) => {
      item.is_select = this.checked;
    });
    bindHtml();
  });
  //单选
  $(".cart_list").on("click", ".checkone", function () {
    var info = goods.filter((item) => {
      return item.goodsId == $(this).attr("data-id");
    })[0];
    info.is_select = this.checked;
    bindHtml();
  });
  //删除
  $(".cart_list").on("click", ".del", function () {
    goods.forEach((item, index) => {
      if (item.goodsId == $(this).attr("data-id")) {
        goods.splice(index, 1);
      }
    });
    bindHtml();
  });
  //添加
  $(".cart_list").on("click", ".add", function () {
    var info = goods.filter((item) => {
      return item.goodsId == $(this).attr("data-id");
    })[0];
    if (info.goodsnum < 999) info.goodsnum++;
    bindHtml();
  });
  //减少
  $(".cart_list").on("click", ".reduce", function () {
    var info = goods.filter((item) => {
      return item.goodsId == $(this).attr("data-id");
    })[0];
    if (info.goodsnum > 1) info.goodsnum--;
    bindHtml();
  });
  //删除选中
  $(".cart_list").on("click", ".del_all", function () {
    for (var i = 0; i < goods.length; i++) {
      if (goods[i].is_select) {
        goods.splice(i, 1);
        i--;
      }
    }
    localStorage.setItem("goods", JSON.stringify(goods));
    bindHtml();
  });
  //去购物
  $(".cart_list").on("click", ".shop_again", function () {
    location.href = "./list.html";
  });
  //输入
  $(".cart_list").on("input", ".goodsnum", function () {
    if (!/^[1-9]{1}\d{0,2}$/.test($(this).val())) {
      $(this).val(this.defaultValue);
      layer.alert("输入范围0~999整数", {
        icon: 2,
      });
    } else {
      $(this).attr("data-id");
      var info = goods.filter((item) => {
        return item.goodsId == $(this).attr("data-id");
      })[0];
      info.goodsnum = $(this).val();
      bindHtml();
    }
  });
});

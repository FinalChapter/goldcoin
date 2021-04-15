$(function () {
  var goodsinfo = {
    cate_one: "贵金属纪念币",
    cate_two: "熊猫币",
    material: "all",
    goodstime: "all",
    speci: "all",
    sort_method: "all",
    sort_type: "all",
    current: 1,
    pagesize: 12,
  };
  var pageTotal = 0;
  //渲染树
  var goodsmsg =[]
    wxCodeShow();
    loginSuccess();
    loginout()
    searchMsg()
  $.get(
    "./serve/getCate_one.php",
    function (res) {
      $.get(
        "./serve/getCate_two.php",
        function (data) {
          var str = `<h2 class="tree_all">所有分类</h2>`;
          res.list.forEach((ele) => {
            const da = data.list.filter((item) => {
              return ele.cate_one == item.cate_one;
            });
            const flag = goodsinfo.cate_one == ele.cate_one;
            str += `
         <div class="tree_f1">
           <h3 data-cateone ="${ele.cate_one}" class="${
              flag ? "tree_cur" : ""
            }"><span class="${flag ? "tree_cur" : ""} tree_icon"></span> ${
              ele.cate_one
            }</h3>
           <ul  style="display:${flag ? "block" : "none"}">`;
            da.forEach((el) => {
              const flag2 = goodsinfo.cate_two == el.cate_two;
              str += `
             <li class="${flag2 ? "tree_cur" : ""}"   data-cateone="${
                ele.cate_one
              }" data-catetwo="${el.cate_two}">${el.cate_two}</li>`;
            });
            str += `</ul></div> `;
          });
          $(".left_tree").html(str);
          treeToggle();
        },
        "json"
      );
    },
    "json"
  );
  getCate_list();
  function getCate_list() {
    $.get(
      "./serve/getCate_list.php",
      goodsinfo,
      function (res) {
        goodsmsg=res.list
        bindGoodsItem(res);
        bindPageTotal(res);

      },
      "json"
    );
  }
  getCateThree();
  function getCateThree() {
    $.get(
      "./serve/getCate_tree.php",
      { cate_one: goodsinfo.cate_one, cate_two: goodsinfo.cate_two },
      function (res) {
        bindCateThree(res.list);
      },
      "json"
    );
  }

  function bindCateThree(res) {
    var str = ``;
    for (let key in res) {
      str += `
        <li>
          <b class="f_title">${key}</b>
          <div class="f_item">`;
      for (let key2 in res[key]) {
        str += `<span class="cur " data-catethree="${key2}" data-type="all">不限</span>`;
        res[key][key2].forEach((item) => {
          if (item[key2]) {
            str += `<span data-catethree="${key2}" data-type="${item[key2]}" >${item[key2]}</span>`;
          }
        });
      }

      str += `</div></li>`;
    }
    $(".cate_f1 ul").html(str);
  }
  //切换树
  function treeToggle() {
    $(".tree_f1").on("click", "h3", function () {
      $(this).find("span").addClass("tree_cur");
      $(this).addClass("tree_cur").siblings().slideDown();
      $(this)
        .parent()
        .siblings()
        .find("h3")
        .removeClass("tree_cur")
        .find("span")
        .removeClass("tree_cur")
        .parent()
        .siblings()
        .slideUp();
    });
    $(".tree_f1").on("click", "li", function () {
      $(this).addClass("tree_cur").siblings().removeClass("tree_cur");
      $(this).parent().parent().siblings().find("li").removeClass("tree_cur");
      const cate_one = $(this).attr("data-cateone");
      const cate_two = $(this).attr("data-catetwo");
      goodsinfo.cate_one = cate_one;
      goodsinfo.cate_two = cate_two;
      getCateThree();
      getCate_list();
    });
  }
  //渲染商品

  function bindGoodsItem(res) {  
    var str = ``;
    if (res.list.length) {

      $(".off").addClass("hide");
      res.list.forEach((item) => {
        str += `
    <div class="pro_item" data-id="${item.goodsId}">
    <img data-id="${item.goodsId}" class="imgloading"  src="http://static.ecgci.com/images/git.png"
      title="${item.goodsinfo}" alt="${item.goodsinfo}"  data-src="${item.goodsimg}"/>
    <p class="it_title" data-id="${item.goodsId}">${item.goodsname}</p>
    <p class="it_info">
      <span class="item_price">${item.price}</span>
      <i class="eval_num">已有13人评价</i>
    </p>
    <p class="item_oper">
      <span class="addCart" data-id="${item.goodsId}">加入购物车</span> <span>关注</span>
    </p>
  </div>`;
      });
      $(".pro_list").html(str);
      var imgs= $(".pro_list img")
      $(window).on("scroll",function(){
        lazyLoad(imgs)
      })
    } else {
      $(".off").removeClass("hide");
    }
  }
  //渲染总页数
  function bindPageTotal(res) {
    pageTotal = res.pageTotal;
    var str = ` 
    共<i class="page_goods">${res.goodsTotal}</i>个商品 <i class="page_cur">${
      goodsinfo.current
    }</i>/<i class="page_total">${res.pageTotal}</i>
    <span class="pre_page ${
      goodsinfo.current == 1 ? "unable" : ""
    }" data-type="pre">
      <b class="page_icon"></b>
      上一页</span>
    <span class="next_page ${
      goodsinfo.current == pageTotal ? "unable" : ""
    }" data-type="next" >下一页
      <b class="page_icon"></b>
    </span>`;
    $(".f2_r").html(str);
  }
  //换页
  $(".cate_f2").on("click", "span", function () {
    if ($(this).attr("data-type") == "next") {
      if (goodsinfo.current < pageTotal) {
        goodsinfo.current++;
      }
    }
    if ($(this).attr("data-type") == "pre") {
      if (goodsinfo.current > 1) {
        goodsinfo.current--;
      }
    }
    getCate_list();
  });
  //三级菜单切换
  $(".cate_f1").on("click", "ul span", function () {
    $(this).addClass("cur").siblings().removeClass("cur");
    const catethree = $(this).attr("data-catethree");
    const type = $(this).attr("data-type");
    if (goodsinfo[catethree] != type) {
      goodsinfo[catethree] = type;
      getCate_list();
    }
  });
  //排序切换
  $(".cate_f2").on("click", ".f2_l span", function () {
    $(this).addClass("cur").siblings().removeClass("cur");
    $(this)
      .find("b")
      .toggleClass("up")
      .parent()
      .siblings()
      .find("b")
      .addClass("up");
    goodsinfo.sort_method = $(this).attr("data-method");
    goodsinfo.sort_type = $(this).attr("data-type");
    getCate_list();
    $(this)
      .attr("data-type", goodsinfo.sort_type == "DESC" ? "ASC" : "DESC")
      .siblings()
      .attr("data-type", "DESC");
  });
  $(".page").on("click", "p  span", function () {
    $(this).addClass("cur").siblings().removeClass("cur");
  });
  //重置
  $(".f1_r").on("click", function () {
    goodsinfo.material = "all";
    goodsinfo.goodstime = "all";
    goodsinfo.speci = "all";
    getCate_list();
    getCateThree();
  });
  //加入购物车
   $(".pro_list").on("click", ".addCart", function () {
      var goods = JSON.parse(localStorage.getItem("goods")) || [];
      var id = $(this).attr("data-id");
      var obj = goodsmsg.filter((item)=>{
        return item.goodsId==id
      })[0]
      var flag = goods.some((item) => item.goodsId == id);
      if (flag) {
        var index = goods.filter((item) => item.goodsId == id)[0];
        index.goodsnum += 1;
      } else {
        obj.goodsnum = 1;
        obj.is_select = false;
        goods.push(obj);
      }
      layer.alert("加入购物车成功", {
        icon: 1,
      });
      localStorage.setItem("goods", JSON.stringify(goods));
  });
  //去详情
  $(".pro_list").on("click", "img,.it_title", function () {
    location.href="./detail.html?keyVal="+$(this).attr('data-id')
});



});

$(function () {
  $.validator.addMethod(
    "checkPhone",
    function (value, ele, param) {
      if (/^1[3,5,7,8]\d{9}$/g.test(value)) {
        return true;
      } else {
        return false;
      }
    },
    "手机号格式不正确！"
  );
  $.validator.addMethod(
    "checkPwd",
    function (value, ele, param) {
      if (/^\w{6,12}$/g.test(value)) {
        return true;
      } else {
        return false;
      }
    },
    "密码只允许6-12位英文字母、数字和下划线"
  );
  $(".registerform").validate({
    rules: {
      phone: {
        required: true,
        checkPhone: true,
        remote: {
          type: "post",
          url: "./serve/isRegister.php",
          data: {
            phone: function () {
              return $(".phone").val();
            },
          },
        },
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 12,
      },
      repwd: {
        equalTo: "#password",
      },
    },
    messages: {
      phone: {
        required: "账号不能为空",
        remote: "手机号已经存在!",
      },
      password: {
        required: "密码不能为空",
        minlength: "密码最少6位",
        maxlength: "密码最多12位",
        checkPwd: true,
      },
      repwd: {
        equalTo: "密码不一致",
      },
    },
    focusInvalid: true,
    submitHandler(form, e) {
      e.stopPropagation();
      if ($(".cb_inp")[0].checked) {
        var info = queryParser($(form).serialize());
        $.post(
          "./serve/register.php",
          info,
          (res) => {
            if (res.code == 1) {
              layer.confirm(
                "用户注册成功",
                {
                  btn: ["关闭"],
                },
                function () {
                  location.reload();
                }
              );
            } else {
              layer.alert("用户注册失败", {
                icon: 2,
              });
            }
          },
          "json"
        );
      } else {
        layer.alert("请先同意用户协议");
      }
    },
  });
  $(".cb_inp").on("click", function () {
    if (this.checked) {
      $(".sub_btn").addClass("active");
    } else {
      $(".sub_btn").removeClass("active");
    }
  });
});

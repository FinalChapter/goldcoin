"use strict";$(function(){$.validator.addMethod("checkPhone",function(e,n,t){return!!/^1[3,5,7,8]\d{9}$/g.test(e)},"账号/手机号格式不正确！"),$.validator.addMethod("checkPwd",function(e,n,t){return!!/^\w{6,12}$/g.test(e)},"密码只允许6-12位英文字母、数字和下划线"),$(".login_form").validate({rules:{account:{required:!0,checkPhone:!0},password:{required:!0,minlength:6,maxlength:12}},messages:{account:{required:"账号不能为空"},password:{required:"密码不能为空",minlength:"密码最少6位",maxlength:"密码最多12位",checkPwd:!0}},focusInvalid:!0,submitHandler:function(e,n){n.stopPropagation();e=queryParser($(e).serialize());$.post("./serve/login.php",e,function(e){1==e.code?layer.confirm("用户登录成功",{btn:["关闭"]},function(){setCookie("nickname",e.data[0].nickname,"/"),location.href="./index.html"}):layer.alert("用户登录失败",{icon:2})},"json")}})});
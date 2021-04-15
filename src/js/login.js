
$(function () {
$.validator.addMethod('checkPhone',function(value,ele,param){

   if(/^1[3,5,7,8]\d{9}$/g.test(value)){
      return true  
   }else{
       return false
   }
},"账号/手机号格式不正确！")
$.validator.addMethod('checkPwd',function(value,ele,param){
    if(/^\w{6,12}$/g.test(value)){
       return true  
    }else{
        return false
    }
   
 },"密码只允许6-12位英文字母、数字和下划线")
  $(".login_form").validate({
    rules: {
        account: {
        required: true,
        checkPhone:true,
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 12,
      },
    },
    messages: {
        account: {
        required: "账号不能为空",
      },
      password: {
        required: "密码不能为空",
        minlength: "密码最少6位",
        maxlength: "密码最多12位",
        checkPwd:true,
      },
    },
    focusInvalid: true,
    submitHandler(form,e) {
      e.stopPropagation();
     var info= queryParser($(form).serialize())
     $.post('./serve/login.php',info,(res)=>{
      if(res.code==1){
        layer.confirm('用户登录成功', {
          btn: ['关闭'] 
        }, function(){

          setCookie('nickname',res.data[0].nickname,"/")
          location.href="./index.html"
        });
      }else{
        layer.alert("用户登录失败", {
          icon: 2,
        })
      }
     },"json")
    },
  });
});

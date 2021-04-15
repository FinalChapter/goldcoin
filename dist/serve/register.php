<?php
   include "./public.php";
  // 1. 接受前端传递来的参数
  $account = $_POST['phone'];
  $password = $_POST['password'];
  // 2. 去数据库进行比对
  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'goldcoin');
  $sql ="INSERT INTO `user`(`account`,`password`,`phone`,`nickname`) VALUES('$account','$password','$account','$account')";
  $res = mysqli_query($link, $sql);
  mysqli_close($link);
  if($res == 1){
    echo json_encode(array(
              "message" => "用户注册成功",
              "code" => 1,
              "data" => $res
            ));
  }else{
    echo json_encode(array(
              "message" => "用户注册失败",
              "code" => 0
        ));  
  }
  

?>
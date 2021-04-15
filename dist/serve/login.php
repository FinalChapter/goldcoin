<?php
   include "./public.php";
  // 1. 接受前端传递来的参数
  $account = $_POST['account'];
  $password = $_POST['password'];
  // 2. 去数据库进行比对
  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'goldcoin');
  $sql = "SELECT * FROM `user` WHERE `account`='$account' AND `password`='$password'";
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);

  // 3. 根据查询结果给前端返回一些信息
  if (count($data)) {
    // 表示有内容, 用户名密码对了
    echo json_encode(array(
      "message" => "用户登录成功",
      "code" => 1,
      "data" => $data
    ));
  } else {
    // 表示没有内容, 用户名密码错误
    echo json_encode(array(
      "message" => "用户名密码错误",
      "code" => 0
    ));
  }

?>

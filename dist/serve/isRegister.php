<?php
  include "./public.php";
  // 1. 接受前端传递来的参数
  $account = $_POST['phone'];
  // 2. 去数据库进行比对
  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'goldcoin');
  $sql = "SELECT * FROM `user` WHERE `account`='$account' ";
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);
  if (count($data)) {
    echo "false";
  } else {
    echo "true";
  }
?>

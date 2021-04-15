<?php
header('content-type: text/html;charset=utf-8;');
include "./public.php";
$cate_two = $_GET['cate_two'];
$link = mysqli_connect('localhost','root','root','goldcoin');
$sql = "SELECT * FROM `goods` where `cate_two`= '$cate_two'" ;
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
        'message' => "获取成功",
        'code' => 1,
        'list' => $data
    ));
mysqli_close($link);
?>
<?php
include "./public.php";
$goodsId = $_GET['keyVal'];
$link = mysqli_connect('localhost','root','root','goldcoin');
$sql = "SELECT * FROM `goods` where `goodsId`= '$goodsId'" ;
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
$sql2 = "SELECT * FROM `imgs` where `goodsId`= '$goodsId'" ;
$res2 = mysqli_query($link,$sql2);
$data2 = mysqli_fetch_all($res2,MYSQLI_ASSOC);
$data['imgs']=$data2;
echo json_encode(array(
        'message' => "获取成功",
        'code' => 1,
        'list' => $data
    ));
mysqli_close($link);
?>
<?php 
include "./public.php";
$searchkey = $_GET['searchkey'];
$link = mysqli_connect('localhost','root','root','goldcoin');
$sql = "SELECT * FROM `goods` where `goodsname` like '%$searchkey%' limit 0,10" ;
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
echo json_encode(array(
        'message' => "获取成功",
        'code' => 1,
        'list' => $data
    ));
mysqli_close($link);
?>

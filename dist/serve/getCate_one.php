<?php 
 include "./public.php";
$link = mysqli_connect('localhost','root','root','goldcoin');
$sql = "SELECT `cate_one` FROM `goods` group by `cate_one`" ;
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
echo json_encode(array(
        'message' => "获取成功",
        'code' => 1,
        'list' => $data
    ));
mysqli_close($link);
?>

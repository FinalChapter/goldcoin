<?php
 include "./public.php";
$cate_one = $_GET["cate_one"];
$cate_two = $_GET["cate_two"];
$link = mysqli_connect('localhost','root','root','goldcoin');
$sql = "SELECT `material` FROM `goods` where `cate_one`= '$cate_one'and `cate_two`= '$cate_two' group by `material`" ;
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

$sql2 = "SELECT `goodstime` FROM `goods` where `cate_one`= '$cate_one'and `cate_two`= '$cate_two' group by `goodstime`" ;
$res2 = mysqli_query($link,$sql2);
$data2 = mysqli_fetch_all($res2,MYSQLI_ASSOC);

$sql3 = "SELECT `speci` FROM `goods` where `cate_one`= '$cate_one'and `cate_two`= '$cate_two' group by `speci`" ;
$res3 = mysqli_query($link,$sql3);
$data3 = mysqli_fetch_all($res3,MYSQLI_ASSOC);

echo json_encode(array(
        'message' => "获取成功",
        'code' => 1,
        'list' => array(
            "年份"=>array("goodstime"=>$data2),
            "材质"=>array("material" =>$data),
            "规格"=>array("speci"=>$data3),
        )
    ));
mysqli_close($link);
?>

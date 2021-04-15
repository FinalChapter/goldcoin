<?php
 include "./public.php";
 $one = $_GET['cate_one'];
 $two = $_GET['cate_two'];
 $material = $_GET["material"];
 $goodstime=$_GET['goodstime'];
 $speci =$_GET["speci"];
 $method = $_GET['sort_method'];
 $type = $_GET['sort_type'];
 $current = $_GET['current'];
 $pagesize = $_GET['pagesize'];
 $sql = "SELECT * FROM `goods`";
 if ($one != 'all') $sql .= " WHERE `cate_one`='$one'";
 if ($two != 'all') $sql .= " AND `cate_two`='$two'";
 if ($material != 'all') $sql .= " AND `material`='$material'";
 if ($goodstime != 'all') $sql .="AND `goodstime`='$goodstime'";
 if($speci != 'all')$sql .= "AND `speci`='$speci'";
 $link = mysqli_connect('localhost','root','root','goldcoin');
 $res2 = mysqli_query($link,$sql);
 $data2 = mysqli_fetch_all($res2,MYSQLI_ASSOC);
 $total = ceil(count($data2)/$pagesize);
 if ($method !='all') $sql .= " ORDER BY `$method` $type";
 $start = ($current-1) * $pagesize;
 $sql .= " LIMIT $start, $pagesize";
 $res = mysqli_query($link,$sql);
 $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
 mysqli_close($link);
 echo json_encode(array(
     "message" => "获取商品列表成功",
      "code"   => 1,
      "sql"    => $sql,
      "list"   => $data,
      "goodsTotal"=> count($data2),
      "pageTotal"=> $total
 ))

?>

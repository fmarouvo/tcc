<?php 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');
	
	include 'datapacket.php';
	include 'TParams.class.php';

	$uploadDir = "c:\dev\castagnari\uploads\\";
	if(!is_dir($uploadDir)){
		mkdir($uploadDir,0777);
	}
	
	if(!is_dir($uploadDir."/contratos")){
		mkdir($uploadDir."/contratos",0777);
	}
	
	if(!is_dir($uploadDir."/boletos")){
		mkdir($uploadDir."/boletos",0777);
	}
	
	if(!is_dir($uploadDir."/contratos/modelos")){
		mkdir($uploadDir."/contratos/modelos",0777);
	}
	
	$datapacket = new Datapacket();
	$TParams = new TParams();

	$filtro = '{"cod":"000001","params":[
		{"name":"usu_login","value":"'.$_POST['usu_login'].'","type":"string"},
		{"name":"usu_senha","value":"'.$_POST['usu_senha'].'","type":"string"}
	]}';

	$datapacket->setHost($TParams->getHost("controledeestoque"));
	$datapacket->add($filtro);
	$ret = $datapacket->open();
	
	if(json_encode($ret)=='[]'){
		$filtro = '{"cod":"000001","params":[
			{"name":"usu_login","value":"'.$_POST['usu_login'].'","type":"string"},
			{"name":"usu_senha","value":"'.$_POST['usu_senha'].'","type":"string"}
		]}';

		$datapacket->clear();
		$datapacket->add($filtro);
		$ret = $datapacket->open();
	}
	
	print_r(json_encode($ret));

?>
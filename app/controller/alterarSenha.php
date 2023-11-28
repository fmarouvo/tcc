<?php 
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');

	include 'datapacket.php';
	include 'TParams.class.php';

	$datapacket = new Datapacket();
	$TParams = new TParams();

	$company = $TParams->getCompany();

	if(isset($_REQUEST['usu_login']) && $_REQUEST['usu_login'] != ""){
		$usu_login = $_REQUEST['usu_login'];
	}else{
		$usu_login = "";
	}
	
	if(isset($_REQUEST['usu_senha']) && $_REQUEST['usu_senha'] != ""){
		$usu_senha = $_REQUEST['usu_senha'];
	}else{
		$usu_senha = "";
	}

	$datapacket->setHost($TParams->getHost("empresas"));

	$filtro = '{"cod":"000002","params":[
		{"name":"emp_codigo","value":"'.$company->{'emp_codigo'}.'","type":"string"},
		{"name":"usu_login","value":"'.$usu_login.'","type":"string"},
		{"name":"usu_senha","value":"'.$usu_senha.'","type":"string"}
	]}';

	$datapacket->add($filtro);
	$ret = $datapacket->open();

	echo "OK";

?>
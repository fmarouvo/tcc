<?php 
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');

	include 'datapacket.php';
	include 'TParams.class.php';

	$datapacket = new Datapacket();
	$TParams = new TParams();
	$company = $TParams->getCompany();
	$host = "controledeestoque";

	if(isset($_REQUEST['acao']) && $_REQUEST['acao'] != ""){
		$acao = $_REQUEST['acao'];
	}else{
		$acao = "";
	}
	
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
	
	if(isset($_REQUEST['usu_email']) && $_REQUEST['usu_email'] != ""){
		$usu_email = $_REQUEST['usu_email'];
	}else{
		$usu_email = "";
	}
	
	if(isset($_REQUEST['per_codigo']) && $_REQUEST['per_codigo'] != ""){
		$per_codigo = $_REQUEST['per_codigo'];
	}else{
		$per_codigo = "";
	}
	
	if(isset($_REQUEST['per_name']) && $_REQUEST['per_name'] != ""){
		$per_name = $_REQUEST['per_name'];
	}else{
		$per_name = "";
	}

	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000091","params":[]}';

		$datapacket->add($filtro);
		$datapacket->debug = true;
		$ret = $datapacket->open();
		$datapacket->getLastQuery();
		print_r(json_encode($ret));
	
	} else if($acao == "autocomplete") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000092","params":[{"name":"usu_login","value":"'.$usu_login.'","type":"other"}]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "selecionar") {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000093","params":[
			{"name":"usu_login","value":"'.$usu_login.'","type":"string"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "adicionar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000090","params":[
			{"name":"usu_login","value":"'.$usu_login.'","type":"string"},
			{"name":"usu_senha","value":"'.$usu_senha.'","type":"string"},
			{"name":"usu_email","value":"'.$usu_email.'","type":"string"},
			{"name":"per_codigo","value":"'.$per_codigo.'","type":"integer"},
			{"name":"per_name","value":"'.$per_name.'","type":"integer"}
		]}';
		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "atualizar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000094","params":[
			{"name":"usu_login","value":"'.$usu_login.'","type":"string"},
			{"name":"usu_senha","value":"'.$usu_senha.'","type":"string"},
			{"name":"usu_email","value":"'.$usu_email.'","type":"string"},
			{"name":"per_codigo","value":"'.$per_codigo.'","type":"integer"},
			{"name":"per_name","value":"'.$per_name.'","type":"string"}
		]}';

		$datapacket->debug = true;
		$datapacket->getLastQuery();
		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "remove") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000095","params":[
			{"name":"usu_login","value":"'.$usu_login.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	}
	else {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000091","params":[]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	}
?>
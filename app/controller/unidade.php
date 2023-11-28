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
	
	if(isset($_REQUEST['uni_codigo']) && $_REQUEST['uni_codigo'] != ""){
		$uni_codigo = $_REQUEST['uni_codigo'];
	}else{
		$uni_codigo = "";
	}
	
	if(isset($_REQUEST['uni_name']) && $_REQUEST['uni_name'] != ""){
		$uni_name = strtoupper($_REQUEST['uni_name']);
	}else{
		$uni_name = "";
	}
	
	if(isset($_REQUEST['uni_prefix']) && $_REQUEST['uni_prefix'] != ""){
		$uni_prefix = strtoupper($_REQUEST['uni_prefix']);
	}else{
		$uni_prefix = "";
	}

	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000011","params":[]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	
	} else if($acao == "autocomplete") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000012","params":[{"name":"uni_name","value":"'.$uni_name.'","type":"other"}]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "selecionar") {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000013","params":[
			{"name":"uni_codigo","value":"'.$uni_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "adicionar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000010","params":[
			{"name":"uni_name","value":"'.$uni_name.'","type":"string"},
			{"name":"uni_prefix","value":"'.$uni_prefix.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "atualizar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000014","params":[
			{"name":"uni_codigo","value":"'.$uni_codigo.'","type":"integer"},
			{"name":"uni_name","value":"'.$uni_name.'","type":"string"},
			{"name":"uni_prefix","value":"'.$uni_prefix.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "remove") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000015","params":[
			{"name":"uni_codigo","value":"'.$uni_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000011","params":[]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	}
?>
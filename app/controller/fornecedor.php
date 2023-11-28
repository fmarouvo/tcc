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
	
	if(isset($_REQUEST['for_codigo']) && $_REQUEST['for_codigo'] != ""){
		$for_codigo = $_REQUEST['for_codigo'];
	}else{
		$for_codigo = "";
	}
	
	if(isset($_REQUEST['for_name']) && $_REQUEST['for_name'] != ""){
		$for_name = strtoupper($_REQUEST['for_name']);
	}else{
		$for_name = "";
	}
	
	if(isset($_REQUEST['for_cnpj']) && $_REQUEST['for_cnpj'] != ""){
		$for_cnpj = strtoupper($_REQUEST['for_cnpj']);
	}else{
		$for_cnpj = "";
	}
	
	if(isset($_REQUEST['for_telefone']) && $_REQUEST['for_telefone'] != ""){
		$for_telefone = strtoupper($_REQUEST['for_telefone']);
	}else{
		$for_telefone = "";
	}

	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000041","params":[]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	
	} else if($acao == "autocomplete") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000042","params":[{"name":"for_name","value":"'.$for_name.'","type":"other"}]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "selecionar") {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000043","params":[
			{"name":"for_codigo","value":"'.$for_codigo.'","type":"integer"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "adicionar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000040","params":[
			{"name":"for_name","value":"'.$for_name.'","type":"string"},
			{"name":"for_cnpj","value":"'.$for_cnpj.'","type":"string"},
			{"name":"for_telefone","value":"'.$for_telefone.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "atualizar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000044","params":[
			{"name":"for_codigo","value":"'.$for_codigo.'","type":"integer"},
			{"name":"for_name","value":"'.$for_name.'","type":"string"},
			{"name":"for_cnpj","value":"'.$for_cnpj.'","type":"string"},
			{"name":"for_telefone","value":"'.$for_telefone.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "remove") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000045","params":[
			{"name":"for_codigo","value":"'.$for_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000041","params":[]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	}
?>
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
	
	if(isset($_REQUEST['pac_codigo']) && $_REQUEST['pac_codigo'] != ""){
		$pac_codigo = $_REQUEST['pac_codigo'];
	}else{
		$pac_codigo = "";
	}
	
	if(isset($_REQUEST['pac_name']) && $_REQUEST['pac_name'] != ""){
		$pac_name = strtoupper($_REQUEST['pac_name']);
	}else{
		$pac_name = "";
	}
	
	if(isset($_REQUEST['pac_dataNascimento']) && $_REQUEST['pac_dataNascimento'] != ""){
		$pac_dataNascimento = strtoupper($_REQUEST['pac_dataNascimento']);
	}else{
		$pac_dataNascimento = "";
	}
	
	if(isset($_REQUEST['pac_peso']) && $_REQUEST['pac_peso'] != ""){
		$pac_peso = strtoupper($_REQUEST['pac_peso']);
	}else{
		$pac_peso = "";
	}
	
	if(isset($_REQUEST['pac_telefone']) && $_REQUEST['pac_telefone'] != ""){
		$pac_telefone = strtoupper($_REQUEST['pac_telefone']);
	}else{
		$pac_telefone = "";
	}
	
	if(isset($_REQUEST['pac_endereco']) && $_REQUEST['pac_endereco'] != ""){
		$pac_endereco = strtoupper($_REQUEST['pac_endereco']);
	}else{
		$pac_endereco = "";
	}
	
	if(isset($_REQUEST['pac_cidade']) && $_REQUEST['pac_cidade'] != ""){
		$pac_cidade = strtoupper($_REQUEST['pac_cidade']);
	}else{
		$pac_cidade = "";
	}

	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000031","params":[]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	
	} else if($acao == "autocomplete") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000032","params":[{"name":"pac_name","value":"'.$pac_name.'","type":"other"}]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "selecionar") {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000033","params":[
			{"name":"pac_codigo","value":"'.$pac_codigo.'","type":"integer"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "adicionar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000030","params":[
			{"name":"pac_name","value":"'.$pac_name.'","type":"string"},
			{"name":"pac_dataNascimento","value":"'.date('Y-m-d', strtotime($pac_dataNascimento)).'","type":"string"},
			{"name":"pac_peso","value":"'.$pac_peso.'","type":"integer"},
			{"name":"pac_telefone","value":"'.$pac_telefone.'","type":"string"},
			{"name":"pac_endereco","value":"'.$pac_endereco.'","type":"string"},
			{"name":"pac_cidade","value":"'.$pac_cidade.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "atualizar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000034","params":[
			{"name":"pac_codigo","value":"'.$pac_codigo.'","type":"integer"},
			{"name":"pac_name","value":"'.$pac_name.'","type":"string"},
			{"name":"pac_dataNascimento","value":"'.date('Y-m-d', strtotime($pac_dataNascimento)).'","type":"string"},
			{"name":"pac_peso","value":"'.$pac_peso.'","type":"integer"},
			{"name":"pac_telefone","value":"'.$pac_telefone.'","type":"string"},
			{"name":"pac_endereco","value":"'.$pac_endereco.'","type":"string"},
			{"name":"pac_cidade","value":"'.$pac_cidade.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "remove") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000035","params":[
			{"name":"pac_codigo","value":"'.$pac_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000031","params":[]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	}
?>
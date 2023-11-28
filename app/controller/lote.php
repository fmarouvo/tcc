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
	
	if(isset($_REQUEST['lot_codigo']) && $_REQUEST['lot_codigo'] != ""){
		$lot_codigo = $_REQUEST['lot_codigo'];
	}else{
		$lot_codigo = "";
	}
	
	if(isset($_REQUEST['lot_name']) && $_REQUEST['lot_name'] != ""){
		$lot_name = strtoupper($_REQUEST['lot_name']);
	}else{
		$lot_name = "";
	}
	
	if(isset($_REQUEST['lot_manufacturing']) && $_REQUEST['lot_manufacturing'] != ""){
		$lot_manufacturing = strtoupper($_REQUEST['lot_manufacturing']);
	}else{
		$lot_manufacturing = "";
	}
	
	if(isset($_REQUEST['lot_validate']) && $_REQUEST['lot_validate'] != ""){
		$lot_validate = strtoupper($_REQUEST['lot_validate']);
	}else{
		$lot_validate = "";
	}
	
	if(isset($_REQUEST['lot_barcode']) && $_REQUEST['lot_barcode'] != ""){
		$lot_barcode = strtoupper($_REQUEST['lot_barcode']);
	}else{
		$lot_barcode = "";
	}

	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000061","params":[]}';

		$datapacket->add($filtro);
		$datapacket->debug = true;
		$ret = $datapacket->open();
		print_r(json_encode($ret));
	
	} else if($acao == "autocomplete") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000062","params":[{"name":"lot_name","value":"'.$lot_name.'","type":"other"}]}';

		$datapacket->add($filtro);
		$datapacket->debug = true;
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "selecionar") {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000063","params":[
			{"name":"lot_codigo","value":"'.$lot_codigo.'","type":"integer"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "adicionar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000060","params":[
			{"name":"lot_name","value":"'.$lot_name.'","type":"string"},
			{"name":"lot_manufacturing","value":"'.date('Y-m-d', strtotime($lot_manufacturing)).'","type":"string"},
			{"name":"lot_validate","value":"'.date('Y-m-d', strtotime($lot_validate)).'","type":"string"},
			{"name":"lot_barcode","value":"'.$lot_barcode.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "atualizar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000064","params":[
			{"name":"lot_codigo","value":"'.$lot_codigo.'","type":"integer"},
			{"name":"lot_name","value":"'.$lot_name.'","type":"string"},
			{"name":"lot_manufacturing","value":"'.date('Y-m-d', strtotime($lot_manufacturing)).'","type":"string"},
			{"name":"lot_validate","value":"'.date('Y-m-d', strtotime($lot_validate)).'","type":"string"},
			{"name":"lot_barcode","value":"'.$lot_barcode.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		echo "OK";
	} else if($acao == "remove") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000065","params":[
			{"name":"lot_codigo","value":"'.$lot_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000061","params":[]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	}
?>
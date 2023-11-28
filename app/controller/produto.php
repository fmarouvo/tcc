<?php 
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');

	include 'datapacket.php';
	include 'TParams.class.php';

	$datapacket = new Datapacket();
	$TParams = new TParams();
	$company = $TParams->getCompany();
	$host = "controledeestoque";
	$obj = new StdClass();
	
	if(isset($_REQUEST['acao']) && $_REQUEST['acao'] != ""){
		$acao = $_REQUEST['acao'];
	}else{
		$acao = "";
	}
	
	if(isset($_REQUEST['query']) && $_REQUEST['query'] != ""){
		$query = $_REQUEST['query'];
	}else{
		$query = "";
	}
	
	if(isset($_REQUEST['prd_codigo']) && $_REQUEST['prd_codigo'] != ""){
		$prd_codigo = $_REQUEST['prd_codigo'];
	}else{
		$prd_codigo = "";
	}
	
	if(isset($_REQUEST['prd_name']) && $_REQUEST['prd_name'] != ""){
		$prd_name = strtoupper($_REQUEST['prd_name']);
	}else{
		$prd_name = "";
	}
	
	if(isset($_REQUEST['dcb_codigo']) && $_REQUEST['dcb_codigo'] != ""){
		$dcb_codigo = strtoupper($_REQUEST['dcb_codigo']);
	}else{
		$dcb_codigo = "";
	}
	
	if(isset($_REQUEST['start']) && $_REQUEST['start'] != ""){
		$start = strtoupper($_REQUEST['start']);
	}else{
		$start = 0;
	}

	$obj->start = $_REQUEST['start'];
	
	if(isset($_REQUEST['limit']) && $_REQUEST['limit'] != ""){
		$limit = strtoupper($_REQUEST['limit']);
	}else{
		$limit = 25;
	}

	$obj->limit = $_REQUEST['limit'];

	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000021","params":[]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	
	} else if($acao == "selecionar") {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000023","params":[
			{"name":"prd_codigo","value":"'.$prd_codigo.'","type":"integer"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "adicionar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000020","params":[
			{"name":"prd_name","value":"'.$prd_name.'","type":"string"},
			{"name":"dcb_codigo","value":"'.$dcb_codigo.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "atualizar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000024","params":[
			{"name":"prd_codigo","value":"'.$prd_codigo.'","type":"integer"},
			{"name":"prd_name","value":"'.$prd_name.'","type":"string"},
			{"name":"dcb_codigo","value":"'.$dcb_codigo.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "remove") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000025","params":[
			{"name":"prd_codigo","value":"'.$prd_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else {
		
		
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000022","params":[
			{"name":"prd_name","value":"'.$query.'","type":"other"},
			{"name":"start","value":"'.$start.'","type":"other"},
			{"name":"limit","value":"'.$limit.'","type":"other"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->debug = true;
		$ret = $datapacket->open();
		$obj->debug=$datapacket->getLastQuery();
		$datapacket->clear();
		
		$filtro=json_decode($filtro);
		$filtro->cod='000026';
		$datapacket->add(json_encode($filtro));
		$count = $datapacket->open(true);
		$total = $count[0]->total;
		
		$obj->total=$total;
		$obj->data=$ret;
		$datapacket->clear();
		
		print_r(json_encode($obj));
		
	}
?>
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
	
	if(isset($_REQUEST['prd_name']) && $_REQUEST['prd_name'] != ""){
		$prd_name = $_REQUEST['prd_name'];
	}else{
		$prd_name = "";
	}
	
	if(isset($_REQUEST['est_tipo']) && $_REQUEST['est_tipo'] != ""){
		$est_tipo = $_REQUEST['est_tipo'];
	}else{
		$est_tipo = "";
	}
	
	if(isset($_REQUEST['est_dtinicial']) && $_REQUEST['est_dtinicial'] != ""){
		$est_dtinicial = $_REQUEST['est_dtinicial'];
	}else{
		$est_dtinicial = "";
	}
	
	if(isset($_REQUEST['est_dtfinal']) && $_REQUEST['est_dtfinal'] != ""){
		$est_dtfinal = $_REQUEST['est_dtfinal'];
	}else{
		$est_dtfinal = "";
	}

	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000105","params":[]}';

		$datapacket->add($filtro);
		$datapacket->debug = true;
		$ret = $datapacket->open();
		print_r(json_encode($ret));
	
	} else if($acao == "filtrar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000106","params":[
		{"name":"prd_name","value":"'.$prd_name.'","type":"other"},
		{"name":"est_tipo","value":"'.$est_tipo.'","type":"other"},
		{"name":"est_dtinicial","value":"'.date('Y-m-d', strtotime($est_dtinicial)).'","type":"string"},
		{"name":"est_dtfinal","value":"'.date('Y-m-d', strtotime($est_dtfinal)).'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$datapacket->debug = true;
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} 
?>
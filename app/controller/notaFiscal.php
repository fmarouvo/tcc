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
	
	if(isset($_REQUEST['ntf_codigo']) && $_REQUEST['ntf_codigo'] != ""){
		$ntf_codigo = $_REQUEST['ntf_codigo'];
	}else{
		$ntf_codigo = "";
	}
	
	if(isset($_REQUEST['ntf_numero']) && $_REQUEST['ntf_numero'] != ""){
		$ntf_numero = strtoupper($_REQUEST['ntf_numero']);
	}else{
		$ntf_numero = "";
	}
	
	if(isset($_REQUEST['for_codigo']) && $_REQUEST['for_codigo'] != ""){
		$for_codigo = strtoupper($_REQUEST['for_codigo']);
	}else{
		$for_codigo = "";
	}
	
	if(isset($_REQUEST['for_name']) && $_REQUEST['for_name'] != ""){
		$for_name = strtoupper($_REQUEST['for_name']);
	}else{
		$for_name = "";
	}
	
	if(isset($_REQUEST['ntf_produtos']) && $_REQUEST['ntf_produtos'] != ""){
		$ntf_produtos = $_REQUEST['ntf_produtos'];
	}else{
		$ntf_produtos = "";
	}
	
	if(isset($_REQUEST['ntf_data']) && $_REQUEST['ntf_data'] != ""){
		$ntf_data = $_REQUEST['ntf_data'];
	}else{
		$ntf_data = "";
	}

	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000051","params":[]}';

		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	
	} else if($acao == "autocomplete") {
		if($for_name == "") { 
			$for_name = "%";
		}
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000052","params":[{"name":"for_name","value":"'.$for_name.'","type":"other"}]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "selecionar") {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000053","params":[
			{"name":"ntf_codigo","value":"'.$ntf_codigo.'","type":"integer"}
		]}';

		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "adicionar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000050","params":[
			{"name":"ntf_numero","value":"'.$ntf_numero.'","type":"string"},
			{"name":"for_codigo","value":"'.$for_codigo.'","type":"integer"},
			{"name":"for_name","value":"'.$for_name.'","type":"string"},
			{"name":"ntf_data","value":"'.date('Y-m-d', strtotime($ntf_data)).'","type":"string"},
			{"name":"ntf_produtos","value":"'.$ntf_produtos.'","type":"string"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		$datapacket->clear();
		
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000101","params":[]}';
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		$not_codigo = $ret[0]['ntf_codigo'];
		$datapacket->clear();
		
		$listaProdutos = json_decode(base64_decode($ntf_produtos));

		$size = count($listaProdutos);
		for ($i = 0; $i < $size; $i++) {
			$produto = $listaProdutos[$i];

			$datapacket->setHost($TParams->getHost($host));
			$datapacket->debug = true;
			$filtro = '{"cod":"000100","params":[
				{"name":"prd_codigo","value":"'.$produto->{'prd_codigo'}.'","type":"integer"},
				{"name":"prd_name","value":"'.$produto->{'prd_name'}.'","type":"string"},
				{"name":"est_quantidade","value":"'.$produto->{'prd_quantidade'}.'","type":"integer"},
				{"name":"dcb_codigo","value":"'.$produto->{'dcb_codigo'}.'","type":"string"},
				{"name":"dcb_discriminacao","value":"'.$produto->{'dcb_discriminacao'}.'","type":"string"},
				{"name":"dcb_apresentacao","value":"'.$produto->{'dcb_apresentacao'}.'","type":"string"},
				{"name":"lot_codigo","value":"'.$produto->{'lot_codigo'}.'","type":"integer"},
				{"name":"lot_name","value":"'.$produto->{'lot_name'}.'","type":"string"},
				{"name":"ntf_codigo","value":"'.$not_codigo.'","type":"integer"},
				{"name":"est_data","value":"'.date('Y-m-d', strtotime($ntf_data)).'","type":"string"}
			]}';
			$datapacket->debug = true;
			$datapacket->add($filtro);
			$ret = $datapacket->open();
			$datapacket->clear();
		}

		echo "OK";
	} else if($acao == "atualizar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000054","params":[
			{"name":"ntf_numero","value":"'.$ntf_numero.'","type":"string"},
			{"name":"for_codigo","value":"'.$for_codigo.'","type":"integer"},
			{"name":"for_name","value":"'.$for_name.'","type":"string"},
			{"name":"ntf_data","value":"'.date('Y-m-d', strtotime($ntf_data)).'","type":"string"},
			{"name":"ntf_produtos","value":"'.$ntf_produtos.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		$datapacket->clear();
		
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000104","params":[
			{"name":"ntf_codigo","value":"'.$ntf_codigo.'","type":"integer"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		$datapacket->clear();
		
		$listaProdutos = json_decode(base64_decode($ntf_produtos));

		$size = count($listaProdutos);
		for ($i = 0; $i < $size; $i++) {
			$produto = $listaProdutos[$i];

			$datapacket->setHost($TParams->getHost($host));
			$datapacket->debug = true;
			$filtro = '{"cod":"000100","params":[
				{"name":"prd_codigo","value":"'.$produto->{'prd_codigo'}.'","type":"integer"},
				{"name":"prd_name","value":"'.$produto->{'prd_name'}.'","type":"string"},
				{"name":"est_quantidade","value":"'.$produto->{'prd_quantidade'}.'","type":"integer"},
				{"name":"lot_codigo","value":"'.$produto->{'lot_codigo'}.'","type":"integer"},
				{"name":"lot_name","value":"'.$produto->{'lot_name'}.'","type":"string"},
				{"name":"ntf_codigo","value":"'.$ntf_codigo.'","type":"integer"},
				{"name":"est_data","value":"'.date('Y-m-d', strtotime($ntf_data)).'","type":"string"}
			]}';
			$datapacket->debug = true;
			$datapacket->add($filtro);
			$ret = $datapacket->open();
			$datapacket->clear();
		}
		
		echo "OK";
	} else if($acao == "remove") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000055","params":[
			{"name":"ntf_codigo","value":"'.$ntf_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	}
?>
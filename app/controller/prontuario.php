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
	
	if(isset($_REQUEST['prt_codigo']) && $_REQUEST['prt_codigo'] != ""){
		$prt_codigo = $_REQUEST['prt_codigo'];
	}else{
		$prt_codigo = "";
	}
	
	if(isset($_REQUEST['prt_data']) && $_REQUEST['prt_data'] != ""){
		$prt_data = strtoupper($_REQUEST['prt_data']);
	}else{
		$prt_data = "";
	}
	
	if(isset($_REQUEST['prt_descr']) && $_REQUEST['prt_descr'] != ""){
		$prt_descr = strtoupper($_REQUEST['prt_descr']);
	}else{
		$prt_descr = "";
	}
	
	if(isset($_REQUEST['usu_login']) && $_REQUEST['usu_login'] != ""){
		$usu_login = strtoupper($_REQUEST['usu_login']);
	}else{
		$usu_login = "";
	}
	
	if(isset($_REQUEST['prt_produto']) && $_REQUEST['prt_produto'] != ""){
		$prt_produto = $_REQUEST['prt_produto'];
	}else{
		$prt_produto = "";
	}
	
	if(isset($_REQUEST['pac_codigo']) && $_REQUEST['pac_codigo'] != ""){
		$pac_codigo = $_REQUEST['pac_codigo'];
	}else{
		$pac_codigo = "";
	}
	
	if(isset($_REQUEST['pac_name']) && $_REQUEST['pac_name'] != ""){
		$pac_name = $_REQUEST['pac_name'];
	}else{
		$pac_name = "";
	}
	
	if(isset($_REQUEST['prd_codigo']) && $_REQUEST['prd_codigo'] != ""){
		$prd_codigo = $_REQUEST['prd_codigo'];
	}else{
		$prd_codigo = "";
	}
	
	if(isset($_REQUEST['lot_codigo']) && $_REQUEST['lot_codigo'] != ""){
		$lot_codigo = $_REQUEST['lot_codigo'];
	}else{
		$lot_codigo = "";
	}
	
	if($acao == "listar") {
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000111","params":[]}';

		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	
	} else if($acao == "autocomplete") {
		if($pac_name == "") { 
			$pac_name = "%";
		}
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000112","params":[{"name":"pac_name","value":"'.$pac_name.'","type":"other"}]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "selecionar") {
		$datapacket->setHost($TParams->getHost($host));
		
		$filtro = '{"cod":"000113","params":[
			{"name":"prt_codigo","value":"'.$prt_codigo.'","type":"integer"}
		]}';

		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		print_r(json_encode($ret));
	} else if($acao == "adicionar") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000110","params":[
			{"name":"prt_codigo","value":"'.$prt_codigo.'","type":"integer"},
			{"name":"prt_descr","value":"'.$prt_descr.'","type":"string"},
			{"name":"usu_login","value":"'.$usu_login.'","type":"string"},
			{"name":"prt_data","value":"'.date('Y-m-d', strtotime($prt_data)).'","type":"string"},
			{"name":"prt_produto","value":"'.$prt_produto.'","type":"string"},
			{"name":"pac_codigo","value":"'.$pac_codigo.'","type":"integer"},
			{"name":"pac_name","value":"'.$pac_name.'","type":"string"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		$datapacket->clear();
		
		$datapacket->setHost($TParams->getHost($host));
		$filtro = '{"cod":"000103","params":[]}';
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		$ntf_codigo = $ret[0]['prt_codigo'];
		$datapacket->clear();

		$listaProdutos = json_decode(base64_decode($prt_produto));

		$size = count($listaProdutos);
		for ($i = 0; $i < $size; $i++) {
			$produto = $listaProdutos[$i];

			$datapacket->setHost($TParams->getHost($host));
			$datapacket->debug = true;
			$filtro = '{"cod":"000102","params":[
				{"name":"prd_codigo","value":"'.$produto->{'prd_codigo'}.'","type":"integer"},
				{"name":"prd_name","value":"'.$produto->{'prd_name'}.'","type":"string"},
				{"name":"dcb_codigo","value":"'.$produto->{'dcb_codigo'}.'","type":"string"},
				{"name":"dcb_discriminacao","value":"'.$produto->{'dcb_discriminacao'}.'","type":"string"},
				{"name":"dcb_apresentacao","value":"'.$produto->{'dcb_apresentacao'}.'","type":"string"},
				{"name":"est_quantidade","value":"'.$produto->{'prd_quantidade'}.'","type":"integer"},
				{"name":"lot_codigo","value":"'.$produto->{'lot_codigo'}.'","type":"integer"},
				{"name":"lot_name","value":"'.$produto->{'lot_name'}.'","type":"string"},
				{"name":"ntf_codigo","value":"'.$ntf_codigo.'","type":"integer"},
				{"name":"est_data","value":"'.date('Y-m-d', strtotime($prt_data)).'","type":"string"}
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
		$filtro = '{"cod":"000114","params":[
			{"name":"prt_codigo","value":"'.$prt_codigo.'","type":"integer"},
			{"name":"prt_descr","value":"'.$prt_descr.'","type":"string"},
			{"name":"usu_login","value":"'.$usu_login.'","type":"string"},
			{"name":"prt_data","value":"'.date('Y-m-d', strtotime($prt_data)).'","type":"string"},
			{"name":"prt_produto","value":"'.$prt_produto.'","type":"string"},
			{"name":"pac_codigo","value":"'.$pac_codigo.'","type":"integer"},
			{"name":"pac_name","value":"'.$pac_name.'","type":"string"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		$datapacket->clear();
		
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000104","params":[
			{"name":"ntf_codigo","value":"'.$prt_codigo.'","type":"integer"}
		]}';
		$datapacket->debug = true;
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		$datapacket->clear();
		
		$listaProdutos = json_decode(base64_decode($prt_produto));

		$size = count($listaProdutos);
		for ($i = 0; $i < $size; $i++) {
			$produto = $listaProdutos[$i];

			$datapacket->setHost($TParams->getHost($host));
			$datapacket->debug = true;
			$filtro = '{"cod":"000102","params":[
				{"name":"prd_codigo","value":"'.$produto->{'prd_codigo'}.'","type":"integer"},
				{"name":"prd_name","value":"'.$produto->{'prd_name'}.'","type":"string"},
				{"name":"est_quantidade","value":"'.$produto->{'prd_quantidade'}.'","type":"integer"},
				{"name":"lot_codigo","value":"'.$produto->{'lot_codigo'}.'","type":"integer"},
				{"name":"lot_name","value":"'.$produto->{'lot_name'}.'","type":"string"},
				{"name":"ntf_codigo","value":"'.$prt_codigo.'","type":"integer"},
				{"name":"est_data","value":"'.date('Y-m-d', strtotime($prt_data)).'","type":"string"}
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
		$filtro = '{"cod":"000115","params":[
			{"name":"prt_codigo","value":"'.$prt_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo "OK";
	} else if($acao == "verificarEstoque") {
		$datapacket->setHost($TParams->getHost($host));
		$datapacket->debug = true;
		$filtro = '{"cod":"000116","params":[
			{"name":"prd_codigo","value":"'.$prd_codigo.'","type":"integer"},
			{"name":"lot_codigo","value":"'.$lot_codigo.'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		echo $ret[0]["quantidade"];
	}
?>
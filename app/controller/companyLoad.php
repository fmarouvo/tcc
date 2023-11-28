<?php header('Access-Control-Allow-Origin: *'); header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');
	include 'datapacket.php';
	include 'TParams.class.php';
	
	ob_start();
	
	$datapacket = new Datapacket();
	$TParams = new TParams();
	
	if(!isset($_REQUEST['p'])) $_REQUEST['p']="";
	
	$filtro = '{"cod":"600011","params":[{"name":"emp_codigo","value":"'.base64_decode(substr($_REQUEST['p'],0,1).substr($_REQUEST['p'],2)).'","type":"string"}]}';
	
	$datapacket->setHost($TParams->getHost("controledeestoque"));
	$datapacket->add($filtro);
	$ret = $datapacket->open();
	
	$saida = ob_get_contents();
	ob_clean();
	$pos = strpos($saida, "conseguiu decodificar o JSON.");

	if ($pos === false) {
		print_r(json_encode($ret));
	}else{
		echo "[]";
	}
	
?>
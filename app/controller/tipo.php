<?php 
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');

	include 'datapacket.php';
	include 'TParams.class.php';

	$datapacket = new Datapacket();
	$TParams = new TParams();
	$company = $TParams->getCompany();
	$host = "controledeestoque";

	$datapacket->setHost($TParams->getHost($host));
	$filtro = '{"cod":"000071","params":[]}';

	$datapacket->add($filtro);
	$datapacket->debug = true;
	$ret = $datapacket->open();
	print_r(json_encode($ret));
	
?>
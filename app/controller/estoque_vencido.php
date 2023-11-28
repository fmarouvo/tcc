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
	$filtro = '{"cod":"000120","params":[]}';

	$datapacket->add($filtro);
	$produtosArray = $datapacket->open();

	$count = count($produtosArray);
	
	$array_vencidos = Array();

	$lot_codigo = null;
	$quantidade_inicial = 0;
	$quantidade_saldo = 0;
	$quantidade_utilizada = 0;
	
	$produto = Array ( 
	"est_codigo" => 46, 
	"prd_codigo" => 0, 
	"prd_name" => "PRODUTO 10",
	"dcb_codigo" => 0,
	"dcb_discriminacao" => "",
	"dcb_apresentacao" => "",
	"est_quantidade" => 5, 
	"lot_codigo" => 0,
	"lot_name" => "",
	"est_tipo" => 2,
	"ntf_codigo" => 21,
	"est_data" => "");
	
	$listaDeProdutos = Array();
	$quantidade_utilizada = 0;
	
	for ($i=0; $i<$count; $i++) {

		$produto = $produtosArray[$i];

		if($produto["est_tipo"] == 1) {
			$quantidade_inicial = $produto["est_quantidade"];
			$quantidade_saldo = $produto["est_quantidade"];
			$quantidade_utilizada = 0;
		}
		
		if($produto["est_tipo"] == 0) {
			$quantidade_utilizada += $produto["est_quantidade"];
			$quantidade_saldo -= $produto["est_quantidade"];
		}
		
		if(array_key_exists($produto["lot_codigo"], $listaDeProdutos)) {
			$listaDeProdutos[$produto["lot_codigo"]]["quantidade_saldo"] = $quantidade_saldo;
			$listaDeProdutos[$produto["lot_codigo"]]["quantidade_utilizada"] = $quantidade_utilizada;
		} else {
			$novoProduto = Array();
			$novoProduto["quantidade_inicial"] = $quantidade_inicial;
			$novoProduto["quantidade_saldo"] = $quantidade_saldo;
			$novoProduto["quantidade_utilizada"] = $quantidade_utilizada;
			$novoProduto["lot_codigo"] = $produto["lot_codigo"];
			$novoProduto["prd_codigo"] = $produto["prd_codigo"];
			$novoProduto["est_codigo"] = $produto["est_codigo"];
			$novoProduto["prd_name"] = $produto["prd_name"];
			$novoProduto["dcb_codigo"] = $produto["dcb_codigo"];
			$novoProduto["dcb_discriminacao"] = $produto["dcb_discriminacao"];
			$novoProduto["dcb_apresentacao"] = $produto["dcb_apresentacao"];
			$novoProduto["est_quantidade"] = $produto["est_quantidade"];
			$novoProduto["lot_name"] = $produto["lot_name"];
			$novoProduto["est_tipo"] = $produto["est_tipo"];
			$novoProduto["ntf_codigo"] = $produto["ntf_codigo"];
			$novoProduto["est_data"] = $produto["est_data"];
			$listaDeProdutos[$produto["lot_codigo"]] = $novoProduto;
		}
	}
	
	$listaDeProdutosCount = count($listaDeProdutos);

	foreach($listaDeProdutos as $key => $value) {
		$produtoSelecionado = $listaDeProdutos[$key];

		$datapacket->clear();
		$filtro = '{"cod":"000121","params":[
			{"name":"prd_codigo","value":"'.$produtoSelecionado["prd_codigo"].'","type":"integer"},
			{"name":"lot_codigo","value":"'.$produtoSelecionado["lot_codigo"].'","type":"integer"},
			{"name":"etv_quantidade","value":"'.$produtoSelecionado["quantidade_saldo"].'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();

		$datapacket->clear();
		$filtro = '{"cod":"000122","params":[
			{"name":"prd_codigo","value":"'.$produtoSelecionado['prd_codigo'].'","type":"integer"},
			{"name":"prd_name","value":"'.$produtoSelecionado['prd_name'].'","type":"string"},
			{"name":"dcb_codigo","value":"'.$produtoSelecionado['dcb_codigo'].'","type":"string"},
			{"name":"dcb_discriminacao","value":"'.$produtoSelecionado['dcb_discriminacao'].'","type":"string"},
			{"name":"dcb_apresentacao","value":"'.$produtoSelecionado['dcb_apresentacao'].'","type":"string"},
			{"name":"est_quantidade","value":"'.$produtoSelecionado["quantidade_saldo"].'","type":"integer"},
			{"name":"lot_codigo","value":"'.$produtoSelecionado['lot_codigo'].'","type":"integer"},
			{"name":"lot_name","value":"'.$produtoSelecionado['lot_name'].'","type":"string"},
			{"name":"ntf_codigo","value":"'.$produtoSelecionado['ntf_codigo'].'","type":"integer"},
			{"name":"est_data","value":"'.date('Y-m-d').'","type":"string"}
		]}';
		$datapacket->clear();
		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		$datapacket->clear();
		$filtro = '{"cod":"000123","params":[
			{"name":"lot_codigo","value":"'.$produtoSelecionado["lot_codigo"].'","type":"integer"}
		]}';

		$datapacket->add($filtro);
		$ret = $datapacket->open();
		
		echo "produto: ".$produtoSelecionado["prd_codigo"]." - ".
		"quantidade_inicial: ".$produtoSelecionado["quantidade_inicial"]." - ".
		"quantidade_saldo: ".$produtoSelecionado["quantidade_saldo"]." - ".
		"quantidade_utilizada: ".$produtoSelecionado["quantidade_utilizada"]."<br>";
	}
?>
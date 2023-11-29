<?php
	error_reporting(E_ALL);

	ob_start();
	date_default_timezone_set("America/Sao_Paulo");
	setlocale(LC_ALL, 'pt_BR');
	
	include_once 'datapacket.php';
	include_once 'TParams.class.php';
	include_once 'funcoes.php';
	
	$datapacket = new Datapacket();
	$TParams = new TParams();
	$company = $TParams->getCompany();
	$host = "controledeestoque";
	
	$filtros = "";
	
	$data  = json_decode(base64_decode($_REQUEST['data']));

	$relatorioTitle = "RELATÓRIO DE ESTOQUE";
	$titulo = utf8_decode("RELATÓRIO DE ESTOQUE");
	$data = date('d/m/Y H:i:s');
	include("inc/relatorioCabecalho.php");
	
	$coluna1 = '<div style="height: 35px; float:left; width:50%; text-align:center">NOME DO MEDICAMENTO</div>';
	$coluna2 = '<div style="height: 35px; float:left; width:10%; text-align:center;">ESTOQUE INICIAL</div>';
	$coluna3 = '<div style="height: 35px; float:left; width:10%; text-align:center;">ENTRADA</div>';
	$coluna4 = '<div style="height: 35px; float:left; width:10%; text-align:center;">SAIDA</div>';
	$coluna5 = '<div style="height: 35px; float:left; width:10%; text-align:center;">PERDA</div>';
	$coluna6 = '<div style="height: 35px; float:left; width:10%; text-align:center;">ESTOQUE FINAL</div>';
									
	$objColumn = new stdClass();
	
	$colunas = array(
		$objColumn->column = $coluna1,
		$objColumn->column = $coluna2,
		$objColumn->column = $coluna3,
		$objColumn->column = $coluna4,
		$objColumn->column = $coluna5,
		$objColumn->column = $coluna6
	);
	
	?>
	<div style="width:100%; float:left; background-color: gray;">
	<?php
	
	for($i=0; $i<count($colunas); $i++){
		echo $colunas[$i];
	}
	
	?>
	</div>
	<?php
	
	$datapacket->setHost($TParams->getHost($host));
	$filtro = '{"cod":"000130","params":[]}';

	$datapacket->add($filtro);
	$datapacket->debug = true;

	$ret = $datapacket->open();
	
	for($i=0; $i<count($ret); $i++){
		
		if($i%2 == 0) {
			$class = '"width:100%; background-color: #FFFFFF; height: 35px;"';
		} else {
			$class = '"width:100%; background-color: #F8F8F8; height: 35px";';
		}
		?>
		<div style=<?php echo $class; ?>>
			<div style="text-align: center; float:left; width:50%; height: 35px">&nbsp;<?php echo $ret[$i]["prd_name"]; ?></div>
			<div style="text-align: center; float:left; width:10%; height: 35px">&nbsp;<?php echo $ret[$i]["inicial"]; ?></div>
			<div style="text-align: center; float:left; width:10%; height: 35px">&nbsp;<?php echo $ret[$i]["entrada"]; ?></div>
			<div style="text-align: center; float:left; width:10%; height: 35px">&nbsp;<?php echo $ret[$i]["saida"]; ?></div>
			<div style="text-align: center; float:left; width:10%; height: 35px">&nbsp;<?php echo $ret[$i]["perda"]; ?></div>
			<div style="text-align: center; float:left; width:10%; height: 35px">&nbsp;<?php echo $ret[$i]["final"]; ?></div>
		</div>
		<?php
	}
	
	include "../rel/inc/relatorioRodape.php";

	$html = ob_get_clean();
	$arquivo = str_replace(".", "", microtime(true));

	$fp = fopen($TParams->getRoot()."tmp/".$arquivo.'.html', 'w');
	fwrite($fp, $html);
	fclose($fp);
	echo $TParams->getBrowserRoot()."tmp/".$arquivo.'.html';
	/*exec('phantomjs '.$TParams->getRoot().'class/phantomjs/rasterizeRetrato.js '.$TParams->getHostRoot().'tmp/'.$arquivo.'.html '.$TParams->getRoot().'tmp/'.$arquivo.'.pdf ["5in*7in"]');

	if(file_exists($TParams->getRoot()."tmp/".$arquivo.'.html')){
		echo $TParams->getBrowserRoot()."tmp/".$arquivo.'.html';
	}else{
		echo "Ocorreu um erro ao gerar o arquivo.";
	}*/
	
?>
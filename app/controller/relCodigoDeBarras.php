<?php

	error_reporting(E_ALL);

	ob_start();
	date_default_timezone_set("America/Sao_Paulo");
	setlocale(LC_ALL, 'pt_BR');

	include_once 'datapacket.php';
	include_once 'TParams.class.php';
	include_once 'funcoes.php';

	$Datapacket = new datapacket();
	$Datapacket->debug(true);
	$TParams = new TParams();

	class CodigoDeBarras {
		private $registros = array();

		function __construct($numero){
			$this->codigoDeBarras = array();

			$fino = 1;
			$largo = 3;
			$altura = 20;

			$barcodes[0] = '00110';
			$barcodes[1] = '10001';
			$barcodes[2] = '01001';
			$barcodes[3] = '11000';
			$barcodes[4] = '00101';
			$barcodes[5] = '10100';
			$barcodes[6] = '01100';
			$barcodes[7] = '00011';
			$barcodes[8] = '10010';
			$barcodes[9] = '01010';

			for($f1 = 9; $f1 >= 0; $f1--){
				for($f2 = 9; $f2 >= 0; $f2--){
					$f = ($f1*10)+$f2;
					$texto = '';
					for($i = 1; $i < 6; $i++){
						$texto .= substr($barcodes[$f1], ($i-1), 1).substr($barcodes[$f2] ,($i-1), 1);
					}
					$barcodes[$f] = $texto;
				}
			}

			$barcode = '<div style="float: left; padding: 0px 50px 30px 0px">';
			$barcode .= '<img src="../resources/barcode/p.gif" width="'.$fino.'" height="'.$altura.'" border="0" />';
			$barcode .= '<img src="../resources/barcode/b.gif" width="'.$fino.'" height="'.$altura.'" border="0" />';
			$barcode .= '<img src="../resources/barcode/p.gif" width="'.$fino.'" height="'.$altura.'" border="0" />';
			$barcode .= '<img src="../resources/barcode/b.gif" width="'.$fino.'" height="'.$altura.'" border="0" />';

			$barcode .= '<img ';

			$texto = $numero;

			if((strlen($texto) % 2) <> 0){
				$texto = '0'.$texto;
			}

			while(strlen($texto) > 0){
				$i = round(substr($texto, 0, 2));
				$texto = substr($texto, strlen($texto)-(strlen($texto)-2), (strlen($texto)-2));

				if(isset($barcodes[$i])){
					$f = $barcodes[$i];
				}

				for($i = 1; $i < 11; $i+=2){
					if(substr($f, ($i-1), 1) == '0'){
						$f1 = $fino;
					}else{
						$f1 = $largo;
					}

					$barcode .= 'src="../resources/barcode/p.gif" width="'.$f1.'" height="'.$altura.'" border="0">';
					$barcode .= '<img ';

					if(substr($f, $i, 1) == '0'){
						$f2 = $fino;
					}else{
						$f2 = $largo;
					}

					$barcode .= 'src="../resources/barcode/b.gif" width="'.$f2.'" height="'.$altura.'" border="0">';
					$barcode .= '<img ';
				}
			}
			$barcode .= 'src="../resources/barcode/p.gif" width="'.$largo.'" height="'.$altura.'" border="0" />';
			$barcode .= '<img src="../resources/barcode/b.gif" width="'.$fino.'" height="'.$altura.'" border="0" />';
			$barcode .= '<img src="../resources/barcode/p.gif" width="1" height="'.$altura.'" border="0" />';
			$barcode .= '<br><div style="font-size: 10px; letter-spacing: 5.5px">'.$numero."</div></div>";
			
			$temp = array();
			for($i=0; $i<114; $i++){
				array_push($temp, $barcode);
			}
			$this->codigoDeBarras = $temp;
		}

		function getCodigoDeBarras(){
			return $this->codigoDeBarras;
		}
	}
	
	$numero = "0";
	if(isset($_REQUEST['numero']) && $_REQUEST['numero'] != ""){
		$numero = $_REQUEST['numero'];
	}
	
	ob_start();
	
	include '../rel/inc/relatorioCabecalho.php';
	
	$codigoDeBarras = new CodigoDeBarras($numero);
	$array = $codigoDeBarras->getCodigoDeBarras();
	for($i=0; $i<count($array); $i++){
		echo $array[$i];
	}
	

	include "../rel/inc/relatorioRodape.php";

	$html = ob_get_clean();
	
	if(!is_dir($TParams->getRoot()."tmp/")){
		mkdir($TParams->getRoot()."tmp/", 0777, true);
	}

	$arquivo = str_replace(array(".",","), "", microtime(true));
	$fp = fopen($TParams->getRoot()."tmp/".$arquivo.'.html', 'w');
	fwrite($fp, $html);
	fclose($fp);
	echo $TParams->getBrowserRoot()."tmp/".$arquivo.'.html';
	/*exec('phantomjs '.$TParams->getRoot().'class/phantomjs/rasterizeRetrato.js '.$TParams->getHostRoot().'tmp/'.$arquivo.'.html '.$TParams->getRoot().'tmp/'.$arquivo.'.pdf ["7,5in*5in"]');

	if(file_exists($TParams->getRoot()."tmp/".$arquivo.'.pdf')){
		echo $TParams->getBrowserRoot()."tmp/".$arquivo.'.pdf';
	}else{
		echo "Ocorreu um erro ao gerar o arquivo.";
	}*/

	?>
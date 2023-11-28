<?php header('Access-Control-Allow-Origin: *'); header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');

	function abreviar_nome($nome) {
		if (strlen($nome) >= 36) {
			$partes_nome = explode(" ", trim($nome));
			$totalPago = count($partes_nome);
			$vetor_ignora = array('de', 'da', 'das', 'do', 'dos', 'no');
			$nome_abrv = '';
			foreach ($partes_nome as $indice => $palavras) {
				if (in_array($palavras, $vetor_ignora)) {
					$nome_abrv .= " " . $palavras;
				} else {
					if (($indice >= 2) and ($indice <= ($totalPago - 2))) {
						$nome_abrv.= " " . strtoupper(substr($palavras, 0, 1)) . ".";
					}
				}
			}
			$abreviado = ucwords(strtolower($partes_nome[0] . ' ' . $partes_nome[1])) . " " . ucwords(strtolower($nome_abrv)) . " " . ucwords(strtolower($partes_nome[$totalPago - 1]));
		} else {
			$abreviado = ucwords(strtolower($nome));
		}
		return $abreviado;
	}

	function data($data, $bd=false, $delimiter="-"){
		if (isset($data)){
			if(strpos($data, "T")){
				if($bd){
					$data = explode("T", $data);
					$data = $data[0];
					$data = explode($delimiter, $data);
					$data = $data[0] . "-" . $data[1] . "-" . $data[2];
				}else{
					$data = explode("T", $data);
					$data = $data[0];
					$data = explode($delimiter, $data);
					$data = $data[2] . "/" . $data[1] . "/" . $data[0];
				}
				return $data;
			}else{
				if($bd){
					$data = explode(" ", $data);
					$data = $data[0];
					$data = explode($delimiter, $data);
					$data = $data[2] . "-" . $data[1] . "-" . $data[0];
				}else{
					$data = explode(" ", $data);
					$data = $data[0];
					$data = explode($delimiter, $data);
					$data = $data[2] . "/" . $data[1] . "/" . $data[0];
				}
				return $data;
			}
		}
	}

	function data_ctt($data){
		$aux = explode("-", $data);
		return $aux[2]."/".$aux[1]."/".$aux[0];
	}

	function maskCNPJCPF($str){
		if(!empty($str)){
			if(strlen($str)==11){
				$cpfCnpj = substr($str,0,3).'.'.substr($str,3,3).'.'.substr($str,6,3).'-'.substr($str,9,2);
			}else if(strlen($str)==14){
				$cpfCnpj = substr($str,0,2).'.'.substr($str,2,3).'.'.substr($str,5,3).'/'.substr($str,8,4).'-'.substr($str,12,2);
			}else{
				$cpfCnpj = $str;
			}
		}else{
			$cpfCnpj = "";	
		}
		return $cpfCnpj;
	}
	
	function valorFormat($valor, $negativo = false){
		if(isset($valor) && !empty($valor) && $valor > 0 || $negativo == true){
			if($valor < 0.01 && $negativo == false){
				$valor = ceil($valor)/100;
				$valor = floatval(($valor*100))/100;
				$valor = number_format($valor,2,",",".");
			}else{
				$valor = floatval(($valor*100))/100;
				$valor = number_format($valor,2,",",".");
			}
		}else{
			$valor = "0,00";
		}
		return $valor;
	}

	function valorFormatDuasCasas($valor){
		if($valor != 0){
			$valor = number_format($valor,2,",",".");
		}else{
			$valor = "0,00";
		}
		$aux = explode(',', $valor);
		$valor = $aux[0].','.substr($aux[1],0,2);
		return $valor;
	}
	
	function formatarPercentual($valor){
		$res = explode(".",$valor);
		if($res[1] == "00"){
			$res = $res[0] . "%";
		}else if($res[1] != "00"){
			$res = $res[0] .",".substr($res[1],0,2). "%";
		}
		return $res;
	}

	function abrevia($str){
		$find=array('NOTA','FISCAL','PARCELA','De','Da','Das','Do','Dos','No');
		$replace=array('N.','F.','Parc.','de','da','das','do','dos','no');
		$res=str_replace($find,$replace,$str);
		$res = ucwords(strtolower($res));
		$res=str_replace($find,$replace,$res);
		return $res;
	}

	function qtde($qtde){
		$qtde = explode('.',$qtde);
		return $qtde[0];
	}

	function qtdeSemZero($qtde){
		$qtde = explode('.',$qtde);
		if($qtde[0] == 0){
			return "";
		}else{
			return $qtde[0];
		}
	}

	function qtdeV($qtde){
		$qtde = explode(',',$qtde);
		return $qtde[0];
	}

	function valorVazio($campo){
		if(empty($campo)){
			$campo = "&nbsp";
		}
		return $campo;
	}
	
	function valorNegativo($val){
		$ret = ($val * -1);
		return $ret;
	}
	
	function valorNN($val){
		return str_replace("-", "", $val);
	}

	function valorPositivo($val){
		if($val < 0){
			return 0;
		}
		return $val;
	}

	function valorNull($val){
		if($val==0||empty($val)){
			return "&nbsp";
		}
	}

	//data no formato brasileiro
	function dataNormal($data) {
		if (!empty($data)){
			$data = explode(" ", $data);
			$data = $data[0];
			$data = explode("-", $data);
			$data = $data[2] . "/" . $data[1] . "/" . substr($data[0], 2, 2);
			return $data;
		}
	}

	function dataComHoras($data) {
		if (!empty($data)){
			$datax = explode(" ", $data);
			$data = $datax[0];
			$data = explode("-", $data);
			$data = $data[2] . "/" . $data[1] . "/" . substr($data[0], 2, 2);

			return $data.' '.$datax[1];
		}
	}

	//data no formato banco de dados
	function dataBd($data) {
		if (isset($data)){
			$data = explode("T", $data);
			$data = $data[0];
			return $data;
		}
	}

	function dataBdcomhoras_ini($data) {
		if (isset($data)){
			$data = explode("T", $data);
			$data = $data[0];
			return $data." 00:00:00";
		}
	}

	function dataBdcomhoras_fim($data) {
		if (isset($data)){
			$data = explode("T", $data);
			$data = $data[0];
			return $data." 23:59:59";
		}
	}

	function dataBdcombarra($data) {
		if (isset($data)){
			$data = explode("/", $data);
			$data = $data[2]."-".$data[1]."-".$data[0];
			return $data;
		}
	}

	function dataBdcombarraHoras($data) {
		if (isset($data)){
			$data = explode("/", $data);
			$data = $data[2]."-".$data[1]."-".$data[0]." ".date('H:i:s');
			return $data;
		}
	}

	function valorFormatquant($campo){
		$res = array();
		$res = explode(".",$campo);
		if(count($res) > 1){
			$campo = str_replace(',','',$res[0]).",".substr($res[1],0,2);
		}else{
			$campo = str_replace(',','',$res[0]).",00";
		}
		return $campo;
	}

	function removeEspeciais($string){
		$retorno = "";
		for($a=0; $a<=count($string); $a++){
			if(isset($string[$a])){
				$retorno.= preg_replace("/[^a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÒÖÚÇÑ$]/", "", $string[$a])."  ";
			}
		}
		return $retorno;
	}

	function cep($cep){

   		if(!empty($cep)){

   			$cep = substr($cep, 0, 5) . '-' . substr($cep, 5, 3);
   		}
	   	return $cep;
	}

	function extenso($valor=0, $maiusculas=false) {
		// verifica se tem virgula decimal
		if (strpos($valor, ",") > 0) {
			// retira o ponto de milhar, se tiver
			$valor = str_replace(".", "", $valor);

			// troca a virgula decimal por ponto decimal
			$valor = str_replace(",", ".", $valor);
		}
		$singular = array("centavo", "real", "mil", "milhão", "bilhão", "trilhão", "quatrilhão");
		$plural = array("centavos", "reais", "mil", "milhões", "bilhões", "trilhões", "quatrilhões");
		$c = array("", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos");
		$d = array("", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa");
		$d10 = array("dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezesete", "dezoito", "dezenove");
		$u = array("", "hum", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove");

		$z = 0;
		if($valor != 0){
			$valor = number_format($valor, 2, ".", ".");
		}
		$inteiro = explode(".", $valor);
		$cont = count($inteiro);
		for ($i = 0; $i < $cont; $i++){
			for ($ii = strlen($inteiro[$i]); $ii < 3; $ii++){
				$inteiro[$i] = "0" . $inteiro[$i];			
			}
		}

		$fim = $cont - ($inteiro[$cont - 1] > 0 ? 1 : 2);
		$rt = '';
		for ($i = 0; $i < $cont; $i++) {
			$valor = $inteiro[$i];
			$rc = (($valor > 100) && ($valor < 200)) ? "cento" : $c[$valor[0]];
			$rd = ($valor[1] < 2) ? "" : $d[$valor[1]];
			$ru = ($valor > 0) ? (($valor[1] == 1) ? $d10[$valor[2]] : $u[$valor[2]]) : "";

			$r = $rc . (($rc && ($rd || $ru)) ? " e " : "") . $rd . (($rd &&
					$ru) ? " e " : "") . $ru;
			$t = $cont - 1 - $i;
			$r .= $r ? " " . ($valor > 1 ? $plural[$t] : $singular[$t]) : "";
			if ($valor == "000"){
				$z++; 
			}else if($z > 0){
				$z--;
			}
			if (($t == 1) && ($z > 0) && ($inteiro[0] > 0)){
				$r .= ( ($z > 1) ? " de " : "") . $plural[$t];
			}
			if ($r){
				$rt = $rt . ((($i > 0) && ($i <= $fim) && ($inteiro[0] > 0) && ($z < 1)) ? ( ($i < $fim) ? ", " : " e ") : " ") . $r;
			}
		}
		
		if (!$maiusculas) {
			return($rt ? $rt : "zero");
		} elseif ($maiusculas == "2") {
			return (strtoupper($rt) ? strtoupper($rt) : "Zero");
		} else {
			return (ucwords($rt) ? ucwords($rt) : "Zero");
		}
	}
	
	function telefone($telefone){
		$ddd = substr($telefone,0,2);
		$fone1 = substr($telefone,2,4);
		$fone2 = substr($telefone,6,9);
		return "(".$ddd.") ".$fone1."-".$fone2; 
	}
	
	function formataCEP($cep){
		$valor = str_replace(array('.','-',','),'',trim($cep));
		$tam = strlen($valor);
		$resultado = "";
		if($tam==8){
			$p1 = substr($valor,0,5);
			$p2 = substr($valor,5,3);
			$resultado = $p1."-".$p2;
		}
		return $resultado;
	}

	function tele($telefone){
		if(empty($telefone)) return "";
		$ddd = substr($telefone,0,2);
		$fone1 = substr($telefone,2,4);
		$fone2 = substr($telefone,6,9);
		return "(".$ddd.") ".$fone1."-".$fone2; 
	}

	function saldo($areceber, $apagar){
		if($areceber > $apagar){
			$operador = "+";
		}else{
			$operador = "";
		}
		
		return $operador;
	}

	function unicode_convert($string_to_decode = ""){
		if(empty($string_to_decode)) return "";
		$before = array("\u00c0", "\u00c1", "\u00c2", "\u00c3", "\u00c4", "\u00c5", "\u00c6", "\u00c7", "\u00c8", "\u00c9", "\u00ca", "\u00cb", "\u00cc", "\u00cd", "\u00ce", "\u00cf", "\u00d1", "\u00d2", "\u00d3", "\u00d4", "\u00d5", "\u00d6", "\u00d8", "\u00d9", "\u00da", "\u00db", "\u00dc", "\u00dd", "\u00df", "\u00e0", "\u00e1", "\u00e2", "\u00e3", "\u00e4", "\u00e5", "\u00e6", "\u00e7", "\u00e8", "\u00e9", "\u00ea", "\u00eb", "\u00ec", "\u00ed", "\u00ee", "\u00ef", "\u00f0", "\u00f1", "\u00f2", "\u00f3", "\u00f4", "\u00f5", "\u00f6", "\u00f8", "\u00f9", "\u00fa", "\u00fb", "\u00fc", "\u00fd", "\u00ff", "\u200b");
		$after = array("À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "ø", "ù", "ú", "û", "ü", "ý", "ÿ", "");      
		return str_replace($before, $after, $string_to_decode);
	}

	function tipoDocumento($argumento){
		switch ($argumento){
			case 1:
				$tipo = 'DUPLICATA';
				break;
			case 2:
				$tipo = 'BOLETO';
				break;
			case 3:
				$tipo = 'PROMISSÓRIA';
				break;
			case 4:
				$tipo = 'CHEQUE';
				break;
			case 5:
				$tipo = 'CARTÃO CRED.';
				break;
			case 6:
				$tipo = 'CARTÃO DEB.';
				break;
			case 7:
				$tipo = 'CARNE';
				break;
			case 8:
				$tipo = 'DARF';
				break;
			case 9:
				$tipo = 'DEP. EM CONTA';
				break;
			case 10:
				$tipo = 'DINHEIRO';
				break;
			case 11:
				$tipo = 'DEB. EM CONTA';
				break;
			case 12:
				$tipo = 'FATURA';
				break;
			default:
				$tipo = 'OUTRO';
		  	break;
		}
		
		return $tipo;
	}

	function pagarReceber($param){
		if($param==1){
			$valor = "PAGAR";
		}else if($param==2){
			$valor = "RECEBER";
		}else{
			$valor = "OUTRO";
		}
		
		return $valor;
	}

	/*
	*	$array: array a ser pesquisado;
	*	$atributo: atributo do array para comparar;
	*	$valor: valor a ser comparado;
	*	$retorno: true -> indice; false -> bool;
	*/
	function objectInArray($array="", $atributo="", $valor="", $retorno=false) {

		if(empty($array) || empty($atributo) || empty($valor)) return false;

		foreach($array as $key => $value) {

			if($value->$atributo == $valor) {
				
				return ($retorno) ? $key : true;
			}	
		}

		return false;
	}

	function mes($mes){

		if(!empty($mes)){

			switch ($mes) {
				case 1:
					return "Janeiro";
					break;
				case 2:
					return "Fevereiro";
					break;
				case 3:
					return "Março";
					break;
				case 4:
					return "Abril";
					break;
				case 5:
					return "Maio";
					break;
				case 6:
					return "Junho";
					break;
				case 7:
					return "Julho";
					break;
				case 8:
					return "Agosto";
					break;
				case 9:
					return "Setembro";
					break;
				case 10:
					return "Outubro";
					break;
				case 11:
					return "Novembro";
					break;
				case 12:
					return "Dezembro";
					break;
			}

		}
	}

	function ordenacao($array, $field, $ordem = "asc"){

		if(!empty($array)){

			for($i = 0; $i < count($array) - 1; $i++){
				
				for($j = $i + 1; $j < count($array); $j++){

					if($ordem == "asc"){

						if($array[$i]->$field > $array[$j]->$field){

							$aux = $array[$i];
							$array[$i] = $array[$j];
							$array[$j] = $aux;
						}

					} else {

						if($array[$j]->$field > $array[$i]->$field){

							$aux = $array[$j];
							$array[$j] = $array[$i];
							$array[$i] = $aux;
						}
					}
				}
			}
		}
		
		return $array;
	}

 ?>
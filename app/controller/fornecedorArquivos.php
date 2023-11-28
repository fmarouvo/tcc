<?php 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');

	include 'TParams.class.php';
	
	$datapacket = new TParams();
	$uploaddir = $datapacket->uploads."/";
	$for_codigo = 0;
	if(isset($_REQUEST['for_codigo']) && $_REQUEST['for_codigo'] != ""){
		$for_codigo = $_REQUEST['for_codigo'];
	}
	if ( isset($_REQUEST['acao']) && $_REQUEST['acao'] == "fornecedor"){
		if( isset($_FILES['for_arquivo']['tmp_name']) ){
			if (!is_dir($uploaddir.$for_codigo))   mkdir($uploaddir.$for_codigo, 0777, true);
			$extensao = array_reverse(explode(".", $_FILES['for_arquivo']['name']));
			$nome = $extensao[1];
			$extensao = strtolower($extensao[0]);
			
			if($extensao=="jpg" || $extensao=="jpeg" || $extensao=="png" || $extensao=="gif" || $extensao=="doc" || $extensao=="docx" || $extensao=="pdf"  || $extensao=="odt"){
			
				$array1 = array(" ", "á", "à", "ã", "â", "Á", "À", "Ã", "Â", "é", "ê", "É", "Ê", "í", "Í", "ó", "õ", "ô", "Ó", "Ô", "Õ", "ú", "ü", "Ú", "Ü", "ç", "Ç");
				$array2 = array("_", "a", "a", "a", "a", "A", "A", "A", "A", "e", "e", "E", "E", "i", "I", "o", "o", "o", "O", "O", "O", "u", "u", "U", "U", "c", "C");
				$arq = str_replace($array1, $array2, $_FILES['for_arquivo']['name']);
				$nome = str_replace($array1, $array2, $nome);
	
				if(@move_uploaded_file($_FILES['for_arquivo']['tmp_name'], $uploaddir.$for_codigo."/".$arq)){
					echo '{"success":"true", "msg":"'.$arq.'"}';
				}
				
			}else{
				
				echo "Erro! Somente são aceitos arquivos com extensão: jpg, png ou gif";
				
			}
		
		}
	} else if(isset($_REQUEST['acao']) && $_REQUEST['acao'] == "read"){
		$files = array_diff(scandir($uploaddir.$for_codigo), array('..', '.'));
		$filesArray = "";
		foreach($files as $file) {
			if($filesArray == "") {
				$filesArray .= '[{arq_name: "'.$file.'"}';
			} else {
				$filesArray .= ',{arq_name: "'.$file.'"}';
			}
		}
		$filesArray .= "]";
		echo $filesArray;
	} else if(isset($_REQUEST['acao']) && $_REQUEST['acao'] == "remove"){
		if(isset($_REQUEST['arq_name']) && $_REQUEST['arq_name'] != ""){
			$arq_name = $_REQUEST['arq_name'];
			if(array_map('unlink', glob($uploaddir.$for_codigo."/".$arq_name))) {
				echo "OK";
			} else { 
				echo "Erro ao tentar excluir o arquivo.";
			}
		}
	}

?>
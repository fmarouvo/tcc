<?php 
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');
	class Datapacket {

		private static $instance = null;
		private static $dbType 	 = "mysql";
		//private static $dbSys 	 = "ControleDeEstoque";
		private static $dbSys 	 = "controledeestoque";

		public $debug  = false;
		public $filtro = array();

		private $host 		= "";
		private $user 		= "";
		private $senha 		= "";
		private $db 		= "";
		private $filSel		= array();
		private $ret		= array();
		private $historic	= array();
		private $query		= '';
		private $dbObj;
		
		protected static $persistent = false;
		
		private static function ordenaParams($a,$b){

			if(strlen($a->name)==strlen($b->name)){
				return 0;
			}

			if(strlen($a->name)>strlen($b->name)){
				return -1;
			}else{
				return 1;
			}

		}

		private function normalize($string) {
			$table = array(
				'Š'=>'S', 'š'=>'S', 'Đ'=>'DJ', 'đ'=>'DJ', 'Ž'=>'Z', 'ž'=>'Z', 'Č'=>'C', 'č'=>'C', 'Ć'=>'C', 'ć'=>'C',
				'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
				'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O',
				'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U', 'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'SS',
				'à'=>'A', 'á'=>'A', 'â'=>'A', 'ã'=>'A', 'ä'=>'A', 'å'=>'A', 'æ'=>'A', 'ç'=>'C', 'è'=>'E', 'é'=>'E',
				'ê'=>'E', 'ë'=>'E', 'ì'=>'I', 'í'=>'I', 'î'=>'I', 'ï'=>'I', 'ð'=>'O', 'ñ'=>'N', 'ò'=>'O', 'ó'=>'O',
				'ô'=>'O', 'õ'=>'O', 'ö'=>'O', 'ø'=>'O', 'ù'=>'U', 'ú'=>'U', 'û'=>'U', 'ý'=>'Y', 'ý'=>'Y', 'þ'=>'B',
				'ÿ'=>'Y', 'Ŕ'=>'R', 'ŕ'=>'R',
			);
		   
			return strtr($string, $table);
		}

		private function queryRise($query){


			if(gettype($this->filSel->params)!="array"){
			
				echo "O params deve ser um array, mesmo que vazio.<br>";
				
			} else {
			
				if(count($this->filSel->params)>0){
				
					usort($this->filSel->params,'self::ordenaParams');

					foreach($this->filSel->params as $params){

						if($params->type=='string'){
							$query = str_replace('-}'.$params->name,"'".$params->value."'",$query);
						}elseif($params->type=='integer'){
							$query = str_replace('-}'.$params->name,(int)$params->value,$query,$cnt);
						}elseif($params->type=='other'){
							$query = str_replace('-}'.$params->name,$params->value,$query);
						}elseif($params->type=='float'){
							$query = str_replace('-}'.$params->name,$params->value,$query);
						}

					}
					
				}			

			}
	
			if($execQuery = $this->dbObj->query($query)){

				if(strtolower(substr($query,0,6))!='select'){
					$retorno = 'Template '.$this->filSel->cod.': OK';
				}else{

					$retorno = $execQuery->fetchAll(PDO::FETCH_ASSOC);
				}
				
				array_unshift($this->ret,$retorno);

			}else{
				if($this->debug===true){
					echo "Erro: A query não foi executada com sucesso.<br>.".json_encode(self::$instance->errorInfo())."<br>".$query."<br>TP: ".$this->filSel->cod."<br><br>";
				}else{
					echo $this->getError(json_encode(self::$instance->errorInfo()).$query)."<br>";
				}
			}

			$this->dbObj->connection = null;
			$this->query = $query;
			
			return $query;
			
		}

		private function getError($str){
			$isFk = strpos($str,'FOREIGN KEY');

			if($isFk>0){
				$campo = strpos($str,'FOREIGN KEY');
				$campoFim = strpos($str,'`) REF');
				$references = strpos($str,'REFERENCES');
				$referencesFim = strpos($str,'` (`');

				$tabela = substr($str,$references+12,$referencesFim-($references+12));
				$nomeCampo = substr($str,$campo+14,$campoFim-($campo+14));

				$tabelas = array(
					'usuario'=>'Usuario',
				);

				$str = strstr($str, '"]',false);

				$ponteiroUm = strpos($str,'(');
				$posteiroDois = strpos($str,')');

				$strUm = substr($str,$ponteiroUm+1,$posteiroDois-($ponteiroUm+1));
				$strUm = str_replace(" ","",$strUm);
				$arrayUm = explode(",",$strUm);

				$strDois = strstr($str, 's (',false);
				$strDois = substr($strDois,3,-1);
				$strDois = str_replace(", ",",",$strDois);
				$arrayDois = explode(",",$strDois);

				$array = array_combine($arrayUm,$arrayDois);

				// return "O valor ".$array['loc_codigo']." não está cadastrado no módulo: ".$tabelas[$tabela];
				return "<span style='color:#ff0000;'>O valor ".$array[$nomeCampo]." não está cadastrado no módulo: ".$tabelas[$tabela]."</span>";

			}

		}
		
		private function getTemplate(){
			foreach($this->filtro as $filtro){

				if($filtro = json_decode($filtro)){
					
					$this->filSel = $filtro;
					$template 	  = $filtro->cod;

					try{
						$this->dbObj = Datapacket::getInstance();
						// $tpQuery  = "select * from ".self::$dbSys.".template where tpl_codigo='".$template."'";
						$tpQuery  	 = "select * from template where query_cod='".$template."'";

						if($tpQuery = $this->dbObj->query($tpQuery)){

							$tpRet 		= $tpQuery->fetchAll(PDO::FETCH_ASSOC);
							$qryMontada	= $tpQuery->queryString;
							// $qrySel	= $tpRet[0]['tpl_query'];
							if(count($tpRet)>0){
								$qrySel	= $tpRet[0]['query_sql'];
								$this->queryRise($qrySel);
							}else{
								echo "Erro: A template não foi encontrada.<br>".$template."<br>";
							}
						}else{
							echo "Erro: A query para selecionar a template não foi executada com sucesso.<br>";
						}

					}catch(PDOException $e){
						echo "Erro: ".$e->getMessage();
					}
				}else{
					echo "A classe não conseguiu decodificar o JSON.<br><br>";
				}
			}		
		}
		
		public static function close(){
			
			if (self::$instance!=null){
				self::$instance = null;
			}

		}

		public function setHost($params){
		
			if($params[3]!=$this->db){
				$params = explode(":",$params);
				$this->host	 = $params[0];
				$this->user	 = $params[1];
				$this->senha = $params[2];
				$this->db	 = $params[3];
				
				self::$instance = null;
				$this->getInstance();
			}
		
		}
		
		public function debug($param){
			$this->debug=$param;
		}
		 
		private function getInstance(){

			if(self::$persistent != false){
				self::$persistent = true;
			}
			
			if(!isset(self::$instance)){
				try {

					self::$instance = new PDO(self::$dbType.':host='.$this->host.';dbname='.$this->db,$this->user,$this->senha,array(PDO::ATTR_PERSISTENT=>self::$persistent));

				}catch(PDOException $ex) {
					exit ("Erro ao tentar se conectar com o banco de dados: " . $ex->getMessage());
				}
			}

			return self::$instance;

		}

		public function add($filtro){
			array_unshift($this->filtro,$this->normalize($filtro));
			//echo $this->normalize($filtro);
		}

		public function open($json=false){

			self::getTemplate();

			$this->ret = $this->ret[0];
			
			if(gettype($json)=="string"){
				$strRet = '{"'.$json.'":'.json_encode($this->ret).'}';
				$strRet = preg_replace('/\x03/', '', $strRet);
				$this->ret = json_decode($strRet, false);
			}else if($json==true){
				$strRet = json_encode($this->ret);
				$strRet = preg_replace('/\x03/', '', $strRet);
				$this->ret = json_decode($strRet, false);
			}else{
				$strRet = json_encode($this->ret);
				$strRet = preg_replace('/\x03/', '', $strRet);
				$this->ret = json_decode($strRet, true);
			}			
			
			return $this->ret;
			
		}
		
		public function getJson($json=false){
			
			self::getTemplate();

			$this->ret = $this->ret[0];

			$strRet = json_encode($this->ret);
			$strRet = preg_replace('/\x03/', '', $strRet);
			$this->ret = json_decode($strRet, FALSE);

			$jsonRet = new stdClass();
			$jsonRet->success = 'true';
			/*$jsonRet->message = 'A consulta foi executada com sucesso';*/
			$jsonRet->data	  = $this->ret;
			$jsonRet->total	  = count($this->ret);
			
			if($json==false){
				$jsonRet = json_encode($jsonRet);
			}
			
			return $jsonRet;
			
		}
		
		public function getRecordCount(){
			return count($this->ret);
		}
		
		public function clear(){
		
			if($this->db!=""){
				$pdoObjt = array(
					"query" => $this->query,
					"rowdata" => $this->ret,
					"filtro"	=> $this->filtro
				);
				array_unshift($this->historic,$pdoObjt);
			}

			$this->ret		 = array();
			$this->filtro	 = array();
			$this->filSel 	 = array();
			$this->query 	 = '';
		}
		
		public function getLastQuery(){
			return "getLastQuery = ".$this->query;
		}
		
		public function getHistoric(){
			return $this->historic;
		}
		
		public function getFilter(){
			return $this->filtro;
		}
		
	}
	
	/*
		Utilização:
		1 - declarar a classe Datapacket
		2 - inserir o host de conexao
		3 - inserir um ou mais filtros
		4 - abrir a conexao (isto abrirá a conexão e percorrerá os filtros adicionados retornando um array ou um objeto
			4.1 - o método open aceita um parametro que controla o tipo do retorno. Default false = retorna um array, true = retorna um objeto.

		//1
		$datapacket = new Datapacket();	
		//2
		$datapacket->setHost('192.168.1.246:adm:adm@123:fausto');
		//3
		$datapacket->add('{"cod":"000001","params":[{"name":"usu_codigo","value":"1","type":"integer"},{"name":"usu_codigob","value":"2","type":"integer"}]}');
		//4
		$ret = $datapacket->open(true); ou open(propriedade [string]) para retornar um json com uma propriedade 
	*/
?>
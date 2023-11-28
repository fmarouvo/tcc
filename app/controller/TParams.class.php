<?php 
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');

	require_once 'datapacket.php';

	class TParams extends Datapacket {

		private $dbSge = "e9997";
		private $dbComum = "e9997_comum";
		private $codigo = "DEMO";
		private $cpfcnpj = "";
		private $company = "";
		private $HostRoot = "";
		public  $uploads  = "/home/development/playground/";

		public function __construct(){
			// $url = $_SERVER['REQUEST_URI'];
			// $pos = strrpos($url,'p=');
			// $code = base64_decode(substr(substr($url,$pos+2,strlen($url)),0,1).substr(substr($url,$pos+2,strlen($url)),2,strlen($url)));
			if(isset($_REQUEST["p"]) && $_REQUEST["p"]!=''){
				$code = base64_decode(substr($_REQUEST["p"],0,1).substr($_REQUEST["p"],2,strlen($_REQUEST["p"])));

				$filtro = '{"cod":"600011","params":[{"name":"emp_codigo","value":"'.$code.'","type":"string"}]}';
				
				Datapacket::setHost($this->getHost("controledeestoque"));
				Datapacket::add($filtro);
				$ret = Datapacket::open(true);

				$this->dbSge = $ret[0]->emp_db_sge;
				$this->dbComum = $ret[0]->emp_db_comum;
				$this->codigo = $ret[0]->emp_codigo;
				$this->cpfcnpj = $ret[0]->emp_cpfcnpj;
				$this->company = $ret[0];
			}
			
			$this->uploads = "c:/dev/controleEstoque//uploads/";
						
			$lastBar = strrpos($_SERVER['REQUEST_URI'],"/");
			$lastBar = $lastBar-4;
			
			$this->HostRoot ="file:///c:/dev/controleEstoque/";
			$this->Root = "c:/dev/controleEstoque/";
			$this->BrowserRoot = "http://localhost/controleEstoque/";
			$this->uploads2 = "http://localhost/controleEstoque/uploads/";
			
		}
		
		public function getDb(){
			return $this->dbComum;
		}
		
		public function getDbSge(){
			return $this->dbSge;
		}
		
		public function getCodigo(){
			return $this->codigo;
		}

		public function getHost($db){
			return "localhost:adm:adm@123:".$db;
		}
		
		public function getCompany(){
			return $this->company;
		}

		public function getRoot(){
			return $this->Root;
		}
		
		public function getHostRoot(){
			return $this->HostRoot;
		}
		
		public function getBrowserRoot(){
			return $this->BrowserRoot;
		}

		public function getCpfCnpj(){
			return $this->cpfcnpj;
		}

	}
?>
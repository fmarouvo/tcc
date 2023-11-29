-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 29-Nov-2023 às 02:19
-- Versão do servidor: 5.7.14-log
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `controledeestoque`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `emp_codigo` varchar(20) NOT NULL,
  `emp_razao` varchar(80) DEFAULT NULL,
  `emp_fantasia` varchar(80) DEFAULT NULL,
  `emp_db_sge` varchar(20) DEFAULT NULL COMMENT 'cadastro +fks\nproduto + fks\n',
  `emp_db_comum` varchar(20) DEFAULT NULL,
  `emp_endereco` varchar(80) DEFAULT NULL,
  `emp_complem` varchar(45) DEFAULT NULL,
  `emp_bairro` varchar(45) DEFAULT NULL,
  `emp_cidade` varchar(45) DEFAULT NULL,
  `emp_uf` varchar(2) DEFAULT NULL,
  `emp_fone` varchar(15) DEFAULT NULL,
  `emp_fax` varchar(15) DEFAULT NULL,
  `emp_cel` varchar(15) DEFAULT NULL,
  `emp_logo` varchar(250) DEFAULT NULL,
  `emp_status` smallint(6) DEFAULT NULL COMMENT '0=ok\n9=bloqueado\n',
  `emp_obs` text,
  `emp_msg` text COMMENT 'mensagem para o cliente\n',
  `emp_sistema` smallint(6) DEFAULT NULL COMMENT '10=FATURAMENTO\n20=FABRICA\n30=FINANCEIRO\n40=FATURAM + FABRICA\n50=FABRICA + FINANC\n60=FATURAM + FABRICA + FINANC\n\nmax=99',
  `emp_codigo_pai` varchar(20) DEFAULT NULL,
  `emp_cnae` varchar(9) DEFAULT NULL,
  `emp_codregtrib` smallint(6) DEFAULT NULL COMMENT '1-Simples Nacional\\r\\n 2-Simples Nacional C/ Excesso\\r\\n3-Regime Normal',
  `emp_maskcc` varchar(20) NOT NULL,
  `emp_maskpc` varchar(20) DEFAULT NULL,
  `emp_cpfcnpj` varchar(20) DEFAULT NULL,
  `emp_bancos` varchar(4000) DEFAULT 'W3t9XQ==',
  `emp_amb_nfe` smallint(6) DEFAULT NULL COMMENT '0=nenhum \\\\ 1=producao \\\\ 2=homologacao',
  `emp_num` varchar(5) DEFAULT NULL,
  `emp_tpl_nf` int(11) DEFAULT NULL,
  `emp_inscrg` varchar(20) DEFAULT NULL,
  `emp_versao_nfe` smallint(6) DEFAULT NULL,
  `emp_cep` varchar(8) DEFAULT NULL,
  `emp_lote` varchar(20) DEFAULT NULL,
  `emp_local` varchar(10) DEFAULT NULL,
  `emp_codmun` varchar(7) DEFAULT NULL,
  `emp_instr1` varchar(70) DEFAULT NULL,
  `emp_instr2` varchar(70) DEFAULT NULL,
  `emp_instr3` varchar(70) DEFAULT NULL,
  `emp_instr4` varchar(70) DEFAULT NULL,
  `emp_instr5` varchar(70) DEFAULT NULL,
  `emp_serie` varchar(3) DEFAULT NULL,
  `emp_aliq_sn` decimal(12,2) DEFAULT NULL,
  `emp_host_acbr` varchar(250) DEFAULT NULL,
  `emp_path_acbr` varchar(250) DEFAULT NULL,
  `emp_port_acbr` int(11) DEFAULT NULL,
  `emp_ctrl_preco` smallint(6) DEFAULT NULL COMMENT '0 - LIBERADO, 1 - ALERTA, 2 - BLOQUEADO',
  `emp_ctrl_qtde` smallint(6) DEFAULT NULL,
  `emp_serie_custo` varchar(3) DEFAULT NULL,
  `emp_honorarios` decimal(12,2) DEFAULT NULL,
  `emp_jurosdiario` decimal(12,2) DEFAULT NULL,
  `emp_multa` decimal(12,2) DEFAULT NULL,
  `emp_rem_bco` varchar(5) DEFAULT NULL,
  `emp_rem_ag` varchar(10) DEFAULT NULL,
  `emp_rem_cc` varchar(20) DEFAULT NULL,
  `emp_rem_cart` text,
  `emp_rem_c_ced` varchar(10) DEFAULT NULL,
  `emp_rem_layout` varchar(15) DEFAULT NULL,
  `emp_ret_layout` varchar(15) DEFAULT NULL,
  `emp_redirect` smallint(6) DEFAULT NULL,
  `emp_setor` smallint(6) DEFAULT NULL,
  `emp_sintegra` text,
  `emp_scpc_codigo` varchar(10) DEFAULT NULL,
  `emp_scpc_senha` varchar(10) DEFAULT NULL,
  `emp_scpc_operadora` smallint(6) DEFAULT NULL,
  `emp_nfprn` smallint(6) DEFAULT NULL,
  `emp_emailremetente` varchar(80) DEFAULT NULL,
  `emp_hostsmtp` varchar(60) DEFAULT NULL,
  `emp_pwdsmtp` varchar(20) DEFAULT NULL,
  `emp_msgemail` text,
  `emp_msgsms` varchar(28) DEFAULT NULL,
  `emp_lote_cc` int(11) DEFAULT NULL,
  `emp_inf_fisco` varchar(500) DEFAULT NULL,
  `emp_sconsig1` text,
  `emp_sconsig2` text,
  `emp_pwd_cert` varchar(20) DEFAULT NULL,
  `emp_valid_cert` datetime DEFAULT NULL,
  `emp_aviso` tinyint(4) DEFAULT '0' COMMENT '0 liberado, 1 autentica e 2 bloqueio',
  `emp_pwd_gerente` varchar(12) DEFAULT NULL,
  `emp_ncm_padrao` varchar(50) DEFAULT '0',
  `emp_certificado` varchar(80) DEFAULT '0',
  `emp_rntrc` int(14) DEFAULT '0',
  `emp_ambcte` smallint(1) NOT NULL DEFAULT '1',
  `emp_ctrl_limite` smallint(1) DEFAULT '0',
  `emp_ctb_nome` varchar(100) DEFAULT NULL,
  `emp_ctb_cpf` varchar(11) DEFAULT NULL,
  `emp_ctb_crc` varchar(25) DEFAULT NULL,
  `emp_ctb_escritorio` varchar(80) DEFAULT NULL,
  `emp_ctb_cnpj` varchar(14) DEFAULT NULL,
  `emp_ctb_cep` varchar(8) DEFAULT NULL,
  `emp_ctb_codmun` varchar(7) DEFAULT NULL,
  `emp_ctb_endereco` varchar(60) DEFAULT NULL,
  `emp_ctb_num` varchar(10) DEFAULT NULL,
  `emp_ctb_compl` varchar(60) DEFAULT NULL,
  `emp_ctb_bairro` varchar(60) DEFAULT NULL,
  `emp_ctb_fone` varchar(11) DEFAULT NULL,
  `emp_ctb_fax` varchar(11) DEFAULT NULL,
  `emp_ctb_email` varchar(60) DEFAULT NULL,
  `emp_cod_gen` varchar(60) DEFAULT NULL,
  `emp_cod_lst` varchar(60) DEFAULT NULL,
  `emp_matricial` smallint(1) NOT NULL DEFAULT '0',
  `emp_layout_orcamento` smallint(1) DEFAULT '0' COMMENT '0 - layout padrão, 1 - modelo 1',
  `emp_inscrmun` varchar(6) DEFAULT NULL,
  `emp_nfselote` int(6) DEFAULT NULL,
  `emp_msgnfe` varchar(2000) DEFAULT NULL,
  `emp_gmt` int(2) NOT NULL DEFAULT '0',
  `emp_overhead` float(12,4) NOT NULL DEFAULT '0.0000',
  `emp_modelo_imp` smallint(6) NOT NULL DEFAULT '0' COMMENT 'modelo de impressao 0 - padrao , 1 - modelo 1',
  `emp_csc` varchar(60) DEFAULT NULL,
  `emp_serie_nfse` varchar(70) DEFAULT NULL,
  `emp_cfop_devolucao` varchar(20) DEFAULT NULL,
  `emp_pdv` varchar(100) DEFAULT NULL,
  `emp_cli_padrao` varchar(50) DEFAULT NULL,
  `emp_pdv_msgpadrao` varchar(200) DEFAULT NULL,
  `emp_pdv_msgpadrao_delimit` varchar(10) DEFAULT NULL,
  `emp_pdv_msgsecund` varchar(200) DEFAULT NULL,
  `emp_pdv_msgsecund_delimit` varchar(10) DEFAULT NULL,
  `emp_precomin` float DEFAULT NULL,
  `emp_limitcred` float DEFAULT NULL,
  `emp_qtdemin` float DEFAULT NULL,
  `emp_amb_nfse` smallint(1) DEFAULT NULL,
  `emp_dias_boleto` varchar(50) DEFAULT NULL,
  `emp_repres_nome` varchar(50) DEFAULT NULL,
  `emp_repres_cpf` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empresa`
--

INSERT INTO `empresa` (`emp_codigo`, `emp_razao`, `emp_fantasia`, `emp_db_sge`, `emp_db_comum`, `emp_endereco`, `emp_complem`, `emp_bairro`, `emp_cidade`, `emp_uf`, `emp_fone`, `emp_fax`, `emp_cel`, `emp_logo`, `emp_status`, `emp_obs`, `emp_msg`, `emp_sistema`, `emp_codigo_pai`, `emp_cnae`, `emp_codregtrib`, `emp_maskcc`, `emp_maskpc`, `emp_cpfcnpj`, `emp_bancos`, `emp_amb_nfe`, `emp_num`, `emp_tpl_nf`, `emp_inscrg`, `emp_versao_nfe`, `emp_cep`, `emp_lote`, `emp_local`, `emp_codmun`, `emp_instr1`, `emp_instr2`, `emp_instr3`, `emp_instr4`, `emp_instr5`, `emp_serie`, `emp_aliq_sn`, `emp_host_acbr`, `emp_path_acbr`, `emp_port_acbr`, `emp_ctrl_preco`, `emp_ctrl_qtde`, `emp_serie_custo`, `emp_honorarios`, `emp_jurosdiario`, `emp_multa`, `emp_rem_bco`, `emp_rem_ag`, `emp_rem_cc`, `emp_rem_cart`, `emp_rem_c_ced`, `emp_rem_layout`, `emp_ret_layout`, `emp_redirect`, `emp_setor`, `emp_sintegra`, `emp_scpc_codigo`, `emp_scpc_senha`, `emp_scpc_operadora`, `emp_nfprn`, `emp_emailremetente`, `emp_hostsmtp`, `emp_pwdsmtp`, `emp_msgemail`, `emp_msgsms`, `emp_lote_cc`, `emp_inf_fisco`, `emp_sconsig1`, `emp_sconsig2`, `emp_pwd_cert`, `emp_valid_cert`, `emp_aviso`, `emp_pwd_gerente`, `emp_ncm_padrao`, `emp_certificado`, `emp_rntrc`, `emp_ambcte`, `emp_ctrl_limite`, `emp_ctb_nome`, `emp_ctb_cpf`, `emp_ctb_crc`, `emp_ctb_escritorio`, `emp_ctb_cnpj`, `emp_ctb_cep`, `emp_ctb_codmun`, `emp_ctb_endereco`, `emp_ctb_num`, `emp_ctb_compl`, `emp_ctb_bairro`, `emp_ctb_fone`, `emp_ctb_fax`, `emp_ctb_email`, `emp_cod_gen`, `emp_cod_lst`, `emp_matricial`, `emp_layout_orcamento`, `emp_inscrmun`, `emp_nfselote`, `emp_msgnfe`, `emp_gmt`, `emp_overhead`, `emp_modelo_imp`, `emp_csc`, `emp_serie_nfse`, `emp_cfop_devolucao`, `emp_pdv`, `emp_cli_padrao`, `emp_pdv_msgpadrao`, `emp_pdv_msgpadrao_delimit`, `emp_pdv_msgsecund`, `emp_pdv_msgsecund_delimit`, `emp_precomin`, `emp_limitcred`, `emp_qtdemin`, `emp_amb_nfse`, `emp_dias_boleto`, `emp_repres_nome`, `emp_repres_cpf`) VALUES
('HOSTWIDE', 'Fausto Castagnari Marouvo', 'Hostwide', 'e0248', 'e0248_comum', 'Rua Antonio Octavio Scramim, 1119', '', 'Zona 5', 'Maringa', 'PR', '4499694684', NULL, '', '', 0, NULL, NULL, NULL, NULL, '', NULL, '9.99.999', '9.9.9.9.999', '03904403966', 'W3siaWQiOiIyNTI3MzY3IiwiYmFuY29fbnVtZXJvIjoiMzQxIiwiYmFuY29fbm9tZSI6IklUQVUiLCJjYXJ0ZWlyYSI6IjE3NSIsImxheW91dF9yZW1lc3NhIjoiRkVCUkFCQU4yNDAiLCJsYXlvdXRfcmV0b3JubyI6IkZFQlJBQkFOMjQwIiwiYWdlbmNpYSI6IjA5MzIiLCJhZ2VuY2lhZHYiOiIiLCJjb250YSI6IjM1NzM4IiwiY29udGFkdiI6IjciLCJjb252ZW5pbyI6IiIsImNvbnRyYXRvIjoiIiwidmFyaWFjYW8iOiIiLCJubmluaSI6IjAwMDAxNzAwIiwibm5maW0iOiIiLCJ0YXhhIjoiIiwicG9zdG8iOiIiLCJieXRlX2lkcyI6IiIsImNvb3BlcmF0aXZhIjoiIiwiY29udGEyIjoiIn1d', NULL, '1119', NULL, '', NULL, '87015490', NULL, NULL, NULL, '', '', '', '', '', '', '0.00', NULL, NULL, NULL, 0, 0, NULL, '0.00', '0.20', '0.20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'W3sicmVzcG9uc2F2ZWwiOiIiLCJjb2RfY29udiI6MCwibmF0X2luZm8iOjAsImZpbl9hcnEiOjAsInJlZzUwIjpmYWxzZSwicmVnNTEiOmZhbHNlLCJyZWc1MyI6ZmFsc2UsInJlZzU0IjpmYWxzZSwicmVnNjBNIjpmYWxzZSwicmVnNjBBIjpmYWxzZSwicmVnNjBEIjpmYWxzZSwicmVnNjBJIjpmYWxzZSwicmVnNjBSIjpmYWxzZSwicmVnNzQiOmZhbHNlLCJyZWc3NSI6ZmFsc2V9XQ==', NULL, NULL, NULL, NULL, '', '', '', '', '', NULL, '', '', '', NULL, '2016-01-12 22:46:11', 0, NULL, '', '0', NULL, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, 0, NULL, '', NULL, '', 0, 0.0000, 0, '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, 'Fausto Castagnari Marouvo', '03904403966');

-- --------------------------------------------------------

--
-- Estrutura da tabela `estoque`
--

CREATE TABLE `estoque` (
  `est_codigo` int(8) NOT NULL,
  `prd_codigo` int(8) NOT NULL,
  `prd_name` varchar(60) NOT NULL,
  `est_quantidade` int(8) NOT NULL,
  `lot_codigo` int(8) NOT NULL,
  `lot_name` varchar(60) NOT NULL,
  `est_tipo` int(1) NOT NULL COMMENT '0-saida; 1-entrada; 2-vencido',
  `ntf_codigo` int(8) NOT NULL,
  `est_data` datetime NOT NULL,
  `est_inicial` int(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `estoque`
--

INSERT INTO `estoque` (`est_codigo`, `prd_codigo`, `prd_name`, `est_quantidade`, `lot_codigo`, `lot_name`, `est_tipo`, `ntf_codigo`, `est_data`, `est_inicial`) VALUES
(157, 40, 'PRODUTO DOIS', 33, 23, 'LOTE DOIS TESTE', 1, 54, '2021-05-01 00:00:00', 0),
(156, 39, 'PRODUTO UM', 1, 22, 'LOTE TESTE 1', 0, 35, '2021-05-13 00:00:00', 0),
(155, 39, 'PRODUTO UM', 2, 22, 'LOTE TESTE 1', 1, 53, '2021-05-13 00:00:00', 0),
(158, 41, 'PRODUTO TRES', 12, 24, 'LOTE TRES', 1, 55, '2021-05-13 00:00:00', 0),
(159, 41, 'PRODUTO TRES', 2, 24, 'LOTE TRES', 0, 36, '2021-05-13 00:00:00', 0),
(160, 40, 'PRODUTO DOIS', 33, 23, 'LOTE DOIS TESTE', 2, 54, '2021-05-13 00:00:00', 0),
(161, 41, 'PRODUTO TRES', 1, 24, 'LOTE TRES', 1, 56, '2021-05-13 00:00:00', 0),
(162, 39, 'PRODUTO UM', 22, 25, 'LOTE QUATRO PRODUTO UM', 1, 57, '2021-05-13 00:00:00', 1),
(163, 39, 'PRODUTO UM', 1, 25, 'LOTE QUATRO PRODUTO UM', 0, 37, '2021-05-13 00:00:00', 0),
(164, 39, 'PRODUTO UM', 3, 25, 'LOTE QUATRO PRODUTO UM', 1, 58, '2021-05-13 00:00:00', 0),
(165, 39, 'PRODUTO UM', 2, 22, 'LOTE TESTE 1', 2, 35, '2021-06-24 00:00:00', 0),
(166, 41, 'PRODUTO TRES', 12, 24, 'LOTE TRES', 2, 36, '2021-06-24 00:00:00', 0),
(167, 39, 'PRODUTO UM', 3, 25, 'LOTE QUATRO PRODUTO UM', 2, 57, '2023-04-24 00:00:00', 0),
(168, 43, 'PRODUTO UUM', 10, 28, 'LOTE SETE', 1, 62, '2023-11-28 00:00:00', 1),
(169, 43, 'PRODUTO UUM', 2, 28, 'LOTE SETE', 0, 39, '2023-11-28 00:00:00', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `estoque_vencido`
--

CREATE TABLE `estoque_vencido` (
  `etv_codigo` int(11) NOT NULL,
  `prd_codigo` int(11) NOT NULL,
  `lot_codigo` int(11) NOT NULL,
  `etv_quantidade` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `estoque_vencido`
--

INSERT INTO `estoque_vencido` (`etv_codigo`, `prd_codigo`, `lot_codigo`, `etv_quantidade`) VALUES
(26, 40, 23, 33),
(27, 39, 22, 2),
(28, 41, 24, 12),
(29, 39, 25, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor`
--

CREATE TABLE `fornecedor` (
  `for_codigo` int(11) NOT NULL,
  `for_name` varchar(60) NOT NULL,
  `for_cnpj` varchar(18) NOT NULL,
  `for_telefone` varchar(14) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `fornecedor`
--

INSERT INTO `fornecedor` (`for_codigo`, `for_name`, `for_cnpj`, `for_telefone`, `isActive`) VALUES
(1, 'ASD SDA SADSA GF GHGFHFGHF DFGFGFD ', '', '', 0),
(2, 'FORNECEDOR A', '12345678901234', '44 99999 9999', 1),
(3, 'FORNECEDOR B', '45353535', '3454354', 1),
(4, 'FORNECEDOR C', '', '', 1),
(5, 'FORNECEDOR D', '', '', 1),
(6, 'FORNECEDOR COM ARQUIVO', '423423423423242', '23424234234234', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `lote`
--

CREATE TABLE `lote` (
  `lot_codigo` int(8) NOT NULL,
  `lot_name` varchar(60) NOT NULL,
  `lot_manufacturing` date NOT NULL,
  `lot_validate` date NOT NULL,
  `lot_barcode` varchar(12) NOT NULL,
  `isActive` int(1) NOT NULL COMMENT '0-inativo; 1-ativo; 2-vencido'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `lote`
--

INSERT INTO `lote` (`lot_codigo`, `lot_name`, `lot_manufacturing`, `lot_validate`, `lot_barcode`, `isActive`) VALUES
(22, 'LOTE TESTE 1', '2021-05-11', '2021-05-18', '1620764057', 2),
(23, 'LOTE DOIS TESTE', '2021-04-27', '2021-05-04', '1620764087', 2),
(24, 'LOTE TRES', '2021-05-13', '2021-06-05', '1620907376', 2),
(25, 'LOTE QUATRO PRODUTO UM', '2021-05-13', '2021-06-24', '1620940285', 2),
(26, 'LOTE 1', '2023-11-28', '2023-12-24', '1701185701', 1),
(27, 'LOTE DOIS', '2023-11-20', '2023-12-12', '1701185741', 1),
(28, 'LOTE SETE', '2023-11-28', '2023-12-18', '1701197248', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `nota_fiscal`
--

CREATE TABLE `nota_fiscal` (
  `ntf_codigo` int(8) NOT NULL,
  `ntf_numero` varchar(12) NOT NULL DEFAULT '',
  `for_codigo` int(8) NOT NULL,
  `for_name` varchar(60) NOT NULL,
  `ntf_produtos` varchar(5000) NOT NULL,
  `ntf_data` date NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `nota_fiscal`
--

INSERT INTO `nota_fiscal` (`ntf_codigo`, `ntf_numero`, `for_codigo`, `for_name`, `ntf_produtos`, `ntf_data`, `isActive`) VALUES
(52, '656534', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6NDEsInByZF9uYW1lIjoiUFJPRFVUTyBUUkVTIiwiZGNiX2NvZGlnbyI6IjUxMjEtMjM2My04MiIsImRjYl9kaXNjcmltaW5hY2FvIjoiRElTQ1JJTUlOIEFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlQgQUNBTyIsInByZF9xdWFudGlkYWRlIjoyLCJsb3RfY29kaWdvIjoyMywibG90X25hbWUiOiJMT1RFIERPSVMgVEVTVEUiLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tMSJ9XQ==', '2021-05-11', 1),
(53, '8834', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6MzksInByZF9uYW1lIjoiUFJPRFVUTyBVTSIsImRjYl9jb2RpZ28iOiIzMzQ2LTEyMzctMTIiLCJkY2JfZGlzY3JpbWluYWNhbyI6IkRJU0NSSU1JTkFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlRBQ0FPIiwicHJkX3F1YW50aWRhZGUiOjIsImxvdF9jb2RpZ28iOjIyLCJsb3RfbmFtZSI6IkxPVEUgVEVTVEUgMSIsImlkIjoiRmFjaWxEZXNrdG9wLm1vZGVsLlByb2R1dG9TZWxlY2lvbmFkby0xIn1d', '2021-05-13', 1),
(54, '5552', 6, 'FORNECEDOR COM ARQUIVO', 'W3sicHJkX2NvZGlnbyI6NDAsInByZF9uYW1lIjoiUFJPRFVUTyBET0lTIiwiZGNiX2NvZGlnbyI6IjkyMzctMlQ2MS03MyIsImRjYl9kaXNjcmltaW5hY2FvIjoiRElTQ1JJLiBNSU5BIENBTyIsImRjYl9hcHJlc2VudGFjYW8iOiJBUFJFIFNFTlRBQ0FPIiwicHJkX3F1YW50aWRhZGUiOjMzLCJsb3RfY29kaWdvIjoyMywibG90X25hbWUiOiJMT1RFIERPSVMgVEVTVEUiLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tMiJ9XQ==', '2021-05-13', 1),
(55, '67346', 5, 'FORNECEDOR D', 'W3sicHJkX2NvZGlnbyI6NDEsInByZF9uYW1lIjoiUFJPRFVUTyBUUkVTIiwiZGNiX2NvZGlnbyI6IjUxMjEtMjM2My04MiIsImRjYl9kaXNjcmltaW5hY2FvIjoiRElTQ1JJTUlOIEFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlQgQUNBTyIsInByZF9xdWFudGlkYWRlIjoxMiwibG90X2NvZGlnbyI6MjQsImxvdF9uYW1lIjoiTE9URSBUUkVTIiwiaWQiOiJGYWNpbERlc2t0b3AubW9kZWwuUHJvZHV0b1NlbGVjaW9uYWRvLTMifV0=', '2021-05-13', 1),
(56, '654654', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6NDEsInByZF9uYW1lIjoiUFJPRFVUTyBUUkVTIiwiZGNiX2NvZGlnbyI6IjUxMjEtMjM2My04MiIsImRjYl9kaXNjcmltaW5hY2FvIjoiRElTQ1JJTUlOIEFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlQgQUNBTyIsInByZF9xdWFudGlkYWRlIjoxLCJsb3RfY29kaWdvIjoyNCwibG90X25hbWUiOiJMT1RFIFRSRVMiLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tMSJ9XQ==', '2021-05-13', 1),
(57, '543453', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6MzksInByZF9uYW1lIjoiUFJPRFVUTyBVTSIsImRjYl9jb2RpZ28iOiIzMzQ2LTEyMzctMTIiLCJkY2JfZGlzY3JpbWluYWNhbyI6IkRJU0NSSU1JTkFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlRBQ0FPIiwicHJkX3F1YW50aWRhZGUiOjIyLCJsb3RfY29kaWdvIjoyNSwibG90X25hbWUiOiJMT1RFIFFVQVRSTyBQUk9EVVRPIFVNIiwiaWQiOiJGYWNpbERlc2t0b3AubW9kZWwuUHJvZHV0b1NlbGVjaW9uYWRvLTIifV0=', '2021-05-13', 1),
(58, '64262462', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6MzksInByZF9uYW1lIjoiUFJPRFVUTyBVTSIsImRjYl9jb2RpZ28iOiIzMzQ2LTEyMzctMTIiLCJkY2JfZGlzY3JpbWluYWNhbyI6IkRJU0NSSU1JTkFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlRBQ0FPIiwicHJkX3F1YW50aWRhZGUiOjMsImxvdF9jb2RpZ28iOjI1LCJsb3RfbmFtZSI6IkxPVEUgUVVBVFJPIFBST0RVVE8gVU0iLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tNCJ9XQ==', '2021-05-13', 1),
(59, '324234234234', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6NDMsInByZF9uYW1lIjoiUFJPRFVUTyBVVU0iLCJkY2JfY29kaWdvIjoiNzc3IiwiZGNiX2Rpc2NyaW1pbmFjYW8iOiIiLCJkY2JfYXByZXNlbnRhY2FvIjoiIiwicHJkX3F1YW50aWRhZGUiOjEwLCJsb3RfY29kaWdvIjoyOCwibG90X25hbWUiOiJMT1RFIFNFVEUiLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tMSJ9XQ==', '2023-11-28', 1),
(60, '324234234234', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6NDMsInByZF9uYW1lIjoiUFJPRFVUTyBVVU0iLCJkY2JfY29kaWdvIjoiNzc3IiwiZGNiX2Rpc2NyaW1pbmFjYW8iOiIiLCJkY2JfYXByZXNlbnRhY2FvIjoiIiwicHJkX3F1YW50aWRhZGUiOjEwLCJsb3RfY29kaWdvIjoyOCwibG90X25hbWUiOiJMT1RFIFNFVEUiLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tMSJ9XQ==', '2023-11-28', 1),
(61, '324234234234', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6NDMsInByZF9uYW1lIjoiUFJPRFVUTyBVVU0iLCJkY2JfY29kaWdvIjoiNzc3IiwiZGNiX2Rpc2NyaW1pbmFjYW8iOiIiLCJkY2JfYXByZXNlbnRhY2FvIjoiIiwicHJkX3F1YW50aWRhZGUiOjEwLCJsb3RfY29kaWdvIjoyOCwibG90X25hbWUiOiJMT1RFIFNFVEUiLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tMSJ9XQ==', '2023-11-28', 1),
(62, '324234234234', 4, 'FORNECEDOR C', 'W3sicHJkX2NvZGlnbyI6NDMsInByZF9uYW1lIjoiUFJPRFVUTyBVVU0iLCJkY2JfY29kaWdvIjoiNzc3IiwiZGNiX2Rpc2NyaW1pbmFjYW8iOiIiLCJkY2JfYXByZXNlbnRhY2FvIjoiIiwicHJkX3F1YW50aWRhZGUiOjEwLCJsb3RfY29kaWdvIjoyOCwibG90X25hbWUiOiJMT1RFIFNFVEUiLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tMSJ9XQ==', '2023-11-28', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `paciente`
--

CREATE TABLE `paciente` (
  `pac_codigo` int(11) NOT NULL,
  `pac_name` varchar(60) NOT NULL,
  `pac_dataNascimento` date NOT NULL,
  `pac_peso` int(3) NOT NULL,
  `pac_telefone` varchar(14) NOT NULL,
  `pac_endereco` varchar(60) NOT NULL,
  `pac_cidade` varchar(60) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `paciente`
--

INSERT INTO `paciente` (`pac_codigo`, `pac_name`, `pac_dataNascimento`, `pac_peso`, `pac_telefone`, `pac_endereco`, `pac_cidade`, `isActive`) VALUES
(9, 'PACIENTE UM', '1980-10-12', 71, '44 99969 4584', 'ANTONIO OCTAVIO SCRAMIM, 1119', 'MARINGA', 1),
(10, 'PACIENTE DOIS', '2014-02-05', 56, '44 99999 9999', 'RUA JOAO MATIAS, 222', 'MARINGA', 1),
(11, 'PACIENTE 3', '2020-10-05', 20, '44 99999 9985', 'RUA DAS FLORES, 25', 'MANDAGUACU', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `permissao`
--

CREATE TABLE `permissao` (
  `per_codigo` int(8) NOT NULL,
  `per_name` varchar(20) NOT NULL,
  `isActive` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `permissao`
--

INSERT INTO `permissao` (`per_codigo`, `per_name`, `isActive`) VALUES
(1, 'Normal', 1),
(2, 'Enfermeiro', 1),
(4, 'Administrador', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `prd_codigo` int(11) NOT NULL,
  `prd_name` varchar(60) NOT NULL,
  `dcb_codigo` varchar(15) NOT NULL,
  `dcb_discriminacao` varchar(40) NOT NULL,
  `dcb_apresentacao` varchar(60) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`prd_codigo`, `prd_name`, `dcb_codigo`, `dcb_discriminacao`, `dcb_apresentacao`, `isActive`) VALUES
(39, 'PRODUTO UM', '3346-1237-12', 'DISCRIMINACAO', 'APRESENTACAO', 1),
(40, 'PRODUTO DOIS', '9237-2T61-73', 'DISCRI. MINA CAO', 'APRE SENTACAO', 1),
(41, 'PRODUTO TRES', '5121-2363-82', 'DISCRIMIN ACAO', 'APRESENT ACAO', 1),
(42, 'SDFSDFSDF', '', '', '', 1),
(43, 'PRODUTO UUM', '777', '', '', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `prontuario`
--

CREATE TABLE `prontuario` (
  `prt_codigo` int(11) NOT NULL,
  `prt_data` varchar(11) NOT NULL,
  `prt_descr` varchar(11) NOT NULL,
  `prt_produto` varchar(5000) NOT NULL,
  `pac_codigo` int(8) NOT NULL DEFAULT '0',
  `pac_name` varchar(60) NOT NULL DEFAULT '0',
  `isActive` int(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `prontuario`
--

INSERT INTO `prontuario` (`prt_codigo`, `prt_data`, `prt_descr`, `prt_produto`, `pac_codigo`, `pac_name`, `isActive`) VALUES
(35, '2021-05-13', '', 'W3sicHJkX2NvZGlnbyI6MzksInByZF9uYW1lIjoiUFJPRFVUTyBVTSIsImRjYl9jb2RpZ28iOiIzMzQ2LTEyMzctMTIiLCJkY2JfZGlzY3JpbWluYWNhbyI6IkRJU0NSSU1JTkFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlRBQ0FPIiwicHJkX3F1YW50aWRhZGUiOjEsImxvdF9jb2RpZ28iOjIyLCJsb3RfbmFtZSI6IkxPVEUgVEVTVEUgMSIsImlkIjoiRmFjaWxEZXNrdG9wLm1vZGVsLlByb2R1dG9TZWxlY2lvbmFkby0xIn1d', 9, 'PACIENTE UM', 1),
(36, '2021-05-13', '', 'W3sicHJkX2NvZGlnbyI6NDEsInByZF9uYW1lIjoiUFJPRFVUTyBUUkVTIiwiZGNiX2NvZGlnbyI6IjUxMjEtMjM2My04MiIsImRjYl9kaXNjcmltaW5hY2FvIjoiRElTQ1JJTUlOIEFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlQgQUNBTyIsInByZF9xdWFudGlkYWRlIjoyLCJsb3RfY29kaWdvIjoyNCwibG90X25hbWUiOiJMT1RFIFRSRVMiLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tNCJ9XQ==', 11, 'PACIENTE 3', 1),
(37, '2021-05-13', '', 'W3sicHJkX2NvZGlnbyI6MzksInByZF9uYW1lIjoiUFJPRFVUTyBVTSIsImRjYl9jb2RpZ28iOiIzMzQ2LTEyMzctMTIiLCJkY2JfZGlzY3JpbWluYWNhbyI6IkRJU0NSSU1JTkFDQU8iLCJkY2JfYXByZXNlbnRhY2FvIjoiQVBSRVNFTlRBQ0FPIiwicHJkX3F1YW50aWRhZGUiOjEsImxvdF9jb2RpZ28iOjI1LCJsb3RfbmFtZSI6IkxPVEUgUVVBVFJPIFBST0RVVE8gVU0iLCJpZCI6IkZhY2lsRGVza3RvcC5tb2RlbC5Qcm9kdXRvU2VsZWNpb25hZG8tMyJ9XQ==', 10, 'PACIENTE DOIS', 1),
(38, '2023-11-28', '', 'W3sicHJkX2NvZGlnbyI6NDMsInByZF9uYW1lIjoiUFJPRFVUTyBVVU0iLCJkY2JfY29kaWdvIjoiNzc3IiwiZGNiX2Rpc2NyaW1pbmFjYW8iOiIiLCJkY2JfYXByZXNlbnRhY2FvIjoiIiwicHJkX3F1YW50aWRhZGUiOjIsImxvdF9jb2RpZ28iOjI4LCJsb3RfbmFtZSI6IkxPVEUgU0VURSIsImlkIjoiRmFjaWxEZXNrdG9wLm1vZGVsLlByb2R1dG9TZWxlY2lvbmFkby0xIn1d', 11, 'PACIENTE 3', 1),
(39, '2023-11-28', '', 'W3sicHJkX2NvZGlnbyI6NDMsInByZF9uYW1lIjoiUFJPRFVUTyBVVU0iLCJkY2JfY29kaWdvIjoiNzc3IiwiZGNiX2Rpc2NyaW1pbmFjYW8iOiIiLCJkY2JfYXByZXNlbnRhY2FvIjoiIiwicHJkX3F1YW50aWRhZGUiOjIsImxvdF9jb2RpZ28iOjI4LCJsb3RfbmFtZSI6IkxPVEUgU0VURSIsImlkIjoiRmFjaWxEZXNrdG9wLm1vZGVsLlByb2R1dG9TZWxlY2lvbmFkby0xIn1d', 11, 'PACIENTE 3', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `template`
--

CREATE TABLE `template` (
  `query_cod` varchar(10) NOT NULL,
  `query_sql` text,
  `aplicacao` varchar(160) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='template';

--
-- Extraindo dados da tabela `template`
--

INSERT INTO `template` (`query_cod`, `query_sql`, `aplicacao`) VALUES
('', '-}limit', NULL),
('000001', 'select emp_codigo, usu_login, usu_email,  per_codigo, per_name  from usuario where usu_login=-}usu_login and usu_senha=-}usu_senha', 'login.php'),
('000002', 'update usuario set  usu_senha = -}usu_senha  where emp_codigo = -}emp_codigo and usu_login = -}usu_login', 'alterarSenha.php'),
('000003', 'insert into usuario (emp_codigo, usu_login, usu_senha, usu_email, usu_privilegio, usu_status, per_codigo, per_name) values (-}emp_codigo, -}usu_login, -}usu_senha, -}usu_email, 0, 0, -}per_codigo, -}per_name)', 'acesso.php'),
('000004', 'select emp_codigo, usu_login, usu_email, usu_senha, per_codigo, per_name from usuario order by usu_email asc', 'acesso.php'),
('000005', 'select  emp_codigo, usu_login, usu_email, usu_senha, per_codigo, per_name from usuario where usu_email like \'%-}usu_email%\' order by usu_email asc', 'acesso.php'),
('000006', 'select emp_codigo, usu_login, usu_email, usu_senha, per_codigo, per_name from usuario where emp_codigo= -}emp_codigo and usu_login= -}usu_login', 'acesso.php'),
('000010', 'insert into unidade (uni_name, uni_prefix, isActive) values (-}uni_name, -}uni_prefix, 1)', 'unidade.php'),
('000011', 'select uni_codigo, uni_name, uni_prefix from unidade where isActive = 1 order by uni_name asc', 'unidade.php'),
('000012', 'select uni_codigo, uni_name, uni_prefix from unidade where uni_name like \'%-}uni_name%\' and isActive = 1 order by uni_name asc', 'unidade.php'),
('000013', 'select uni_codigo, uni_name, uni_prefix from unidade where uni_codigo= -}uni_codigo', 'unidade.php'),
('000014', 'update unidade set uni_name = -}uni_name, uni_prefix = -}uni_prefix where uni_codigo = -}uni_codigo', 'unidade.php'),
('000015', 'update unidade set isActive = 0 where uni_codigo = -}uni_codigo', 'unidade.php'),
('000020', 'insert into produto (prd_name, dcb_codigo,  isActive) values (-}prd_name, -}dcb_codigo,  1)', 'produto.php'),
('000021', 'select prd_codigo, prd_name, dcb_codigo   from produto where isActive = 1 order by prd_name asc', 'produto.php'),
('000022', 'select prd_codigo, prd_name, dcb_codigo  from produto where prd_name like \'%-}prd_name%\' and isActive = 1 order by prd_name asc limit -}start, -}limit', 'produto.php'),
('000023', 'select prd_codigo, prd_name, dcb_codigo  from produto where prd_codigo= -}prd_codigo and isActive = 1', 'produto.php'),
('000024', 'update produto set prd_name = -}prd_name, dcb_codigo = -}dcb_codigo where prd_codigo = -}prd_codigo', 'produto.php'),
('000025', 'update produto set isActive = 0 where prd_codigo = -}prd_codigo', 'produto.php'),
('000026', 'select count(prd_codigo) as total from produto where prd_name like \'%-}prd_name%\' and isActive = 1', 'produto.php'),
('000030', 'insert into paciente (pac_name, pac_dataNascimento, pac_peso, pac_telefone, pac_endereco, pac_cidade, isActive) values (-}pac_name, -}pac_dataNascimento, -}pac_peso, -}pac_telefone, -}pac_endereco, -}pac_cidade, 1)', 'paciente.php'),
('000031', 'select pac_codigo, pac_name, pac_dataNascimento, pac_peso, pac_telefone, pac_endereco, pac_cidade from paciente where isActive = 1 order by pac_name asc', 'paciente.php'),
('000032', 'select pac_codigo, pac_name, pac_dataNascimento, pac_peso, pac_telefone, pac_endereco, pac_cidade from paciente where pac_name like \'%-}pac_name%\'  and isActive = 1 order by pac_name asc', 'paciente.php'),
('000033', 'select pac_codigo, pac_name, pac_dataNascimento, pac_peso, pac_telefone, pac_endereco, pac_cidade from paciente where pac_codigo= -}pac_codigo and isActive = 1', 'paciente.php'),
('000034', 'update paciente set pac_name = -}pac_name, pac_dataNascimento = -}pac_dataNascimento, pac_peso = -}pac_peso, pac_telefone = -}pac_telefone, pac_endereco = -}pac_endereco, pac_cidade = -}pac_cidade where pac_codigo = -}pac_codigo', 'paciente.php'),
('000035', 'update paciente set isActive = 0 where pac_codigo = -}pac_codigo', 'paciente.php'),
('000040', 'insert into fornecedor(for_name, for_cnpj, for_telefone, isActive) values (-}for_name, -}for_cnpj, -}for_telefone, 1)', 'fornecedor.php'),
('000041', 'select for_codigo, for_name, for_cnpj, for_telefone from fornecedor where isActive = 1 order by for_name asc', 'fornecedor.php'),
('000042', 'select for_codigo, for_name, for_cnpj, for_telefone from fornecedor where for_name like \'%-}for_name%\' or for_cnpj like \'%-}for_cnpj%\' and isActive = 1 order by for_name asc', 'fornecedor.php'),
('000043', 'select for_codigo, for_name, for_cnpj, for_telefone from fornecedor where for_codigo= -}for_codigo and isActive = 1', 'fornecedor.php'),
('000044', 'update fornecedor set for_name = -}for_name, for_cnpj = -}for_cnpj, for_telefone = -}for_telefone where for_codigo = -}for_codigo', 'fornecedor.php'),
('000045', 'update fornecedor set isActive = 0 where for_codigo = -}for_codigo', 'fornecedor.php'),
('000050', 'insert into nota_fiscal (ntf_numero, for_codigo, for_name, ntf_produtos, ntf_data, isActive) values (-}ntf_numero, -}for_codigo, -}for_name, -}ntf_produtos, -}ntf_data, 1)', 'nota_fiscal.php'),
('000051', 'select ntf_codigo, ntf_numero, for_codigo, for_name, ntf_produtos, ntf_data from nota_fiscal where isActive = 1 order by for_name, ntf_numero asc', 'nota_fiscal.php'),
('000052', 'select ntf_codigo, ntf_numero, for_codigo, for_name, ntf_produtos, ntf_data from nota_fiscal where for_name like \'%-}for_name%\' or ntf_numero like \'%-}for_name%\' and isActive = 1 order by for_name, ntf_numero asc', 'nota_fiscal.php'),
('000053', 'select ntf_codigo, ntf_numero, for_codigo, for_name, ntf_produtos, ntf_data from nota_fiscal where ntf_codigo= -}ntf_codigo and isActive = 1 order by for_name, ntf_numero asc', 'nota_fiscal.php'),
('000054', 'update nota_fiscal set for_codigo = -}for_codigo, for_name = -}for_name, ntf_produtos = -}ntf_produtos, ntf_data= -}ntf_data where for_codigo = -}for_codigo', 'nota_fiscal.php'),
('000055', 'update nota_fiscal set isActive = 0 where for_codigo = -}for_codigo', 'nota_fiscal.php'),
('000060', 'insert into lote (lot_name, lot_manufacturing, lot_validate, lot_barcode, isActive) values (-}lot_name, -}lot_manufacturing, -}lot_validate, -}lot_barcode, 1)', 'lote.php'),
('000061', 'select lot_codigo, lot_name, DATE_FORMAT(lot_manufacturing,"%d\\/%m\\/%Y") AS lot_manufacturing, DATE_FORMAT(lot_validate ,"%d\\/%m\\/%Y") AS lot_validate, lot_barcode from lote where isActive = 1 order by lot_validate, lot_name asc', 'lote.php'),
('000062', 'select lot_codigo, lot_name, lot_manufacturing, lot_validate, lot_barcode from lote where lot_name like \'%-}lot_name%\' and isActive = 1 order by lot_validate , lot_codigo asc', 'lote.php'),
('000063', 'select lot_codigo, lot_name, lot_manufacturing, lot_validate, lot_barcode from lote where lot_codigo = -}lot_codigo and isActive = 1 order by lot_validate , lot_codigo asc', 'lote.php'),
('000064', 'update lote set lot_name = -}lot_name, lot_manufacturing= -}lot_manufacturing, lot_validate = -}lot_validate, lot_barcode = -}lot_barcode where lot_codigo = -}lot_codigo ', 'lote.php'),
('000065', 'update lote set isActive = 0 where lot_codigo = -}lot_codigo', 'lote.php'),
('000066', 'select a.lot_codigo, a.lot_name, DATE_FORMAT(b.lot_validate,"%d\\/%m\\/%Y") AS lot_validate from estoque a left join lote b on b.lot_codigo = a.lot_codigo where a.prd_codigo = -}prd_codigo and b.isActive = 1', 'lote.php'),
('000071', 'select tip_codigo, tip_name from tipo where isActive = 1', 'tipo.php'),
('000081', 'select per_codigo, per_name from permissao where isActive = 1', 'permissao.php'),
('000090', 'insert into usuario (emp_codigo, usu_login, usu_senha, usu_email, per_codigo, per_name) values ("HOSTWIDE", -}usu_login, -}usu_senha, -}usu_email, -}per_codigo, -}per_name)', 'acesso.php'),
('000091', 'select emp_codigo, usu_login, usu_senha, usu_email, per_codigo, per_name from usuario where isActive = 1 order by usu_login asc', 'acesso.php'),
('000092', 'select emp_codigo, usu_login, usu_senha, usu_email, per_codigo, per_name from usuario where usu_login like \'%-}usu_login%\' and isActive = 1 order by usu_login asc', 'acesso.php'),
('000093', 'select emp_codigo, usu_login, usu_senha, usu_email, per_codigo, per_name from usuario where usu_login= -}usu_login', 'acesso.php'),
('000094', 'update usuario set usu_login = -}usu_login, usu_senha = -}usu_senha, usu_email = -}usu_email, per_codigo = -}per_codigo, per_name = -}per_name where usu_login = -}usu_login', 'acesso.php'),
('000095', 'update usuario set isActive = 0 where usu_login = -}usu_login', 'acesso.php'),
('000100', 'insert into estoque (prd_codigo, prd_name, est_quantidade, lot_codigo, lot_name, est_tipo, ntf_codigo, est_data, est_inicial) values (-}prd_codigo, -}prd_name, -}est_quantidade, -}lot_codigo, -}lot_name, 1, -}ntf_codigo, -}est_data, if( exists(select e.est_codigo from estoque e where e.prd_codigo = -}prd_codigo and lot_codigo = -}lot_codigo), \'0\', \'1\'))', 'nota_fiscal.php'),
('000101', 'select ntf_codigo from nota_fiscal order by ntf_codigo desc limit 1', 'nota_fiscal.php'),
('000102', 'insert into estoque (prd_codigo, prd_name,  est_quantidade, lot_codigo, lot_name, est_tipo, ntf_codigo, est_data) values (-}prd_codigo, -}prd_name,  -}est_quantidade, -}lot_codigo, -}lot_name, 0, -}ntf_codigo, -}est_data)', 'prontuario.php'),
('000103', 'select prt_codigo from prontuario order by prt_codigo desc limit 1', 'prontuario.php'),
('000104', 'delete from estoque where ntf_codigo = -}ntf_codigo', 'nota_fiscal.php, prontuario.php'),
('000105', 'select est_codigo, prd_codigo, prd_name,  est_quantidade, lot_codigo, lot_name, est_tipo, ntf_codigo, DATE_FORMAT(est_data,"%d\\/%m\\/%Y") AS est_data from estoque order by est_data, prd_name desc', 'estoque.php'),
('000106', 'select a.est_codigo, a.prd_codigo, a.prd_name, a.est_quantidade, a.est_tipo, a.ntf_codigo, DATE_FORMAT(a.est_data,"%d\\/%m\\/%Y") AS est_data, b.lot_name, b.lot_manufacturing, b.lot_validate from estoque a left join lote b on b.lot_codigo = a.lot_codigo where prd_name like \'%-}prd_name%\' and est_tipo in (-}est_tipo) and est_data between -}est_dtinicial and -}est_dtfinal order by est_data, prd_name desc', 'estoque.php'),
('000110', 'insert into prontuario (prt_data, prt_descr, prt_produto, pac_codigo, pac_name, isActive) values (-}prt_data, -}prt_descr, -}prt_produto, -}pac_codigo, -}pac_name, 1)', 'prontuario.php'),
('000111', 'select prt_codigo, DATE_FORMAT(prt_data,"%d\\/%m\\/%Y") AS prt_data, prt_descr, prt_produto, pac_codigo, pac_name from prontuario where isActive = 1 order by prt_codigo, pac_name asc', 'prontuario.php'),
('000112', 'select prt_codigo, DATE_FORMAT(prt_data,"%d\\/%m\\/%Y") AS prt_data, prt_descr, prt_produto, pac_codigo, pac_name from prontuario where pac_name like \'%-}pac_name%\' and isActive = 1 order by prt_codigo asc', 'prontuario.php'),
('000113', 'select prt_codigo, DATE_FORMAT(prt_data,"%d\\/%m\\/%Y") AS prt_data, prt_descr, prt_produto, pac_codigo, pac_name from prontuario where prt_codigo = -}prt_codigo and isActive = 1 order by prt_codigo asc', 'prontuario.php'),
('000114', 'update prontuario set prt_data = -}prt_data, prt_descr = -}prt_descr, prt_produto = -}prt_produto, pac_codigo = -}pac_codigo, pac_name = -}pac_name where prt_codigo = -}prt_codigo ', 'prontuario.php'),
('000115', 'update prontuario set isActive = 0 where prt_codigo = -}prt_codigo', 'prontuario.php'),
('000116', 'select ifnull((sum(case when est_tipo = 1 then est_quantidade else 0 end)-sum(case when est_tipo = 0 then est_quantidade else 0 end)-sum(case when est_tipo = 2 then est_quantidade else 0 end)), 0) as quantidade from estoque where lot_codigo = -}lot_codigo and prd_codigo = -}prd_codigo', 'prontuario.php'),
('000120', 'select a.est_codigo, a.prd_codigo, a.prd_name, a.dcb_codigo, a.dcb_discriminacao, a.dcb_apresentacao, a.est_quantidade, a.lot_codigo, a.lot_name, a.est_tipo, a.ntf_codigo, a.est_data from estoque a left join lote b on a.lot_codigo = b.lot_codigo where (b.lot_validate < CURDATE() and b.isActive = 1) and a.est_tipo != 2 order by a.prd_codigo, a.lot_codigo', 'estoque_vencido.php'),
('000121', 'insert into estoque_vencido (prd_codigo, lot_codigo, etv_quantidade) values (-}prd_codigo, -}lot_codigo, -}etv_quantidade)', 'estoque_vencido.php'),
('000122', 'insert into estoque (prd_codigo, prd_name, dcb_codigo, dcb_discriminacao, dcb_apresentacao, est_quantidade, lot_codigo, lot_name, est_tipo, ntf_codigo, est_data) values (-}prd_codigo, -}prd_name, -}dcb_codigo, -}dcb_discriminacao, -}dcb_apresentacao, -}est_quantidade, -}lot_codigo, -}lot_name, 2, -}ntf_codigo, -}est_data)', 'estoque_vencido.php'),
('000123', 'update lote set isActive = 2 where lot_codigo = -}lot_codigo', 'estoque_vencido.php'),
('000130', 'select (case when est_inicial = 1 then est_quantidade else 0 end) as inicial, sum(case when est_tipo = 1 then est_quantidade else 0 end) as entrada, sum(case when est_tipo = 0 then est_quantidade else 0 end) as saida, (sum(case when est_tipo = 1 then est_quantidade else 0 end)-sum(case when est_tipo = 0 then est_quantidade else 0 end)-sum(case when est_tipo = 2 then est_quantidade else 0 end)) as final, sum(case when est_tipo = 2 then est_quantidade else 0 end) as perda, est_codigo, prd_codigo, prd_name, est_quantidade, lot_codigo, lot_name, est_tipo, ntf_codigo, DATE_FORMAT(est_data,"%d\\/%m\\/%Y") AS est_data from estoque group by prd_codigo, lot_codigo', 'relEstoqueProdutos.php'),
('600011', 'select * from empresa where emp_codigo = -}emp_codigo', 'TParams.php');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `emp_codigo` varchar(20) NOT NULL,
  `usu_login` varchar(60) NOT NULL,
  `usu_senha` varchar(20) NOT NULL,
  `usu_email` varchar(60) DEFAULT NULL,
  `per_codigo` int(8) NOT NULL,
  `per_name` varchar(20) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`emp_codigo`, `usu_login`, `usu_senha`, `usu_email`, `per_codigo`, `per_name`, `isActive`) VALUES
('HOSTWIDE', 'admin', '123', 'fausto@hostwide.com.br', 4, 'Administrador', 1),
('HOSTWIDE', 'novo', '123', 'fatalk@gmail.com', 0, '', 1),
('HOSTWIDE', 'teste', '123', 'teste@teste.com', 2, 'Enfermeiro', 1),
('HOSTWIDE', 'tres', '123', 'dsad@asd.asd', 1, 'Normal', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_modulo_empresa`
--

CREATE TABLE `usuario_modulo_empresa` (
  `emp_codigo` varchar(20) NOT NULL,
  `usu_login` varchar(60) NOT NULL,
  `mod_codigo` varchar(6) NOT NULL,
  `ume_flag` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario_modulo_empresa`
--

INSERT INTO `usuario_modulo_empresa` (`emp_codigo`, `usu_login`, `mod_codigo`, `ume_flag`) VALUES
('HOSTWIDE', 'admin@HOSTWIDE', '000000', NULL),
('HOSTWIDE', 'admin@HOSTWIDE', '900020', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`emp_codigo`),
  ADD KEY `fk_empresa_empresa` (`emp_codigo_pai`);

--
-- Indexes for table `estoque`
--
ALTER TABLE `estoque`
  ADD PRIMARY KEY (`est_codigo`);

--
-- Indexes for table `estoque_vencido`
--
ALTER TABLE `estoque_vencido`
  ADD PRIMARY KEY (`etv_codigo`);

--
-- Indexes for table `fornecedor`
--
ALTER TABLE `fornecedor`
  ADD PRIMARY KEY (`for_codigo`);

--
-- Indexes for table `lote`
--
ALTER TABLE `lote`
  ADD PRIMARY KEY (`lot_codigo`);

--
-- Indexes for table `nota_fiscal`
--
ALTER TABLE `nota_fiscal`
  ADD PRIMARY KEY (`ntf_codigo`);

--
-- Indexes for table `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`pac_codigo`);

--
-- Indexes for table `permissao`
--
ALTER TABLE `permissao`
  ADD PRIMARY KEY (`per_codigo`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`prd_codigo`);

--
-- Indexes for table `prontuario`
--
ALTER TABLE `prontuario`
  ADD PRIMARY KEY (`prt_codigo`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`query_cod`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`emp_codigo`,`usu_login`);

--
-- Indexes for table `usuario_modulo_empresa`
--
ALTER TABLE `usuario_modulo_empresa`
  ADD PRIMARY KEY (`emp_codigo`,`usu_login`,`mod_codigo`),
  ADD KEY `fk_usuario_modulo_empresa_modulo1` (`mod_codigo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `estoque`
--
ALTER TABLE `estoque`
  MODIFY `est_codigo` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;
--
-- AUTO_INCREMENT for table `estoque_vencido`
--
ALTER TABLE `estoque_vencido`
  MODIFY `etv_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `fornecedor`
--
ALTER TABLE `fornecedor`
  MODIFY `for_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `lote`
--
ALTER TABLE `lote`
  MODIFY `lot_codigo` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `nota_fiscal`
--
ALTER TABLE `nota_fiscal`
  MODIFY `ntf_codigo` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `paciente`
--
ALTER TABLE `paciente`
  MODIFY `pac_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `permissao`
--
ALTER TABLE `permissao`
  MODIFY `per_codigo` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `prd_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `prontuario`
--
ALTER TABLE `prontuario`
  MODIFY `prt_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `fk_empresa_empresa` FOREIGN KEY (`emp_codigo_pai`) REFERENCES `empresa` (`emp_codigo`) ON UPDATE SET NULL;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

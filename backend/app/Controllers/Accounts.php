<?php
    namespace App\Controllers;
    use app\Models;
    use app\Models\Accounts as AccountsModel;
    use vendor\Controller;
    use vendor\DB;

    class Accounts extends Controller{
        private $accountmodel;
        public function __construct(){
            $this->accountmodel = new AccountsModel();
        }
        public function getAccounts(){
            if (isset($_POST['userID'])){
                $id = $_POST['userID'];
                return $this->accountmodel->getAccount($id);
            }
            else{
                return $this->accountmodel->getAccounts();
            }
        }
        public function newAccount(){
            $userID = null;
            $account = $_POST['account'];
            $password = $_POST['password'];
            $response = $this->checkAccount($account);
            if ($response['status'] == 200) {
                // 帳號已存在，不可新增
                return $this->response(400, "Account already exists", null);
            } else {
                // 帳號已存在
                return $this->accountmodel->newAccount($userID, $account, $password);
            }
        }
        public function updateAccount(){
            $userID = $_POST['userID'];
            $account = $_POST['account'];
            $password = $_POST['password'];
            return $this->accountmodel->updateAccount($userID,$account,$password);
        }
        public function removeAccount(){
            $userID = $_POST['userID'];
            return $this->accountmodel->removeAccount($userID);
        }
        public function login(){
            $account = $_POST['account'];
            $password = $_POST['password'];
            $response = $this->accountmodel->login($account,$password);
            if ($response['status'] == 200 && count($response['result']) == 1){
                $userID = $response['result'][0]['userID'];
                $userInfo = $this->accountmodel->getUserInfo($userID);
                return $this->response(200, "Login successful", $userInfo['result']);
            }
            else{
                return $this->response(401, "Login failed", null);
            }
        }

        public function checkAccount($account){
            $result = $this->accountmodel->checkAccount($account);
            if (count($result['result']) > 0) {
                return $this->response(200, "Account exists", $result['result']);
            } else {
                return $this->response(404, "Account does not exist", null);
            }
        }
        public function getUserID(){
            $account = $_POST['account'];
            return $this->accountmodel->getUserID($account);
        }
    }
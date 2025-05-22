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
            return $this->accountmodel->newAccount($userID,$account,$password);
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
    }
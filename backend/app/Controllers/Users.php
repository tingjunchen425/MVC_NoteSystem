<?php
    namespace app\Controllers;
    use app\Models;
    use app\Models\Users as UsersModel;
    use vendor\DB;
    use vendor\Controller;

    class Users extends Controller{
        private $usermodel;
        public function __construct(){
            $this->usermodel = new UsersModel();
        }
        public function getUsers(){
            if (isset($_POST['userID'])){
                $id = $_POST['userID'];
                return $this->usermodel->getUser($id);
            }
            else{
                return $this->usermodel->getUsers();
            }
        }
        public function newUser(){
            $userID = $_POST['userID'];
            $userName = $_POST['userName'];
            return $this->usermodel->newUser($userID,$roleID,$userName);
        }
        public function updateUser(){
            $userID = $_POST['userID'];
            $userName = $_POST['userName'];
            return $this->usermodel->updateUser($userID,$userName);
        }
        public function removeUser(){
            $userID = $_POST['userID'];
            return $this->usermodel->removeUser($userID);
        }
        public function query(){
            $field = $_POST['field'];
            $value = $_POST['value'];
            return $this->usermodel->query($field,$value);
        }
        public function getSimpleUser(){
            return $this->usermodel->getSimpleUser();
        }
    }
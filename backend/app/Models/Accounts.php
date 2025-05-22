<?php
    namespace App\Models;
    use vendor\DB;
    
    class Accounts{
        public function getAccounts(){
            $query = "SELECT * FROM account";
            $args = null;
            return DB::select($query, $args);
        }
        public function getAccount($userID){
            $query = "SELECT * FROM account WHERE userID = ?";
            $args = [$userID];
            return DB::select($query, $args);
        }
        public function newAccount($userID, $account,$password){
            $query = "INSERT INTO `account`(`userID`, `account`, `password`) VALUES (?,?,?)";
            $args = [$userID, $account, $password];
            return DB::insert($query, $args);
        }
        public function updateAccount($userID, $account, $password){
            $query = "UPDATE `account` SET `account` = ?, `password` = ? WHERE userID = ?";
            $args = [$account, $password, $userID];
            return DB::update($query, $args);
        }
        public function removeAccount($userID){
            $query = "DELETE FROM account WHERE userID = ?";
            $args = [$userID];
            return DB::delete($query, $args);
        }
    }
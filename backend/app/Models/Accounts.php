<?php
    namespace app\Models;
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
        public function login($account, $password){
            $query = "SELECT * FROM account WHERE account = ? AND password = ?";
            $args = [$account, $password];
            return DB::select($query, $args);
        }
        public function getUserInfo($userID){
            $sql = "SELECT `user`.`userID`, `user`.`userName`,`user_role`.`roleID`,roleName,account,password 
                    	FROM `user`
                        JOIN `user_role` on (`user`.`userID` = `user_role`.`userID`)
                        JOIN `role` on (`role`.`roleID` = `user_role`.`roleID`)
                        JOIN `account` on (`user`.`userID` = `account`.`userID`)
                        WHERE `user`.`userID` = ?";
            $args = [$userID];
            return DB::select($sql, $args);
        }

        public function checkAccount($account){
            $sql = "SELECT * FROM account WHERE account = ?";
            $args = [$account];
            return DB::select($sql, $args);
        }
        public function getUserID($account){
            $sql = "SELECT userID FROM account WHERE account = ?";
            $args = [$account];
            return DB::select($sql, $args);
        }
    }
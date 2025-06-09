<?php
    namespace app\Models;
    use vendor\DB;

    class Users{
        public function getUsers(){
            $sql = "SELECT * FROM user";
            $args = null;
            return DB::select($sql,$args);
        }
        public function getUser($id){
            $sql = "SELECT `user`.`userID`,`user`.`userName`
                        FROM `user` 
                        JOIN `user_role` on (`user`.`userID` = `user_role`.`userID`)
                        WHERE `user`.`userID` =  ?";
            $args = [$id];
            return DB::select($sql,$args);
        }

        public function newUser($userID, $userName){
            $sql = "INSERT INTO user (userID, userName) VALUES (?, ?, ?)";
            $args = [$userID, $roleID, $userName];
            return DB::insert($sql,$args);
        }

        public function updateUser($userID, $userName){
            $sql = "UPDATE user SET userName = ? WHERE userID = ?";
            $args = [$userName, $userID];
            return DB::update($sql,$args);
        }

        public function removeUser($userID){
            $sql = "DELETE FROM user WHERE userID = ?";
            $args = [$userID];
            return DB::delete($sql,$args);
        }
        public function query($field, $value){
            $sql = "SELECT * FROM user WHERE $field = ?";
            $args = [$value];
            return DB::select($sql,$args);
        }

        public function getSimpleUser(){
            $sql = "SELECT * FROM user WHERE roleID = '002'";
            $args = null;
            return DB::select($sql,$args);
        }

        public function getRoles($id){
            $sql = "SELECT roleID  FROM  `user_role` WHERE `userID`=?";
            $args = [$id];
            $response = DB::select($sql, $args);
            $result = $response['result'];
            for ($i=0; $i < count($result); $i++) { 
                $result[$i] = $result[$i]['roleID'];    
            }
            $response['result'] = $result;
            return $response;
        }
    }
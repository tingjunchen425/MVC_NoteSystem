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
            $sql = "SELECT * FROM user WHERE userID = ?";
            $args = [$id];
            return DB::select($sql,$args);
        }

        public function newUser($userID, $roleID, $userName){
            $sql = "INSERT INTO user (userID, roleID, userName) VALUES (?, ?, ?)";
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
    }
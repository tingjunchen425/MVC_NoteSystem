<?php
    namespace App\Models;
    use vendor\DB;
    
    class Notes{
        public function getNotes(){
            $sql = "SELECT * FROM `note`";
            $args = null;
            return DB::select($sql, $args);
        }
        public function getNote($noteID){
            $sql = "SELECT * FROM `note` WHERE `noteID` = ?";
            $args = [$noteID];
            return DB::select($sql, $args);
        }
        public function newNote($ownerID, $title, $context, $status){
            $sql = "INSERT INTO `note`(`ownerID`, `title`, `context`, `status`) VALUES (?,?,?,?)";
            $args = [$ownerID, $title, $context, $status];
            return DB::insert($sql, $args);
        }
        public function updateNote($noteID, $title, $context, $status){
            $sql = "UPDATE `note` SET `title` = ?, `context` = ?, `status` = ? WHERE `noteID` = ?";
            $args = [$title, $context, $status, $noteID];
            return DB::update($sql, $args);
        }
        public function removeNote($noteID){
            $sql = "DELETE FROM `note` WHERE `noteID` = ?";
            $args = [$noteID];
            return DB::delete($sql, $args);
        }
        public function query($field, $value){
            $sql = "SELECT * FROM `note` WHERE `$field` = ?";
            $args = [$value];
            return DB::select($sql, $args);
        }

        public function getPublicNotes(){
            $sql = "SELECT * FROM `note` 
                        JOIN `user` WHERE `note`.`ownerID` = `user`.`userID`
                        HAVING `note`.`status` = 'public';";
            $args = null;
            return DB::select($sql, $args);
        }

        public function getUserNotes($userID){
            $sql = "SELECT * FROM `note` WHERE `ownerID` = ?";
            $args = [$userID];
            return DB::select($sql, $args);
        }
        public function viewNote($noteID){
            $sql = "SELECT * FROM `note` 
                        JOIN `user` on (`user`.`userID` = `note`.`ownerID`)
                        WHERE `note`.`noteID` = ?;";
            $args = [$noteID];
            return DB::select($sql, $args);
        }
    }
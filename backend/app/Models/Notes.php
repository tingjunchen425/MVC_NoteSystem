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
            $sql = "INSERT INTO `note`(`noteID`, `ownerID`, `title`, `context`, `status`, `updateTime`) VALUES (?,?,?,?,?,?)";
            $args = [null, $ownerID, $title, $context, $status];
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
    }
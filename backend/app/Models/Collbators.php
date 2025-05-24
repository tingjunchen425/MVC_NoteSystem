<?php
    namespace App\Models;
    use vendor\DB;
    use vendor\Controller;

    class Collbators{
        public function getCollbators($noteID){
            $sql = "SELECT noteID,collbatorID,collbatorRole,userName 
                        FROM `collbator`
                        JOIN `user` on (`user`.`userID` = `collbator`.`collbatorID`)
                        where `noteID` = ?";
            $args = [$noteID];
            return DB::select($sql, $args);
        }
        public function newCollbator($noteID, $collbatorID, $collbatorRole){
            $sql = "INSERT INTO `collbator`(`noteID`, `collbatorID`, `collbatorRole`) VALUES (?,?,?)";
            $args = [$noteID, $collbatorID, $collbatorRole];
            return DB::select($sql, $args);
        }
        public function deleteCollbator($noteID, $collbatorID){
            $sql = "DELETE FROM `collbator` WHERE `noteID` = ? AND `collbatorID` = ?";
            $args = [$noteID, $collbatorID];
            return DB::select($sql, $args);
        }
        public function updateCollbatorRole($noteID, $collbatorID, $collbatorRole){
            $sql = "UPDATE `collbator` SET `collbatorRole` = ? WHERE `noteID` = ? AND `collbatorID` = ?";
            $args = [$collbatorRole, $noteID, $collbatorID];
            return DB::select($sql, $args);
        }
        public function getCollbateNote($collbatorID){
            $sql = "SELECT `note`.`noteID`,`note`.`title`, `note`.`updateTime`,`note`.`status`,`collbator`.`collbatorRole`
                        FROM `collbator` 
                        JOIN `note` on (`note`.`noteID` = `collbator`.`noteID`)
                        WHERE `collbator`.`collbatorID` = ?";
            $args = [$collbatorID];
            return DB::select($sql, $args);
        }
    }


<?php
    namespace App\Controllers;
    use vendor\Controller;
    use App\Models\Collbators as CollbatorsModel;

    class Collbators extends Controller{
        private $collbatorsModel;

        public function __construct(){
            $this->collbatorsModel = new CollbatorsModel();
        }

        public function getCollbators(){
            $noteID = $_POST['noteID'];
            return $this->collbatorsModel->getCollbators($noteID);
        }

        public function newCollbator(){
            $noteID = $_POST['noteID'];
            $collbatorID = $_POST['collbatorID'];
            $collbatorRole = $_POST['collbatorRole'];
            return $this->collbatorsModel->newCollbator($noteID, $collbatorID, $collbatorRole);
        }

        public function deleteCollbator(){
            $noteID = $_POST['noteID'];
            $collbatorID = $_POST['collbatorID'];
            return $this->collbatorsModel->deleteCollbator($noteID, $collbatorID);
        }

        public function updateCollbatorRole(){
            $noteID = $_POST['noteID'];
            $collbatorID = $_POST['collbatorID'];
            $collbatorRole = $_POST['collbatorRole'];
            return $this->collbatorsModel->updateCollbatorRole($noteID, $collbatorID, $collbatorRole);
        }

        public function getCollbateNote(){
            $collbatorID = $_POST['collbatorID'];
            return $this->collbatorsModel->getCollbateNote($collbatorID);
        }
    }
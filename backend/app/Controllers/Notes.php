<?php
    namespace app\Controllers;
    use app\Models;
    use app\Models\Notes as NotesModel;
    use vendor\DB;
    use vendor\Controller;

    class Notes extends Controller{
        private $notesmodel;
        public function __construct(){
            $this->notesmodel = new NotesModel();
        }
        public function getNotes(){
            if (isset($_POST['noteID'])){
                $id = $_POST['noteID'];
                return $this->notesmodel->getNote($id);
            }
            else{
                return $this->notesmodel->getNotes();
            }
        }
        public function newNote(){
            $noteID = null;
            $ownerID = $_POST['ownerID'];
            $title = $_POST['title'];
            $context = $_POST['context'];
            $status = $_POST['status'];
            return $this->notesmodel->newNote($ownerID,$title,$context,$status);
        }
        public function updateNote(){
            $noteID = $_POST['noteID'];
            $title = $_POST['title'];
            $context = $_POST['context'];
            $status = $_POST['status'];
            return $this->notesmodel->updateNote($noteID,$title,$context,$status);
        }
        public function removeNote(){
            $noteID = $_POST['noteID'];
            return $this->notesmodel->removeNote($noteID);
        }
        public function query(){
            $field = $_POST['field'];
            $value = $_POST['value'];
            return $this->notesmodel->query($field,$value);
        }
        public function getPublicNotes(){
            return $this->notesmodel->getPublicNotes();
        }
        public function getUserNotes(){
            $userID = $_POST['userID'];
            return $this->notesmodel->getUserNotes($userID);
        }
        public function viewNote(){
            $noteID = $_POST['noteID'];
            return $this->notesmodel->viewNote($noteID);
        }
    }
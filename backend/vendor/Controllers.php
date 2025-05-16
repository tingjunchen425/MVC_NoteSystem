<?php
    namespace vendor;
        
    abstract class Controller{
        protected static function response($status,$message,$result = null){
            $response['status'] = $status;
            $response['message'] = $message;
            $response['result'] = $result;
            return $response;
        }
    }
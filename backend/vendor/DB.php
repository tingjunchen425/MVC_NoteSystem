<?php
    namespace vendor;
    use vendor\Controller;
    use \PDO;
    use \PDOException;


    class DB extends Controller{
        public static $dbName ;
        public static $dbHost ;
        public static $dbUser ;
        public static $dbPassword ;
        public static $conn = null;
        static function connect(){
            if(self::$conn != null){
                return self::$conn;
            }
            $dsn = sprintf("mysql:host=%s;dbname=%s",self::$dbHost,self::$dbName);
            try{
                self::$conn = new PDO($dsn,self::$dbUser,self::$dbPassword);
            }
            catch(PDOException $e){
                self::$conn = null;
            }
        }
        static function select($sql,$args){
            self::connect();
            if (self::connect() == null){
                return self::response(14,"Database connection error");
            }
            $stmt = self::$conn->prepare($sql);
            $result = $stmt->execute($args);
            if ($result){
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $resp = self::response(200,"select success",$result);
            }
            else{
                $resp = self::response(400,"sql error");
            }
            return $resp;
        }
        static function insert($sql,$args){
            self::connect();
            if (self::connect() == null){
                return self::response(14,"Database connection error");
            }
            $stmt = self::$conn->prepare($sql);
            $result = $stmt->execute($args);
            if ($result){
                $count = $stmt->rowCount();
                if ($count < 1){
                    $resp = self::response(204,'Insert failed');
                }
                else{
                    $resp = self::response(200,'Insert success');
                }
            }
            else{
                $resp = self::response(400,'SQL error');
            }
            return $resp;
        }
        static function update($sql,$args){
            self::connect();
            if (self::connect() == null){
                return self::response(14,"Database connection error");
            }
            $stmt = self::$conn->prepare($sql);
            $result = $stmt->execute($args);
            if ($result){
                $count = $stmt->rowCount();
                if ($count < 1){
                    $resp = self::response(204,'Update failed');
                }
                else{
                    $resp = self::response(200,'Update success');
                }
            }
            else{
                $resp = self::response(400,'SQL error');
            }
            return $resp;
        }
        static function delete($sql,$args){
            self::connect();
            if (self::connect() == null){
                return self::response(14,"Database connection error");
            }
            $stmt = self::$conn->prepare($sql);
            $result = $stmt->execute($args);
            if ($result){
                $count = $stmt->rowCount();
                if ($count < 1){
                    $resp = self::response(204,'Delete failed');
                }
                else{
                    $resp = self::response(200,'Delete success');
                }
            }
            else{
                $resp = self::response(400,'SQL error');
            }
            return $resp;
        }
    }
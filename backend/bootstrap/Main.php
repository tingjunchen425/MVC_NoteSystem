<?php
    namespace bootstrap;

    require_once __DIR__ . '/../vendor/Autoload.php';
    use vendor\Router;
    use vendor\DB;

    class Main{
        static function run(){
            $conf = parse_ini_file(__DIR__ . '/../vendor/.env');
            DB::$dbName = $conf['dbname'];
            DB::$dbHost = $conf['dbhost'];
            DB::$dbUser = $conf['dbuser'];
            DB::$dbPassword = $conf['dbpassword'];

            if (isset($_GET['act'])){
                $act = $_GET['act'];
            }
            else{
                $act = "_no_act";
            }
            $router = new Router();
            require_once __DIR__ . '/../routes/web.php';
            $response = $router->run($act);
            echo json_encode($response);
        }
    }
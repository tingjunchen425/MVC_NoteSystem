<?php
    namespace bootstrap;

    require_once __DIR__ . '/../vendor/autoload.php';
    use Middlewares\AuthMiddleware;
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
            // if ($act == "getPublicNotes" or $act == "viewNote"){
            //     $router = new Router();
            //     require_once __DIR__ . "/../routes/web.php";
            //     $response = $router->run($act);
            // }
            // else{
                $response = $responseToken = AuthMiddleware::checkToken();
                if($responseToken['status'] == 200) {
                    if($act != "_no_act") { 
                        $router = new Router();
                        require_once __DIR__ . "/../routes/web.php";
                        $response = $router->run($act);
                    }
                    $response['token'] = $responseToken['token'];
                }
                else if($act == "login"){
                    $response = AuthMiddleware::doLogin();
                }
                else if($act == "getPublicNotes" or $act == "viewNote"){
                    $router = new Router();
                    require_once __DIR__ . "/../routes/web.php";
                    $response = $router->run($act);
                }
                else{
                    $response = array(
                        'status' => 401,
                        'message' => 'Access denied'
                    );
                }
            // }
            echo json_encode($response);

        }
    }
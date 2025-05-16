<?php
    namespace vendor;
    use vendor\Controller;
    use vendor\DB;

    class Router{
        private $router_table;
        public function __construct(){
                $this->router_table = array();
        }
        public function register($act, $class, $method){
            $arr['class'] = $class;
            $arr['method'] = $method;
            $this->router_table[$act] = $arr;
        }
        public function run($act){
            $class = $this->router_table[$act]['class'];
            $method = $this->router_table[$act]['method'];
            // require_once __DIR__ . '/../app/Controllers/' . $class . '.php';
            $class = 'app\\Controllers\\' . $class;
            $controller = new $class();
            $response = $controller->$method();
            return $response;
        }
    }
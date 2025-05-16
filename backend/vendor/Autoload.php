<?php
    class Autoload{
        public static function load($class){
            $class = str_replace('\\', '/', $class);
            $path = __DIR__ . '/../' . $class . '.php';
            if(file_exists($path)){
                require_once $path;
            }
        }
    }
    spl_autoload_register(array('Autoload', 'load'));
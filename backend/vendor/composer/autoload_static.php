<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitbd603012e39cc762ce1bd21db292064e
{
    public static $prefixLengthsPsr4 = array (
        'v' => 
        array (
            'vendor\\' => 7,
        ),
        'b' => 
        array (
            'bootstrap\\' => 10,
        ),
        'a' => 
        array (
            'app\\Models\\' => 11,
            'app\\Controllers\\' => 16,
        ),
        'M' => 
        array (
            'Middlewares\\' => 12,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'vendor\\' => 
        array (
            0 => 'C:\\xampp\\htdocs\\final\\backend\\vendor',
        ),
        'bootstrap\\' => 
        array (
            0 => __DIR__ . '/../..' . '/bootstrap',
        ),
        'app\\Models\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app/Models',
        ),
        'app\\Controllers\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app/Controllers',
        ),
        'Middlewares\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app/Middlewares',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
            1 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitbd603012e39cc762ce1bd21db292064e::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitbd603012e39cc762ce1bd21db292064e::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitbd603012e39cc762ce1bd21db292064e::$classMap;

        }, null, ClassLoader::class);
    }
}

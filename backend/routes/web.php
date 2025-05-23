<?php
    $router -> register("getUsers", "Users" , "getUsers");
    $router -> register("newUser", "Users" , "newUser");
    $router -> register("updateUser", "Users" , "updateUser");
    $router -> register("removeUser", "Users" , "removeUser");
    $router -> register("userQuery", "Users" , "query");

    $router -> register("getAccounts", "Accounts" , "getAccounts");
    $router -> register("newAccount", "Accounts" , "newAccount");
    $router -> register("updateAccount", "Accounts" , "updateAccount");
    $router -> register("removeAccount", "Accounts" , "removeAccount");

    $router -> register("getNotes", "Notes" , "getNotes");
    $router -> register("newNote", "Notes" , "newNote");
    $router -> register("updateNote", "Notes" , "updateNote");
    $router -> register("removeNote", "Notes" , "removeNote");
    $router -> register("noteQuery", "Notes" , "query");
    $router -> register("getPublicNotes", "Notes" , "getPublicNotes");
    $router -> register("viewNote", "Notes" , "viewNote");
    $router -> register("getUserNotes", "Notes" , "getUserNotes");

    $router -> register("login", "Accounts" , "login");
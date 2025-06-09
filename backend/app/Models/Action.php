<?php
    namespace app\Models;
    use vendor\DB;

    class Action{
    public function getRoles($action){
        $sql = "SELECT role_action.roleID  FROM  `action`, `role_action` WHERE  action.act=? and role_action.actID=action.actID;";
        $arg = array($action);
        $response = DB::select($sql, $arg);
        $result = $response['result'];
        for ($i=0; $i < count($result); $i++) { 
            $result[$i] = $result[$i]['roleID'];    
        }
        $response['result'] = $result;
        return $response;
    }
}

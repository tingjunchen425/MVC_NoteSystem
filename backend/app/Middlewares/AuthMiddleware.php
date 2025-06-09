<?php
namespace Middlewares;
use \Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Vendor\Controller;
use app\Models\Accounts as AccountsModel;
use app\Models\Users as UsersModel;
use app\Models\Action as ActionModel;

class AuthMiddleware extends Controller{
    private static $id;
    public static function checkToken(){
        $headers = getallheaders();
        $jwt = $headers['Auth'];
        $secret_key = "root";
        try {
            $payload = JWT::decode($jwt,new Key($secret_key, 'HS256'));
            $jwt = self::genToken($payload->data->id);
            self::$id = $payload->data->id;
            $response['status'] = 200;
            $response['message'] = "Access granted";
            $response['token'] = $jwt;
        } catch (Exception $e) {
            $response['status'] = 403;
            $response['message'] = $e->getMessage();
        }
        return $response;
    }
    public static function doLogin(){
        $account = $_POST['account'];
        $password = $_POST['password'];
        //查詢DB驗證帳密的正確性
        $accountModel = new AccountsModel();
        $result = $accountModel->login($account, $password);


        if ($result['status'] == 200 && count($result['result']) > 0) {
            $user = $result['result'][0];
            $jwt = self::genToken($user['userID']); // ← 這裡改成 self::
            $response['status'] = 200;
            $response['message'] = "Access granted";
            $response['token'] = $jwt;
        } 
        else {
            // 驗證失敗
            $response = array(
                'status' => 401,
                'message' => '帳號或密碼錯誤'
            );
        }
        return $response;
    }
    private static function genToken($id){
        $secret_key = "root";
        $issuer_claim = "http://localhost";
        $audience_claim = "http://localhost";
        $issuedat_claim = time(); // issued at
        $expire_claim = $issuedat_claim + 60;
        $payload = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
            )
        );
        $jwt = JWT::encode($payload, $secret_key, 'HS256');
        return $jwt;
    }

    public static function checkPrevilege($action){
        $id = self::$id;
        $um = new UsersModel();
        $response = $um->getRoles($id);
        $user_roles = $response['result'];
        $am = new ActionModel();
        $response = $am->getRoles($action);
        $action_roles = $response['result'];
        $r = array_intersect($user_roles, $action_roles);
        if(count($r)!=0){
            return self::response(200, '有權限');
        }
        else{
            return self::response(403, '沒有權限');
        }
    }

}

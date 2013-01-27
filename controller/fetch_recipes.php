<?php 
	 
  require 'API_cache.php';

  $cache_file = 'recipes.json';
  $api_call = 'http://food.cs50.net/api/1.3/recipes?output=json';
  $cache_for = 60*60*24; // cache recipes for one day

  $api_cache = new API_cache ($api_call, $cache_for, $cache_file);
  if (!$res = $api_cache->get_api_cache())
    $res = '{"error": "Could not load cache"}';

  ob_start();
  echo $res;
  $json_body = ob_get_clean();

  header ('Content-Type: application/json');
  header ('Content-length: ' . strlen($json_body));
  header ("Expires: " . $api_cache->get_expires_datetime());
  echo $json_body;

?>
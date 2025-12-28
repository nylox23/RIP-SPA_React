export const target_tauri = true;

export const api_proxy_addr = "http://192.168.1.65:8080";

export const dest_api = (target_tauri) ? api_proxy_addr + "/api" : "/api";

export const dest_root = (target_tauri) ? "" : "/acid-app";
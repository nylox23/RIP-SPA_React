import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';
import { api_proxy_addr, dest_root } from "./src/target_config"

export default defineConfig({
    base: dest_root,
    server: {
        port: 3000,
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
        },
        proxy: {
            "/api": {
                target: api_proxy_addr,
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [
        react(),
        mkcert(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: "Carbonate Calculator",
                short_name: "AcidApp",
                start_url: dest_root,
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#004976",
                orientation: "portrait-primary",
                icons: [
                    {
                        "src": "logo192.png",
                        "type": "image/png",
                        "sizes": "192x192"
                    },
                    {
                        "src": "logo512.png",
                        "type": "image/png",
                        "sizes": "512x512"
                    }
                ]
            }
        })
    ],
})
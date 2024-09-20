import { UserConfig, defineConfig, loadEnv } from 'vite';
import { miniWebsiteViteConfig } from './packages/50-mini-web-website/vite.config';

export default defineConfig((options) => {
    // const { mode } = options;
    // const { VITE_MINI_WEBSITE_PROJECT, VITE_HOME_PROJECT } = loadEnv(mode, process.cwd());
    // if (VITE_MINI_WEBSITE_PROJECT === '50-website') {
    //     return {
    //         ...miniWebsiteViteConfig as UserConfig
    //     };
    // }
    return {
        base: './',
        server: {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            port: 3001
        }
    };
});
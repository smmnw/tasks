module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        env: {
            production: {
                plugins: [
                    'react-native-paper/babel', // React Native Paper plugin
                    ['module:react-native-dotenv', { // Dotenv plugin
                        moduleName: '@env', // Import module name
                        path: '.env', // Path to your .env file
                    }],
                ],
            },
        },
        plugins: [
            'react-native-reanimated/plugin',
            ['module:react-native-dotenv', {
                moduleName: '@env',
                path: '.env',
                blocklist: null,
                allowlist: null,
                safe: false,
                allowUndefined: true,
            }],
        ],
    };
};
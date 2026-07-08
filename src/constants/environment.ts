export default {

    mapboxToken: process.env.EXPO_PUBLIC_MAPBOX_TOKEN,

    env: process.env.NODE_ENV || 'development',

    api: {
       url: process.env.EXPO_PUBLIC_API_URL,
    },

    version: "1.0.0"
}
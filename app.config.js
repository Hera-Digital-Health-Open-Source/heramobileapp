// Determine which environment file to load
const environment = process.env.NODE_ENV || process.env.EXPO_PUBLIC_ENV || 'development';

// Load the appropriate .env file
const envFile = environment === 'production' ? '.env.production' : '.env.development';
require('dotenv').config({ path: envFile });

if(environment === 'development'){
  console.log('='.repeat(100))
  console.log(`🌍 Loading environment: ${environment} from ${envFile}`);
  
  console.log(process.env.EXPO_PUBLIC_AUTH0_DOMAIN)
  console.log(process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID)
  console.log(process.env.EXPO_PUBLIC_BASE_URL)
}

export default () => ({
  expo: {
    name: "Hera Digital Health",
    slug: "hera-digital-health",
    version: "1.0.33",
    orientation: "portrait",
    icon: "./assets/images/adaptive-icon.png",
    scheme: "androidapp", //myapp
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    // updates: {
    //   enabled: true,
    //   url: 'https://localhost'
    // },
    // runtimeVersion: {
    //   policy: "appVersion"
    // },
    ios: {
      buildNumber: "31",
      icon: "./assets/images/ios-light.png",
      supportsTablet: true,
      bundleIdentifier: "com.heradigitalhealth.ios",
      infoPlist: {
        NSSpeechRecognitionUsageDescription: "Allow $(PRODUCT_NAME) to use speech recognition.",
        NSMicrophoneUsageDescription: "Allow $(PRODUCT_NAME) to use the microphone.",
        NSPhotoLibraryUsageDescription: "Some features may require access to your photo library, even if unused directly.",
        NSLocationWhenInUseUsageDescription: "Allow $(PRODUCT_NAME) to access your location while using the app.",
      }
    },
    android: {
      versionCode: 31,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.heradigitalhealth.androidapp",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      },
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION"
      ],
      manifestPlaceholders: {
        auth0Domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN || "heradigitalhealth.eu.auth0.com",
        auth0Scheme: "myapp",                    // 🔁 use your actual scheme
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            buildToolsVersion: '35.0.0',
          },
        },
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/hera_icon_new.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Roboto-Medium.ttf",
            "./assets/fonts/Roboto-Bold.ttf",
            "./assets/fonts/Roboto-ExtraBold.ttf",
            "./assets/fonts/Roboto-Black.ttf"
          ]
        }
      ],
      [
        "react-native-auth0",
        {
          domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN || "heradigitalhealth.eu.auth0.com"
        }
      ],
      "expo-secure-store",
      [
        "expo-speech-recognition",
        {
          microphonePermission: "Allow $(PRODUCT_NAME) to use the microphone.",
          speechRecognitionPermission: "Allow $(PRODUCT_NAME) to use speech recognition.",
          androidSpeechServicePackages: [
            "com.google.android.googlequicksearchbox"
          ]
        }
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
      "expo-localization"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "22949870-bb79-4270-a491-9d0f313c4c2b"
      }
    }
  },
});
# HERA Mobile App

Welcome to the HERA Mobile App repository! HERA is dedicated to connecting refugee communities with essential healthcare services through an open-source mobile health platform. By making our technology freely available, we hope to empower organizations like NGOs and local aid groups to customize and deploy healthcare solutions that meet the specific needs of refugees in their regions.

## Overview

HERA’s mission is to support vulnerable populations, particularly refugees, by increasing access to vital healthcare services. As part of this mission, HERA focuses on preventive healthcare, with an initial goal to improve prenatal care and vaccination rates among refugees. This project began by addressing critical healthcare needs among Syrian refugees in Turkey, and HERA plans to extend support to refugees globally.

Our technology stack includes a React Native (Expo) mobile app and [Django web backend](https://github.com/Hera-Digital-Health-Open-Source/herabackend) with robust APIs, and an admin panel, all of which can be adapted by organizations to provide tailored healthcare solutions.

## Features

- **Mobile Health Platform**: Connects refugees with available healthcare services.
- **Customizable Solution**: Open-source codebase that NGOs and organizations can adapt to specific regions and needs.
- **Focus on Maternal and Child Health**: Prioritizes prenatal care and childhood vaccinations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (version 22.13.0).
- **For Android:**
  - [Android Studio](https://developer.android.com/studio), with the Android SDK Platform 36 and Build-Tools 36.0.0 installed (from *Settings → Languages & Frameworks → Android SDK*). The app targets Android 16 (API level 36).
  - Java 17 (JDK 17), with `JAVA_HOME` pointing to it. React Native 0.79 builds with Java 17; newer Java versions can fail.
  - An Android emulator, or an Android phone with USB debugging turned on.
- **For iOS (Mac only):** [Xcode](https://developer.apple.com/xcode/) and [CocoaPods](https://cocoapods.org/), plus an iOS simulator or an iPhone.

> **Expo Go does not work with this app.** Expo Go is Expo's ready-made sandbox app. It can't load the native libraries this app uses (Auth0 login, Google Maps, speech recognition). You always run the app from your own build, made with the commands below.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hera-Digital-Health-Open-Source/heramobileapp.git
   cd heramobileapp
   ```

2. **Install the JavaScript dependencies:**

   ```bash
   npm install
   ```

3. **Get the `.env` file from another developer** and put it in the project's root folder (next to `package.json`). It holds `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`, the Google Maps key. It is kept out of git on purpose, so the maps screen won't work without it.

4. **Build the app and run it** on an Android emulator or phone (use `npm run ios:dev` for iOS):

   ```bash
   npm run android:dev
   ```

   The first run takes several minutes. It creates the `android/` folder, compiles the native app, installs it, and starts **Metro**, the server that sends your JavaScript code to the app. When you save a file, the app reloads with your change.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction): each file in `app/` is a screen, and its path is the screen's route.

## Environments: which server the app talks to

The app can run against two backends. The `NODE_ENV` environment variable picks which one. [app.config.js](app.config.js) (the Expo config file that builds the app's settings) reads `NODE_ENV` and loads one settings file:

| `NODE_ENV` | Settings file loaded | Used for |
| --- | --- | --- |
| `development`, or not set | `.env.mazeh` | Development and testing |
| `production` | `.env.ceddi` | The live app in the stores |

Both files are in git. Each one sets these variables:

- `EXPO_PUBLIC_BASE_URL`: the address of the HERA backend API.
- `EXPO_PUBLIC_AUTH0_DOMAIN` and `EXPO_PUBLIC_AUTH0_CLIENT_ID`: the Auth0 tenant and app used for login.
- `EXPO_PUBLIC_API_IDENTIFIER`: the Auth0 API identifier the backend expects.

The `.env` file from step 3 of Installation is always loaded in addition to these, whatever `NODE_ENV` says.

You don't set `NODE_ENV` yourself. Every script whose name ends in `:dev` sets it to `development`, and every script ending in `:prod` sets it to `production`.

**Switching between dev and prod needs a prebuild.** The settings end up in two places:

1. **The JavaScript code.** Metro copies these values into the code each time it bundles. The `NODE_ENV` of the command you run decides which values are used.
2. **The native project folders (`android/` and `ios/`).** The Auth0 domain is written into these folders once, when they are created. This step is called "prebuild".

So when you move from dev to prod (or back), run `npm run prebuild:prod` (or `npm run prebuild:dev`) first. If you skip it, the JavaScript code and the native folders point at different Auth0 tenants, and login can fail.

## Commands

All commands below are scripts in [package.json](package.json). Run them with `npm run <name>`. To pass extra options to a script, put them after `--`. For example, `npm run prebuild:prod -- --platform android` passes `--platform android` to `expo prebuild`.

### Build and run a development build

A development build includes the developer menu and loads your JavaScript from Metro, so it reloads when you save. Use these for everyday work.

| Script | What it does |
| --- | --- |
| `android:dev` | Builds the Android app with the **development** settings, installs it on the emulator or phone, and starts Metro. |
| `android:prod` | Same, with the **production** settings. Use it to try your code against the live backend. |
| `android` | Same as `android:dev`. It doesn't set `NODE_ENV`, so Expo falls back to development. Prefer `android:dev` so the choice is visible. |
| `ios:dev` | Builds the iOS app with the **development** settings, installs it on the simulator or iPhone, and starts Metro. |
| `ios:prod` | Same, with the **production** settings. |
| `ios` | Same as `ios:dev` (no `NODE_ENV` set). Prefer `ios:dev`. |

### Start Metro only

Use these when the app is already installed and you only need to restart Metro. This is much faster than rebuilding. You only need a rebuild after you change native code, `app.config.js`, or add a library with native code.

| Script | What it does |
| --- | --- |
| `start:dev` | Starts Metro with the **development** settings. |
| `start:prod` | Starts Metro with the **production** settings. |
| `start` | Starts Metro without setting `NODE_ENV`, so Expo uses development. |

After you edit a `.env` file, stop Metro and start it again so it picks up the new values.

### Build and run a release build

A release build packs the JavaScript inside the app and has no developer menu, the same as what users get. Use these to check speed and final behavior before a release.

| Script | What it does |
| --- | --- |
| `release:android:dev` | Builds a release APK with the **development** settings and installs it on the emulator or phone. |
| `release:android:prod` | Same, with the **production** settings. |
| `release:ios:dev` | Builds the iOS app in the Release configuration with the **development** settings and installs it. |
| `release:ios:prod` | Same, with the **production** settings. |

> The Android release APK from these scripts is signed with the **debug key**, a shared test key that comes with every new Android project. Google Play rejects it. To make the file you upload to Play, follow [Releasing to Google Play](#releasing-to-google-play).

### Regenerate the native folders

| Script | What it does |
| --- | --- |
| `prebuild:dev` | Creates or updates the `android/` and `ios/` folders from `app.config.js`, with the **development** settings. |
| `prebuild:prod` | Same, with the **production** settings. |

The `android/` and `ios/` folders are generated from `app.config.js` and are not in git. Don't edit files inside them by hand, because the next prebuild overwrites them. Change `app.config.js` instead.

Useful options:

- `-- --platform android` (or `ios`): only regenerate one platform.
- `-- --clean`: delete the folder and create it again from scratch. Use this when a build fails for no clear reason, or after you change native settings in `app.config.js`.

### Web

| Script | What it does |
| --- | --- |
| `web:dev` | Opens the app in a web browser with the **development** settings. |
| `web:prod` | Same, with the **production** settings. |
| `web` | Same, without setting `NODE_ENV` (development). |

The app is built for phones. Features that rely on native code, such as maps, login and speech recognition, may not work in the browser.

### Checks

| Script | What it does |
| --- | --- |
| `lint` | Runs `expo lint`, which checks the code with ESLint. The project has no ESLint config file yet, so the first run offers to install one (`eslint.config.js`). |
| `test` | Runs Jest, the test runner, in watch mode: it keeps running and re-runs the tests when files change. Press `q` to quit. There are no test files in the project yet. |

### Do not run

| Script | Why |
| --- | --- |
| `reset-project` | Left over from the Expo starter template. It points to `scripts/reset-project.js`, which doesn't exist, so it fails. In the template, it moves the whole `app/` folder aside to start an empty project, which you never want here. |

## Releasing to Google Play

Releases are built on your own machine, then uploaded to the [Google Play Console](https://play.google.com/console) by hand. You need the app's **upload keystore**: the `.jks` file that Play Console knows as this app's upload key, plus its passwords and key alias. Ask the team for it. Never commit it to git.

1. **Raise the version** in [app.config.js](app.config.js):
   - `android.versionCode`: a whole number Play uses to tell builds apart. It must be higher than the last build uploaded to Play.
   - `version` (for example `"1.1.3"`): the version name users see. Change it when the release has user-visible changes.

2. **Regenerate the Android folder with the production settings:**

   ```bash
   npm run prebuild:prod -- --platform android --clean
   ```

3. **Test the production release on a phone or emulator** (optional, but recommended):

   ```bash
   npm run release:android:prod
   ```

4. **Build the signed App Bundle (`.aab`).** Play Console needs an `.aab` file signed with the upload key. No npm script makes one, so run Gradle (Android's build tool) directly. Replace the keystore path and alias with the real ones. The `read -s` lines ask for the passwords without showing them or saving them in your shell history (this syntax is for zsh, the default shell on macOS).

   ```bash
   cd android
   read -s "STORE_PW?Keystore password: "; echo
   read -s "KEY_PW?Key password: "; echo
   NODE_ENV=production ./gradlew bundleRelease \
     -Pandroid.injected.signing.store.file=/path/to/upload-key.jks \
     -Pandroid.injected.signing.store.password="$STORE_PW" \
     -Pandroid.injected.signing.key.alias=your-key-alias \
     -Pandroid.injected.signing.key.password="$KEY_PW"
   ```

   - Keep `NODE_ENV=production` in this command. Gradle bundles the JavaScript during this step, and this variable makes it use the production settings.
   - The output file is `android/app/build/outputs/bundle/release/app-release.aab`.

5. **Check the signature** (still inside the `android/` folder):

   ```bash
   keytool -printcert -jarfile app/build/outputs/bundle/release/app-release.aab
   ```

   The SHA-1 fingerprint must match the **upload key certificate** in Play Console, under *Test and release → App integrity → App signing*. If the output says `CN=Android Debug`, the file is signed with the debug key and Play will reject it.

6. **Upload** `app-release.aab` in Play Console under *Production → Create new release*.

For an iOS release, raise `ios.buildNumber` and `version` in `app.config.js`. App Store upload steps are not covered here yet.


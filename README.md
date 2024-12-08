# HERA Mobile App

Welcome to the HERA Mobile App repository! HERA is dedicated to connecting refugee communities with essential healthcare services through an open-source mobile health platform. By making our technology freely available, we hope to empower organizations like NGOs and local aid groups to customize and deploy healthcare solutions that meet the specific needs of refugees in their regions.

## Overview

HERA’s mission is to support vulnerable populations, particularly refugees, by increasing access to vital healthcare services. As part of this mission, HERA focuses on preventive healthcare, with an initial goal to improve prenatal care and vaccination rates among refugees. This project began by addressing critical healthcare needs among Syrian refugees in Turkey, and HERA plans to extend support to refugees globally.

Our technology stack includes a React Native mobile app and [Django web backend](https://github.com/Hera-Digital-Health-Open-Source/herabackend) with robust APIs, and an admin panel, all of which can be adapted by organizations to provide tailored healthcare solutions.

## Features

- **Mobile Health Platform**: Connects refugees with available healthcare services.
- **Customizable Solution**: Open-source codebase that NGOs and organizations can adapt to specific regions and needs.
- **Focus on Maternal and Child Health**: Prioritizes prenatal care and childhood vaccinations.

## Getting Started

To set up the HERA Mobile App locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (version 16.20.2)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [CocoaPods](https://cocoapods.org) (for iOS development)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Hera-Digital-Health-Open-Source/heramobileapp.git
   cd heramobileapp
   ```

2. **Install dependencies** (Yarn is recommended):

   ```bash
   yarn install
   ```

   > **Note**: If you don’t have Yarn installed, enable it with Node.js’s `corepack`:
   >
   > ```bash
   > corepack enable
   > ```
   >
   > Alternatively, you can install Yarn using Homebrew:
   >
   > ```bash
   > brew install yarn
   > ```
   >
   > **Tip**: If you switch to Yarn from npm, delete the `package-lock.json` file to avoid conflicts. Yarn will generate a `yarn.lock` file.

3. **Set up environment variables**:  
   Copy the `.env` file to the project root (`heramobileapp`). If you don’t have the `.env` file, ask another team member for access.

### iOS Setup

#### Installing Pods

1. Navigate to the `ios` folder:

   ```bash
   cd ios
   ```

2. Run CocoaPods to install dependencies:

   ```bash
   pod install
   ```

   > **Tip**: If the installation fails or times out, run the command with the `--verbose` flag for more details:
   >
   > ```bash
   > pod install --verbose
   > ```

3. If CocoaPods isn’t installed, use Homebrew to install it:

   ```bash
   brew install cocoapods
   ```

   > **Note**: If you encounter a timeout during pod installation, rerun the `pod install --verbose` command. It caches previous downloads, so the process doesn’t start from scratch.

4. Fix potential `xcrun` SDK errors:
   - Open Xcode.
   - Go to **Settings > Locations**.
   - Ensure a valid **Command Line Tools** version is selected (re-select it if needed).

![Xcode Settings](https://github.com/user-attachments/assets/38b376ac-200a-4f1f-9f7c-606da5d3ff3b)

![Xcode Settings - Command Line Tools](https://github.com/user-attachments/assets/88bfd16a-ce92-4261-b4b3-0aa66fe1a69a)
[Reference](https://stackoverflow.com/a/68579858)

#### Building and Running on iOS Simulator

1. Go to the root directory:

   ```bash
   cd ..
   ```

2. Build and run the app:
   ```bash
   npm run ios
   ```

#### Troubleshooting iOS Builds

1. **Rosetta Installation** (for M1/M2 Macs):  
   If you encounter compatibility issues, install Rosetta:

   ```bash
   softwareupdate --install-rosetta
   ```

2. **Yoga Compile Error**:

   - Delete the `Pods` folder and `Podfile.lock`:
     ```bash
     rm -rf ios/Pods ios/Podfile.lock
     ```
   - Reinstall pods:
     ```bash
     cd ios
     pod install
     cd ..
     ```
   - If the error persists, edit the `Yoga.cpp` file:
     - Path: `node_modules/react-native/ReactCommon/yoga/yoga/Yoga.cpp`
     - Replace the single pipe (`|`) with double pipes (`||`) at lines 3008 and 2232.
     - [Reference](https://stackoverflow.com/a/75949937)

3. **Sentry Build Error**:  
   If you encounter an auth token issue:
   - Create a new auth token [here](https://hera-inc.sentry.io/settings/auth-tokens/).
   - Update the `sentry.properties` file in the `ios` folder with the new token.
   - [Reference](https://lightrun.com/answers/getsentry-sentry-react-native-build-fails-on-phasescriptexecution).

### Android Setup

1. Follow the Android Studio setup guide from the official [React Native documentation](https://reactnative.dev/docs/environment-setup).
2. From the project root directory, build and run the app:
   ```bash
   npm run android
   ```

### Notes

- Warnings during pod installation or builds (e.g., dependency mismatches or `ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES` settings) can usually be ignored unless they cause actual issues.
- Always ensure your development environment matches the project’s prerequisites to avoid unnecessary errors.

## Contributing

We welcome contributions from everyone! Please check out our Contributing Guide for instructions on how to get involved. We also encourage you to read our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a positive experience for all contributors.

## Community & Support

Stay connected with HERA’s community:

- [Facebook](https://www.facebook.com/HeraDigitalHealth)
- [Twitter](https://twitter.com/HERA_dHealth)
- [Instagram](https://www.instagram.com/heradigitalhealth/)
- [YouTube](https://www.youtube.com/channel/UCkQ1ovuIV8qg7lezNgc6w2w)

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.

## Acknowledgments

Thank you to all the contributors who make HERA possible! Special thanks to the HERA team and community for their dedication to open-source development.

- [Su Yuen](https://github.com/suyuen)
- [Husam](https://github.com/husam79)

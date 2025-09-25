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

To set up the HERA Mobile App locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (version 22.13.0)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Hera-Digital-Health-Open-Source/heramobileapp.git
   cd heramobileapp
   ```

2. Get the .env file from another developer and place it in the root folder.

3. Install dependencies

   ```bash
   npm install
   ```

4. Install Expo

   ```bash
   npx expo install
   ```

5. Prebuild

   ```bash
   npx expo prebuild
   ```

6. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

### Note

- You have a set of predefined scripts (in the scripts section of the package.json file) that you can use to accelerate producing the required build target:
   - android:dev -> Generates an Android build and run it based on the .env.development environment.
   - android:prod -> Generates an Android build and run it based on the .env.production environment.
   - release:android:dev -> Generates a release Android build and run it based on the .env.development environment.
   - release:android:prod -> Generates a release Android build and run it based on the .env.production environment.
   - ios:dev -> Generates an iOS build and run it based on the .env.development environment.
   - ios:prod -> Generates an iOS build and run it based on the .env.production environment.
   - release:ios:dev -> Generates a release iOS build and run it based on the .env.development environment.
   - release:ios:prod -> Generates a release iOS build and run it based on the .env.production environment.

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

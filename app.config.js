export default {
  expo: {
    name: "Legacy Barbershop",
    slug: "barbershop-demo",
    version: "1.0.12",
    runtimeVersion: "1.0.12",
    projectId: "c207def8-09b6-4cc0-a2ad-0edde7378ab8",
    orientation: "portrait",
    icon: "./assets/icon-1024.png",
    userInterfaceStyle: "light",
    updates: {
      url: "https://u.expo.dev/c207def8-09b6-4cc0-a2ad-0edde7378ab8",
    },
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.legacy.barbershop",
      infoPlist: {
        NSCalendarUsageDescription:
          "This app needs access to your calendar to add appointments.",
      },
    },
    extra: {
      eas: {
        projectId: "c207def8-09b6-4cc0-a2ad-0edde7378ab8",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};

// export default {
//   expo: {
//     name: "Legacy Barbershop",
//     slug: "barbershop-demo",
//     version: "1.0.9",
//     projectId: "c207def8-09b6-4cc0-a2ad-0edde7378ab8",
//     orientation: "portrait",
//     icon: "./assets/icon-1024.png",
//     userInterfaceStyle: "light",
//     splash: {
//       image: "./assets/splash.png",
//       resizeMode: "contain",
//       backgroundColor: "#ffffff",
//     },
//     assetBundlePatterns: ["**/*"],
//     ios: {
//       bundleIdentifier: "com.legacy.barbershop",
//       infoPlist: {
//         NSCalendarUsageDescription:
//           "This app needs access to your calendar to add appointments.",
//       },
//     },
//     icon: "./assets/icon-1024.png",
//     extra: {
//       eas: {
//         projectId: "c207def8-09b6-4cc0-a2ad-0edde7378ab8",
//       },
//     },
//     updates: {
//       url: "https://u.expo.dev/c207def8-09b6-4cc0-a2ad-0edde7378ab8",
//     },
//     runtimeVersion: "1.0.9",
//   },
// };

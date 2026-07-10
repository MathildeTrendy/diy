# ReTrove

ReTrove is a React Native / Expo marketplace app for buying and selling DIY and upcycled items. It uses Firebase for authentication, data, and hosting.

Live site: https://retrove-abd5d.web.app

## Tech Stack

- React Native
- Expo SDK 52
- Firebase Auth
- Firebase Firestore
- Firebase Hosting
- Jest

## Getting Started

```bash
npm install
npm start
```

When Expo starts, choose a platform:

- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Press `w` for web
- Or scan the QR code with Expo Go

Run web directly:

```bash
npm run web
```

## Login

The app uses Firebase Authentication with email and password.

To create a user, open the app, go to `Sign Up`, and enter an email, username, and password.

Generic demo users are not stored in the code. If shared test users have been created in Firebase, they can be used on the login screen.

Suggested demo accounts:

| Role | Email | Password |
| --- | --- | --- |
| Demo user | `demo@retrove.dk` | Ask the project owner |
| Test user | `test@retrove.dk` | Ask the project owner |

If these users do not exist yet, create them in Firebase Console:

```text
Authentication -> Users -> Add user
```

## Scripts

```bash
npm start       # Start Expo
npm run ios     # Open iOS Simulator
npm run android # Open Android Emulator
npm run web     # Open web app
npm test        # Run tests
```

## Deploy

Build the web app:

```bash
npx expo export .
```

Deploy to Firebase Hosting:

```bash
firebase deploy --only hosting
```

Production URL:

```text
https://retrove-abd5d.web.app
```

## Notes

- Firebase project: `retrove-abd5d`
- Firebase config: `firebase.js`
- Hosting config: `firebase.json`
- If Jest fails because of Watchman, run:

```bash
npm test -- --runInBand --no-watchman
```

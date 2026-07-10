# ReTrove

ReTrove er en React Native / Expo app til køb og salg af DIY- og upcyclede produkter. Appen bruger Firebase til login og hosting.

Live site: https://retrove-abd5d.web.app

## Indhold

- Markedsplads med produkter og produktdetaljer
- Login og oprettelse af bruger via Firebase Auth
- Profilside for den aktive bruger
- Kurv og checkout-flow
- Expo-understøttelse til iOS, Android og web

## Teknologi

- React Native
- Expo SDK 52
- Firebase Auth
- Firebase Firestore
- Firebase Hosting
- Jest til tests

## Kom i gang

Sørg for at stå i projektmappen:

```bash
cd diy-main
```

Installer dependencies:

```bash
npm install
```

Start Expo:

```bash
npm start
```

Når Expo kører, kan appen åbnes på flere måder:

- Scan QR-koden med Expo Go på mobilen
- Tryk `i` i terminalen for iOS simulator
- Tryk `a` i terminalen for Android emulator
- Tryk `w` i terminalen for web

Alternativt kan web startes direkte:

```bash
npm run web
```

## Login

Appen bruger Firebase Authentication med email og password.

### Opret egen bruger

1. Åbn appen.
2. Gå til login-skærmen.
3. Tryk på `Don't have an account? Sign Up`.
4. Indtast email, username og password.
5. Log ind med den bruger, du lige har oprettet.

### Generiske login-profiler

Der ligger ikke faste test-loginoplysninger i koden eller README'en af sikkerhedshensyn. Hvis projektets Firebase-ejer har oprettet generiske testbrugere, kan de bruges direkte på login-skærmen.

Anbefalet format til delte testbrugere:

| Rolle | Email | Password | Bruges til |
| --- | --- | --- | --- |
| Demo user | `demo@retrove.dk` | Aftales i teamet | Almindelig gennemgang af appen |
| Test user | `test@retrove.dk` | Aftales i teamet | Præsentation, test og undervisning |

Hvis de ikke allerede findes i Firebase, skal de oprettes i Firebase Console under:

```text
Authentication -> Users -> Add user
```

Brug derefter samme email og password i appens login-formular.

## Scripts

```bash
npm start
```

Starter Expo development server.

```bash
npm run ios
```

Starter appen i iOS simulator via Expo.

```bash
npm run android
```

Starter appen i Android emulator via Expo.

```bash
npm run web
```

Starter appen i browseren.

```bash
npm test
```

Kører Jest-tests.

## Deploy

Build web-versionen:

```bash
npx expo export .
```

Deploy til Firebase Hosting:

```bash
firebase deploy --only hosting
```

Efter deploy er appen tilgængelig her:

```text
https://retrove-abd5d.web.app
```

## Firebase

Projektet bruger Firebase-projektet:

```text
retrove-abd5d
```

Firebase-konfigurationen ligger i:

```text
firebase.js
```

Hosting-konfigurationen ligger i:

```text
firebase.json
```

## Fejlfinding

Hvis Expo viser en fejl om et manglende billede, så tjek at `require(...)` peger på en relativ sti inde i projektet, fx:

```js
require("../assets/onboarding/community.jpeg")
```

Hvis login fejler, så tjek:

- At brugeren findes i Firebase Authentication
- At email og password er skrevet korrekt
- At Firebase-projektet `retrove-abd5d` er aktivt
- At appen har internetforbindelse

Hvis `npm test` fejler på Watchman, kan tests køres uden Watchman:

```bash
npm test -- --runInBand --no-watchman
```

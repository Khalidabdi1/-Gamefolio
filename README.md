# Gamefolio

An Expo game journal inspired by the supplied **Bingers: TV & Movie Tracker** references. It adapts the poster library, dark surfaces, generous spacing, rounded list rows and coral-accented glass navigation to games.

## Stack

- Expo SDK 55, React Native 0.83, TypeScript, Expo Router
- **Expo UI / SwiftUI** for native iOS glass toolbar buttons, view/status/genre menus, status selection and progress slider
- **Expo Router NativeTabs** for actual iOS 26 Liquid Glass navigation and the separate search tab
- **Uniwind + Tailwind 4** for React Native layout, typography and color tokens
- AsyncStorage for device-local collection, progress, ratings, notes, favorites, profile and filters
- Expo Image, SF Symbols on iOS, Lucide fallback on other platforms

## Run

```sh
npm ci
npx expo start
```

Try Expo Go first using a compatible SDK 55 client. Expo UI native availability depends on the client. Use a development build or the native-sim source build below if the installed client lacks its native module. True Liquid Glass requires iOS 26+ with an Xcode 26 build; the web version uses a blur approximation.

```sh
npm run web
npm run check
npm run export:web
npm run export:ios
```

## Requested iOS simulator

The official native-sim 0.1.0 workflow and authenticated gate from [React Native Feel](https://reactnativefeel.com/sim) are committed under `.github/`. The source workflow uses an arm64 macOS 26 runner and preserves the access-key gate. No secrets are committed.

From an authenticated checkout on a machine with the GitHub CLI:

```sh
gh auth login
git push -u origin main
npm run sim
```

`npm run sim` runs `native-sim up --public --agent --minutes 45`. It requires push and Actions permissions for this repository. The CLI prints the ephemeral authenticated stream URL. Do not publish its access key. Stop the session with `npx native-sim@0.1.0 down` when finished. See `docs/visual-review.md` for the comparison checklist.

## Implemented flows

- Games: grouped cover grid, cards and compact lists; status and genre filters
- Backlog: poster rows and completion toggles
- Profile: collection, favorite games, playtime, completed count and editable identity
- Search: title, genre and platform search within the included 12-game catalog
- Game detail: add/remove, status, progress, playtime, rating, favorite, notes and share sheet
- Release calendar: original release dates of games in your collection
- Local persistence with validation and error reporting; failed reads do not silently overwrite saved data

The preloaded library is editable sample data. This is a local-first app: no live catalog API, accounts, follow system, push notifications or platform sync is connected. Follow counts are zero. Game cover art loads from Steam's public CDN and is owned by the respective rights holders. The catalog descriptions are original summaries; play-length numbers are approximate seed values, not imported user history. Distribution should replace the seed catalog with a licensed metadata source.

## Verification status

TypeScript, storage tests and Expo web/iOS JavaScript exports were run in the development environment. An iOS JavaScript export is **not** a native Xcode build or a screenshot test. GitHub refused writes with `Resource not accessible by integration` (403), and no authenticated GitHub CLI was available; the native-sim session could not launch. Local browser visual review was also blocked by the environment. Native runtime behavior and pixel matching remain unverified. Do not claim visual parity until the checklist is completed.

The archive includes `gamefolio.bundle` with the complete local commit history. To restore that history instead of copying source files:

```sh
git clone gamefolio.bundle Gamefolio
cd Gamefolio
git remote set-url origin https://github.com/Khalidabdi1/-Gamefolio.git
npm ci
git push -u origin main
```

The source files in the archive and the bundle represent the same final commit. Never force-push if the remote has advanced; fetch and reconcile first.

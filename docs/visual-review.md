# Visual review — pending a live iOS session

## Reference

The supplied images show Bingers: TV & Movie Tracker (Onbox Labs), App Store ID 6792080029. The application is adapted for games, not video playback. Reference links: https://bingers.app/ and https://apps.apple.com/sa/app/bingers-tv-movie-tracker/id6792080029.

The reference images are 709 × 1536. Compare at an iPhone content width of roughly 393 points, with default text size and dark appearance. Do not compare desktop web rendering as if it were native iOS.

## Implemented design measurements

| Element | Gamefolio target |
| --- | --- |
| Canvas | #0c0a0b |
| Cards | #1c191a |
| Primary text | #f5f4f0 |
| Secondary text | #928c8e |
| Selection | #ff624f |
| Horizontal padding | 20pt |
| Grid columns / gap | 3 / 12pt |
| Cover aspect ratio | 2:3 |
| Cover corner radius | 17pt, continuous |
| Section title | 24pt semibold |
| Card title / progress | 16pt / 13pt |
| Section spacing | 40pt |
| List row / poster width | 104pt / 69pt |
| Profile banner / avatar | 242pt / 96pt |
| Toolbar controls | native SwiftUI glass, large control size |
| Bottom navigation | system-native iOS 26 tabs, separate search role |

## Required native checks

1. Launch a clean install through `npm run sim` and capture Games, Backlog, Profile, Search and the expanded filter menu.
2. Compare the cover bounds, section positions, font weights, toolbar margins and tab shape against the corresponding supplied reference image. The content should feature games.
3. Confirm that native menus use the control-group view row, checked statuses and a Genre submenu. Switch all views and check filters.
4. Verify Games scrolls beneath the floating native tab bar and no duplicate safe-area spacing appears.
5. Add a game through Search. Change status, progress and hours; write notes and set a rating/favorite. Force-close and reopen to verify persistence.
6. Mark a backlog game complete, enable Completed in the menu, and verify it is visible with completed styling.
7. Verify the native slider, share sheet, removal confirmation and profile form. Confirm Back returns to the originating tab.
8. Test a small iPhone, larger text and offline artwork failures. Keep 44pt touch targets and readable text.
9. Compare the same views on iOS 26 or later. Earlier iOS versions cannot reproduce the same Liquid Glass material.
10. Stop the session after testing; preserve screenshots and record the exact commit tested.

## Observed verification results

- TypeScript: passed.
- Storage validation tests: 5 passed.
- Expo web static export: passed.
- Expo iOS Hermes bundle export: passed.
- Native Xcode build / live iOS simulator: blocked, not executed.
- Screenshots / visual matching: blocked, not executed.
- GitHub push: rejected with HTTP 403 Resource not accessible by integration.

No native screenshots are fabricated or included as evidence.

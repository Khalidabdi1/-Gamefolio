# Game details and statistics

## Reference adaptation

The supplied Bingers detail and statistics screens are adapted to video games:

- Cinematic hero artwork fades into the near-black canvas, with a game wordmark and persistent native toolbar.
- The outlined completion control opens a progress editor. Favorites, hours, ratings and notes continue using the existing local library.
- The store row opens the game's Steam page. Recommendations are from the starter catalog, with matching genres first.
- Expandable personal goals replace television seasons and episodes. They are explicitly not official achievements.
- Profile statistics cards open Stats. The SwiftUI profile menu offers sharing, statistics, profile editing and help.
- Stats uses actual saved library values, a selectable weekly hours chart, favorite games and genre totals. The genre menu filters every section.

## Data integrity

Newly logged hours are recorded against the local calendar date. Existing lifetime hours are not assigned fictional dates. An explanation beneath the chart makes the difference explicit.

Goals and daily activity are optional fields, so older library data continues to load. Removing a game also removes it from aggregated statistics. Same-day hour corrections reduce that day's logged hours without going negative.

No authentication, community review counts, official achievements or social backend is implied.

## Brand asset

The original app icon is `assets/gamefolio-logo.png`, generated with the built-in image tool and configured in `app.json`. The prior icon is retained.

Prompt: “A polished original iOS app icon for Gamefolio, a personal video game collection and play journal. One bold lowercase g monogram whose negative space subtly evokes a controller directional cross or a bookmarked game case. Coral to soft peach luminous gradient mark, near-black charcoal background, restrained premium depth, crisp silhouette legible at tiny sizes. Centered single emblem, no words, no mockup, no outer device. Full-bleed opaque square artwork.”

## Automated coverage

- Persistence compatibility, goal restoration and activity validation.
- New-hour logging and same-day corrections.
- Genre filtering and lifetime totals.
- Weekly aggregation without fabricated history.
- Empty-library statistics.
- TypeScript, formatting and Expo web export.
- The native visual workflow captures game details, statistics and the profile menu, then shuts down the simulator even if a preceding step fails.

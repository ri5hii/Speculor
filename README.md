# Speculor

GitHub profile README widget platform. Generate SVG stat cards, language breakdowns, streaks, activity graphs, and more. Paste a URL into your README and it updates automatically.

## Widgets

| Widget | Endpoint | Description |
|---|---|---|
| Stats Card | `/api/card` | Commits, PRs, issues, stars, contributions, rank |
| Top Languages | `/api/top-langs` | Language breakdown with 9 layout options |
| Streak | `/api/streak` | Current streak, longest streak, total contributions |
| Activity Graph | `/api/activity` | 365-day contribution heatmap |
| Trophy | `/api/trophy` | Achievement badges based on milestones |
| Pinned Repo | `/api/pin` | Repository showcase card |
| Mini Badge | `/api/mini` | Compact single-metric badge |
| Sparkline | `/api/sparkline` | Activity trend line chart |

## Quick Start

```markdown
![Stats](https://your-domain.vercel.app/api/card?username=YOUR_USERNAME)
```

Change `username` to your GitHub username. Add `&theme=tokyonight` to change the look.

## Themes

18 built-in themes: `default`, `dark`, `radical`, `tokyonight`, `dracula`, `nord`, `gruvbox`, `catppuccin`, `onedark`, `cobalt`, `synthwave`, `highcontrast`, `ocean`, `forest`, `sunset`, `midnight`, `rosepine`, `transparent`

Create custom themes with URL params:

```
&bgColor=1a1b27&textColor=c0caf5&titleColor=7aa2f7&iconColor=7dcfff&borderColor=3b4261
```

## Parameters

### Common (all widgets)

| Param | Type | Default | Description |
|---|---|---|---|
| `theme` | string | `default` | Theme name |
| `bgColor` | hex | — | Background color |
| `textColor` | hex | — | Body text color |
| `titleColor` | hex | — | Title color |
| `iconColor` | hex | — | Icon color |
| `borderColor` | hex | — | Border color |
| `hideBorder` | boolean | `false` | Remove border |
| `borderRadius` | number | `4.5` | Corner radius |
| `hideTitle` | boolean | `false` | Remove title |
| `locale` | string | `en` | Language |

### Stats Card (`/api/card`)

| Param | Type | Default | Description |
|---|---|---|---|
| `username` | string | required | GitHub username |
| `hide` | string | — | Comma-separated stats to hide |
| `show` | string | — | Comma-separated extra stats to show |
| `showIcons` | boolean | `false` | Show icons |
| `hideRank` | boolean | `false` | Hide rank circle |
| `rankIcon` | string | `default` | `default`, `github`, or `percentile` |
| `cardWidth` | number | `500` | Card width in px |
| `customTitle` | string | — | Custom title text |
| `ringColor` | hex | — | Rank circle color |
| `locale` | string | `en` | Language |

### Top Languages (`/api/top-langs`)

| Param | Type | Default | Description |
|---|---|---|---|
| `username` | string | required | GitHub username |
| `layout` | string | `bar` | `bar`, `compact`, `donut`, `donut-vertical`, `pie`, `grid`, `horizontal_list`, `vertical_list`, `stacked` |
| `hide` | string | — | Languages to hide |
| `langsCount` | number | `6` | Number of languages (1-20) |
| `excludeRepo` | string | — | Repos to exclude |
| `hideProgress` | boolean | `false` | Hide percentage bars |
| `statsFormat` | string | `percentages` | `percentages` or `bytes` |

### Streak (`/api/streak`)

| Param | Type | Default | Description |
|---|---|---|---|
| `user` | string | required | GitHub username |
| `dateFormat` | string | `M j[, Y]` | Date format string |
| `excludeDays` | string | — | Days to exclude (e.g. `Sat,Sun`) |
| `startingYear` | number | — | Start year for total count |
| `hideTotalContributions` | boolean | `false` | Hide total |
| `hideCurrentStreak` | boolean | `false` | Hide current streak |
| `hideLongestStreak` | boolean | `false` | Hide longest streak |

### Activity Graph (`/api/activity`)

| Param | Type | Default | Description |
|---|---|---|---|
| `username` | string | required | GitHub username |
| `lineHeight` | number | `25` | Row height in px |
| `area` | boolean | `false` | Fill area under line |

### Trophy (`/api/trophy`)

| Param | Type | Default | Description |
|---|---|---|---|
| `username` | string | required | GitHub username |
| `column` | number | `6` | Trophies per row |
| `noFrame` | boolean | `false` | Remove frames |
| `noBg` | boolean | `false` | Transparent background |
| `margin` | number | `1` | Trophy margin |

### Pinned Repo (`/api/pin`)

| Param | Type | Default | Description |
|---|---|---|---|
| `username` | string | required | GitHub username |
| `repo` | string | required | Repository name |
| `showOwner` | boolean | `false` | Show repo owner |
| `descriptionLinesCount` | number | auto | Description lines (1-3) |

### Mini Badge (`/api/mini`)

| Param | Type | Default | Description |
|---|---|---|---|
| `username` | string | required | GitHub username |
| `metric` | string | required | `stars`, `commits`, `prs`, `issues`, `followers`, `repos`, `contributions`, `streak` |
| `label` | string | auto | Custom label text |
| `color` | hex | — | Value side color |
| `style` | string | `flat` | `flat`, `flat-square`, `for-the-badge`, `plastic`, `minimal` |

### Sparkline (`/api/sparkline`)

| Param | Type | Default | Description |
|---|---|---|---|
| `username` | string | required | GitHub username |
| `days` | number | `30` | Days to show (7-90) |
| `width` | number | `420` | Chart width |
| `height` | number | `120` | Chart height |
| `lineColor` | hex | — | Line color |
| `fillColor` | hex | — | Area fill color |

## Examples

```markdown
<!-- Stats card -->
![Stats](https://your-domain.vercel.app/api/card?username=octocat&theme=tokyonight&showIcons=true)

<!-- Languages -->
![Languages](https://your-domain.vercel.app/api/top-langs?username=octocat&layout=compact&theme=dracula)

<!-- Streak -->
![Streak](https://your-domain.vercel.app/api/streak?user=octocat&theme=nord)

<!-- Activity -->
![Activity](https://your-domain.vercel.app/api/activity?username=octocat&theme=forest)

<!-- Mini badge](https://your-domain.vercel.app/api/mini?username=octocat&metric=stars&style=for-the-badge)

<!-- Sparkline](https://your-domain.vercel.app/api/sparkline?username=octocat&days=30&theme=catppuccin)
```

## Deploy

### Vercel (recommended)

1. Fork this repo
2. Import to [vercel.com/new](https://vercel.com/new)
3. Set `GITHUB_TOKEN` environment variable (optional, increases rate limits)
4. Deploy

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | No | GitHub PAT for higher rate limits |
| `CACHE_SECONDS` | No | Override default cache TTL |

## Self-Hosted

```bash
git clone https://github.com/your-username/speculor.git
cd speculor
npm install
vercel dev
```

# Contributing

Thanks for helping out. This repo runs the [IEM-UEM Group status page](https://status.uem.edu.in) on [Upptime](https://upptime.js.org). GitHub Actions check each site every five minutes, issues act as incident reports, and GitHub Pages hosts the status page.

Everyone taking part is expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Reporting problems

Pick the right form under [New issue](https://github.com/UEM-Group-Websites/uptime-checker/issues/new/choose):

- **Site problem**: a site is down, slow or broken, but no incident has opened.
- **Status page bug**: wrong data, a broken layout or a failing workflow.
- **Monitor request**: add, change or remove a monitored site.
- **Scheduled maintenance**: plan a window so expected downtime doesn't open incidents.

Check [open incidents](https://github.com/UEM-Group-Websites/uptime-checker/issues?q=is%3Aissue+is%3Aopen+label%3Astatus) first. Upptime opens one on its own when a site goes down and closes it when the site recovers, so please don't open or close these by hand.

## What you can change

| Path | What it holds | Edit by hand? |
| --- | --- | --- |
| `.upptimerc.yml` | Monitored sites and status page settings | Yes |
| `assets/` | Theme CSS and JS, logo, favicon, `robots.txt` | Yes |
| `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md` | Issue and PR templates | Yes |
| `README.md` (outside the status table) | Project overview | Yes |
| `.github/workflows/` | Upptime workflows | No, Upptime rewrites them |
| `history/`, `api/`, `graphs/` | Uptime data, badges and graphs | No, the workflows write them |
| README status table | Live summary | No, the workflows rewrite it |

Upptime restores its workflow files from its template every day, so edits there get lost. Change `.upptimerc.yml` instead. See the [configuration docs](https://upptime.js.org/docs/configuration).

## Adding or changing a site

1. Add an entry under `sites` in `.upptimerc.yml`:

   ```yaml
   - name: UEM Example Website
     url: https://example.uem.edu.in/site-health-page/
   ```

2. Point `url` at a light page that returns a success status, like the existing `/site-health-page/` URLs.
3. Keep names unique. Upptime builds each site's slug from its name, so renaming a site starts its history from scratch.

Once merged, Setup CI regenerates the workflows and the next check picks up the new site.

## Theme changes

The status page uses `assets/uem-theme.css` and `assets/uem-theme.js`, which Upptime copies into every build. Check your change in light and dark mode and at phone width before opening a PR.

## Pull requests

1. Branch from `master`.
2. Keep each PR to one change.
3. Fill in the PR template, including its checklist.
4. Codacy and CodeQL run on every PR. Fix what they flag, or explain in the PR why it doesn't apply.

Upptime's bot commits data to `master` many times a day, so pull before you push.

## License

Code is under the [MIT License](./LICENSE). Data in `history/` is under the [Open Database License](https://opendatacommons.org/licenses/odbl/1-0/). By contributing, you agree your work is released under these terms.

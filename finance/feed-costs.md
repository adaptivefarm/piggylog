# Feed purchases

Append-only. One row per purchase. Never edit a past row — append a correction and
strike the wrong part with `~~old~~`.

`scripts/build-dashboard.js` adds up the **Total (PHP)** column for the dashboard. If
you rename that column, the script stops and tells you.

| Date | Feed | Sacks | Kg/sack | Unit price (PHP) | Total (PHP) | Supplier |
|------|------|------:|--------:|-----------------:|------------:|----------|

<!-- No purchases recorded yet. Add the first row above this line.
     Shape of a row, for reference — this is NOT real:
     | 2026-01-15 | Hog Grower | 2 | 50 | 1800 | 3600 | Local feed store | -->

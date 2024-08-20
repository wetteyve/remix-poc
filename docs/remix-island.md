# remix-island

🚨 This package is a workaround that allows the usage of Remix with `react@(18.0 - 18.2)`, which comes with several hydration problems.

Please refer to the following links for more information: [Remix Issue #5463](https://github.com/remix-run/remix/issues/5463), [Remix Issue #5144](https://github.com/remix-run/remix/issues/5144), [Remix Issue #4822](https://github.com/remix-run/remix/issues/4822), [Remix Discussion #5244](https://github.com/remix-run/remix/discussions/5244), [React Issue #24430](https://github.com/facebook/react/issues/24430).

During the migration of old routes into Remix routes, we need to support styled-components. Therefore, we need to pass the styles into the header using this workaround. This package will be removed once either Remix resolves the mentioned issues or the migration from styled-components to Tailwind is completed.

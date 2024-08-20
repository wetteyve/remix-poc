# Security

PlayNext has several security measures in place to protect your users and
yourself. This (incomplete) document, explains some of the security measures
that are in place and how to use them.

## Content Security Policy

PlayNext uses a strict
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).
This means that only resources from trusted sources are allowed to be loaded.

## Secrets

The currently recommended policy for managing secrets is to place them in a
`.env` file in the root of the application (which is `.gitignore`d). There is a
`.env.example` which can be used as a template for this file (and if you do not
need to actually connect to real services, this can be used as
`cp .env.example .env`).

There are significant limitations to this approach and will probably be improved
in the future.

## [Cross-Site Scripting (XSS)](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)

React has built-in support for XSS protection. It does this by escaping all
values by default. This means that if you want to render HTML, you need to use
the `dangerouslySetInnerHTML` prop. This is a good thing, but it does mean that
you need to be careful when rendering HTML. Never pass anything that is
user-generated to this prop.

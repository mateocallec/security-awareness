# Security Policy

## Supported versions

Only the latest release on the `main` branch receives security fixes.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Send a report by email to **[mateo@callec.net](mailto:mateo@callec.net)** with:

- A clear description of the vulnerability
- Steps to reproduce or a proof-of-concept
- The potential impact (data exposure, auth bypass, etc.)
- Your name / handle if you would like to be credited

You will receive an acknowledgement within **72 hours**. If the report is confirmed, a fix will be issued as soon as reasonably possible and you will be notified before public disclosure.

## Scope

| In scope | Out of scope |
|---|---|
| Authentication and authorisation flaws | Social engineering against maintainers |
| CSRF / injection / XSS vulnerabilities | Denial-of-service attacks |
| Sensitive data exposure (emails, tokens) | Issues in third-party dependencies with no impact on this project |
| Broken access control on dashboard routes | |

## Disclosure policy

This project follows **coordinated disclosure**. Please allow reasonable time for a fix before publishing details of any vulnerability.

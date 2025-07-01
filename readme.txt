=== Dovetail Podcasts ===
Contributors: rpeterman-gp
Tags: Dovetail, podcasting
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 0.1.2
License: GPL-3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Dovetail Podcasts plugin connects your Wordpress site to Dovetail Podcasts.

**Key Features**

- **Turn your Posts into Dovetail podcast episodes.** You can even use your own custom post type.
- **Highly customizable player.** Easily add players to your frontend templates and make it fit your site perfectly.

**Get Started**

1. [Sign up for a Dovetail account](https://id.prx.org).
2. [Request creation of a Client Application](mailto:podcast-support@prx.org?subject=Request%20For%20%Wordpress%20Plugin%20Client%20Application) for your Wordpress site. Please include the following information in your request:

- Email of the user the application should be created for.
- URL of the Wordpress site using the plugin.
- If you require a staging application for your site's staging or development environments, include your staging site URL in your request, and [Sign up for a Dovetail Staging account](https://id.staging.prx.org).

3. [Install Dovetail Podcasts](https://github.com/PRX/Dovetail-Wordpress-Plugin/blob/main/docs/installation.md): `wp plugin install dovetail-podcasts --activate`
4. [Connect Wordpress to Dovetail](https://github.com/PRX/Dovetail-Wordpress-Plugin/blob/main/docs/settings-client-application.md) using your Client Application credentials.
5. [Configure Dovetail Podcasts settings.](https://github.com/PRX/Dovetail-Wordpress-Plugin/blob/main/docs/settings-general.md)

== Changelog ==

= 0.1.2 =

**Bug Fixes**

* fix: Update DovetailApi to widen date range used for publish date + title queries (https://github.com/jasonbahl/automation-tests/pull/34)

= 0.1.1 =

**Bug Fixes**

* fix(player): episodes query with post_date_gmt (https://github.com/jasonbahl/automation-tests/pull/30)

= 0.1.0 =

**New Features**

* feat: Existing episode detection using publish date and title (https://github.com/jasonbahl/automation-tests/pull/18)
* feat: Player customization settings (https://github.com/jasonbahl/automation-tests/pull/17)
* feat(player): Add volume controls component and block (https://github.com/jasonbahl/automation-tests/pull/5)

**Other Changes**

* chore(readmetxt): add newline to changelog section (https://github.com/jasonbahl/automation-tests/pull/26)
* chore(readmetxt): add changelog section (https://github.com/jasonbahl/automation-tests/pull/24)
* chore: add readme.txt (https://github.com/jasonbahl/automation-tests/pull/22)
* chore: downgrade chalk to v4 (https://github.com/jasonbahl/automation-tests/pull/20)
* docs: Player usage documentation (https://github.com/jasonbahl/automation-tests/pull/19)
* docs: Initial repo docs (https://github.com/jasonbahl/automation-tests/pull/6)
* chore: add dev deps used by workflow scripts (https://github.com/jasonbahl/automation-tests/pull/3)


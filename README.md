![PRX Dovetail](./docs/images/logo.svg)

# Dovetail Podcasts

![GitHub package.json version](https://img.shields.io/github/package-json/v/PRX/Dovetail-Wordpress-Plugin)
[![GitHub Release](https://img.shields.io/github/v/release/PRX/Dovetail-Wordpress-Plugin)](https://github.com/PRX/Dovetail-Wordpress-Plugin/releases)
[![WordPress Coding Standards](https://github.com/PRX/Dovetail-Wordpress-Plugin/workflows/WordPress%20Coding%20Standards/badge.svg)](https://github.com/PRX/Dovetail-Wordpress-Plugin/actions?query=workflow%3A%22WordPress+Coding+Standards%22)
[![CodeQL](https://github.com/PRX/Dovetail-Wordpress-Plugin/workflows/CodeQL/badge.svg)](https://github.com/PRX/Dovetail-Wordpress-Plugin/actions?query=workflow%3A%22CodeQL%22)

Dovetail Podcasts plugin connects your Wordpress site to Dovetail Podcasts.

## 🌟 Key Features

- **Turn your Posts into Dovetail podcast episodes.** You can even use your own custom post type.
- **Highly customizable player.** Easily add players to your frontend templates and make it fit your site perfectly.

## 🚀 Get Started

1. [Sign up for a Dovetail account](https://id.prx.org).
2. [Request creation of a Client Application](mailto:help@prx.org?subject=Request%20For%20%Wordpress%20Plugin%20Client%20Application) for your Wordpress site. Please include the following information in your request:

- Email for the user the application should created for.
- URL of the Wordpress site using the plugin.
- If you require a staging application for your sites staging and development environments, include user email and staging site URL in your request.

3. [Install Dovetail Podcasts](./docs/installation.md): `wp plugin install dovetail-podcasts --activate`
4. [Connect Wordpress to Dovetail](./docs/settings-client-application.md) using your Client Application credentials.
5. [Configure Dovetail Podcasts settings.](./docs/settings-general.md)

## 📖 **Documentation**

- [Install Dovetail Podcasts](./docs/installation.md)
- [Connect Dovetail Podcasts](./docs/settings-client-application.md)
- [Configure Dovetail Podcasts](./docs/settings-general.md)
- [Add Dovetail Podcasts Player](./docs/player.md)

> ## 🫶 Thank You For Choosing Dovetail
>
> We look forward to aiding you on your podcasting adventure! If you need any assistance setting up Dovetail Podcasts on your Wordpress site, feel free to contact [our amazing support team](mailto:help@prx.org?subject=Help%20With%20Dovetai%20Podcasts%20Wordpress%20Plugin). Submit any bugs you find to our [Github Issues](https://github.com/PRX/Dovetail-Wordpress-Plugin/issues).

## Development

### VS Code Extensions

This plugin adheres to Wordpress coding standards. To help with keeping to those standards while working, install this project's recommended extensions:

- Open Extensions panel
- Enter `@recommended` in search bar, or choose _Recommended_ from filters menu.
- Install the **Workspace Recommended** extensions.

### Development Server

Don't worry about spinning up a Wordpress site, we got one for you. Start by making a copy of the `.env.dist` file:

```bash
cp .env.dist .env
```

Update the admin user and password variables in the `.env` file to something you will remember, then run:

```bash
composer install
composer build-and-run -- -a
```

> If the build fails, make sure you have the latest version of [Docker](https://docs.docker.com/get-started/get-docker/) installed.

Once complete, you can access the site at http://localhost:8091. This will be a fresh Wordpress site with your user setup, and this plugin activated, but you may need to finish some setup prompts. When setup is complete and you have logged in, got to [Dovetail Podcasts Settings](http://localhost:8091/wp-admin/admin.php?page=dovetail-podcasts-settings) to enter your Dovetail Staging Client Application credentials.

> Don't have Dovetail Staging Client Application credentials? Drop a request in the PRX Slack tech channels.

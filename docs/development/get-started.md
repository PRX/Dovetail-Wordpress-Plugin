# Development - Getting Started

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

> Don't have Dovetail Staging Client Application credentials? Drop a request in the PRX Slack `#tech-dovetail-wordpress-plugin` channel.

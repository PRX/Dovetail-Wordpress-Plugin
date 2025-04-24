![PRX Dovetail](./docs/images/logo.svg)

# Dovetail Podcasts

![GitHub package.json version](https://img.shields.io/github/package-json/v/PRX/Dovetail-Wordpress-Plugin)
[![GitHub Release](https://img.shields.io/github/v/release/PRX/Dovetail-Wordpress-Plugin)](https://github.com/PRX/Dovetail-Wordpress-Plugin/releases)
[![WordPress Coding Standards](https://github.com/PRX/Dovetail-Wordpress-Plugin/workflows/WordPress%20Coding%20Standards/badge.svg)](https://github.com/PRX/Dovetail-Wordpress-Plugin/actions?query=workflow%3A%22WordPress+Coding+Standards%22)
[![CodeQL](https://github.com/PRX/Dovetail-Wordpress-Plugin/workflows/CodeQL/badge.svg)](https://github.com/PRX/Dovetail-Wordpress-Plugin/actions?query=workflow%3A%22CodeQL%22)

> 🚧 **WORK IN PROGRESS...**

Dovetail Podcasts ...

Publish your posts as podcast episodes to the Dovetail podcasting platform. Listen to your podcast episodes with the provided customizable player that can be added to any of your front-end templates.

## 🚀 Get Started

1. [Sign up for a Dovetail account](https://id.prx.org).
2. Request creation of a Client Application for your site.
3. [Install Dovetail Podcasts](./docs/installation.md): `wp plugin install dovetail-podcasts --activate`
4. [Connect Wordpress to Dovetail](./docs/setup-auth.md) using your Client Application credentials.

[TODO: Move sections below to `/docs`.]

## Installation

(COMING SOON) Install via Wordpress admin by going to **Plugins > Add New Plugin** and searching for 'Dovetail Podcasts', or run:

```bash
wp plugin install dovetail-podcasts --activate
```

Installation can also be done manually by downloading the [latest release](https://github.com/PRX/Dovetail-Wordpress-Plugin/releases) file and extracting it into `wp-content/plugins`, then run:

```bash
wp plugin activate dovetail-podcasts
```

Once activated, look for the **Dovetail** link in the main admin menu.

### Connect To Dovetail

To connect the plugin to Dovetail, got to **Dovetail** settings and provide your Client Application key and secret, which can be found by logging into your [Dovetail account](https://id.prx.tech/). Go to the **Client Applications** tab and select which application you want to use. Use the Key and Secret values to connect Wordpress plugin to Dovetail. Once connected, you should be presented with a confirmation, your user information, and a list of podcasts you have access to.

> Do not see the **Client Applications** tab? Contact PRX Support to request an application be setup for you. If your site has a staging or development environment, also request a staging application be created, so your testing doesn't affect your actual podcast episodes and feeds.

### Configure Settings

Once Dovetail connection is complete, let's get things configured for your site.

#### Podcasts Post Types

By default, Dovetail Podcasts will treat Posts as podcast episodes, and provide a post editor meta box to add episode information to the post. All available post types that are compatible with the meta box will be listed. If the post type you use for podcast episodes is not listed, makes ure it is configured to support custom fields.

#### Delete Uploaded Media After Publishing

Dovetail Podcasts will use your Wordpress Media Library to upload audio files to the server and connect those files with the post. Dovetail will retrieve the audio file from your server, process it for distribution, and then host the audio URL used in your feeds. This behavior is similar what media offloading plugin do to store media files in cloud storage, such as AWS S3 or Google Cloud.

Enable this option if you would like to reduce storage costs for your site hosting and do not use a media offloading plugin. When podcast episode posts are published, the audio in your media library will be deleted.

#### Manage Client Application

In the case where you need to change what Client Application you use to connect to Dovetail, the first thing that needs to be done is to remove the existing connection. Enter "DELETE" then click **Save** to remove the current Client Application's key and secret. All other settings will be kept.

> Deactivating the Dovetail Podcasts plugin will also remove the Client Application's key and secret. All other other settings will remain until the plugin is deleted via the **Plugins** admin.

## Create Podcast Episode

Steps to add podcast episode data to a post...

### Create/Update Post

### Publishing

#### Scheduled Publishing

### Remove Podcast Episode

#### Delete Post

#### Remove Podcast Episode Data From Post

## Play Podcast Episode On Your Site

Steps to add player to frontend templates...

### Block Editor

### Shortcodes

---

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

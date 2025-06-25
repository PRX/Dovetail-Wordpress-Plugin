# Development - Getting Started

## VS Code Extensions

This plugin adheres to Wordpress coding standards. To help with keeping to those standards while working, install this project's recommended extensions:

- Open Extensions panel
- Enter `@recommended` in search bar, or choose _Recommended_ from filters menu.
- Install the **Workspace Recommended** extensions.

## Development Server

Don't worry about spinning up a Wordpress site, we got one for you. Start by making a copy of the `.env.dist` file:

```bash
cp .env.dist .env
```

Update the admin user and password variables in the `.env` file to something you will remember, then run:

```bash
composer install
npm install
npm run build
composer build-and-run -- -a
```

> If the build fails, make sure you have the latest version of [Docker](https://docs.docker.com/get-started/get-docker/) installed.

Once complete, you can access the site at http://localhost:8091. This will be a fresh Wordpress site with your user setup, and this plugin activated, but you may need to finish some setup prompts. When setup is complete and you have logged in, got to [Dovetail Podcasts Settings](http://localhost:8091/wp-admin/admin.php?page=dovetail-podcasts-settings) to enter your Dovetail Staging Client Application credentials.

> Don't have Dovetail Staging Client Application credentials? Drop a request in the PRX Slack `#tech-dovetail-wordpress-plugin` channel.

## Javascript Packages

Several javascript driven features are developed as NPM packages. These packages can be found in the `packages` directory. Each package should be add to the root `package.json` as a workspace to allow for top level dependency installation and scripts for builds of the packages.

Each package should have a `build` script defined in its `package.json` and its build output should be placed in `build/package-name`. A corresponding `build:package-name` script should be added to the root `package.json` using the `--workspace` (or `-w`) option:

```json
{
  ...
  "scripts": {
    ...
    "build:package-name": "npm run build --workspace=packages/path/to/package-name",
    ...
  }
}
```

For more on working with workspaces, refer to the [NPM workspaces documentation](https://docs.npmjs.com/cli/v8/using-npm/workspaces).

If a packages dependencies conflict with any root package dependencies, do NOT add it as a workspace. That package will need to handle dependency install and builds differently. The package should still define a `build` script, but it should be called in the root `build:package-name` using `--prefix` option, and provide a similar `install:package-name` script that should be added to the root `postinstall` script:

```json
{
  ...
  "scripts": {
    "postinstall": "npm run install:package-name",
    ...
    "install:package-name": "npm --prefix ./packages/path/to/package-name install",
    "build:package-name": "npm --prefix ./packages/path/to/package-name run build ",
    ...
  }
}
```

Following these patterns ensures the Github workflow builds can just call `npm install` and `npm run build` from the root package to install an build all packages.

### Podcast Episode Metabox Development

Podcast Episode Metabox initializes its UI as a React application using [ShadCN](https://ui.shadcn.com/) components styled with [Tailwind](https://tailwindcss.com/). Before working on the metabox UI, run:

```shell
cd packages/metabox/podcast-episode/
npm run start
```

This will start a dev build that will watch for changes and create development versions of build files in the `build/admin/metabox` directory. The `PostMetaBox` php class will enqueue javascript and css assets from that build directory.

UI components should come from [ShadCN](https://ui.shadcn.com/) as much as possible. ShadCN components get added directly to project files in `src/components/ui` using the installation command found in the component's documentation. Once installed, the markup and styling of the component can be tweaked as needed. Since these components are added as project files instead of dependencies, changes will not be lost when `npm install` is run.

### Dovetail Podcasts Player

The Dovetail Podcasts Player is not built as a single block. Each player component is its own block that can be added by the user as needed. There are two piece to every component block, its web component and its Wordpress block.

### Dovetail Podcasts Player Blocks

Wordpress blocks are responsible for adding the components to Wordpress as block that can be added to content or templates using the block editor. They are built using [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) to generate the files needed to define and configure each block.

To begin working on a component block, run:

```shell
cd packages/blocks/player/
npm run start -w blocks
```

This will start a development build that will watch for changes and create development build files in the `build/blocks/player` directory. The `Player` php class will enqueue javascript and css assets from that build directory.

### Dovetail Podcasts Player Web Components

Web components are what the Wordpress block will use in its javascript and HTML output. They are built using [Stencil](https://stenciljs.com/docs/api).

To begin working on a web component first start the Wordpress blocks development build, then in a new terminal run:

```shell
cd packages/blocks/player/
npm run start -w web-components
```

This will start a Stencil development server that will provide a preview at `localhost:3333` and compile development builds of components in the packages `dist` directory. The blocks package includes the `dist` files as dependencies. Changes to `dist` files will trigger development builds of the Wordpress blocks.

> If you ever need to restart the web components development server, run `npm run start -w web-components -- --no-open` to restart it without opening a new browser window.

To generate files for a new web component, run:

```shell
npm run generate new-component-name
```

This will create component files (including tests and docs), in `src/components/new-component-name`.

## Create A Plugin Build

Whenever you need to test your work on the plugin in another Wordpress site, you can create a build `.zip` file to add to that sites plugins.

From the plugin root directory, run:

```shell
npm run build
composer build-plugin
```

This will create a release optimized build in `plugin-build/dovetail-podcasts.zip`.

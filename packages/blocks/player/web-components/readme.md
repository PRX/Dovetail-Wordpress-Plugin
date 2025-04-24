[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# Dovetail Podcasts Player Web Components

These web components are used by the `blocks` package to render interactive audio controls for podcast episode audio in the Wordpress front-end. Components should be modular to allow for customization of what controls are used in the `dtpc-player` wrapper component. They should also be styled using CSS custom properties to allow for easy granular customization of there appearance.

## Player Block Components

The following components are meant to be used directly as Wordpress blocks:

- Player Wrapper ([`dtpc-player`](./src/components/dtpc-player/))
- Play Button ([`dtpc-play-button`](./src/components/dtpc-play-button/))
- Progress Bar ([`dtpc-progress-bar`](./src/components/dtpc-progress-bar/))
- Time Display ([`dtpc-time-display`](./src/components/dtpc-time-display/))
- Current Time ([`dtpc-time-current`](./src/components/dtpc-time-current/))
- Duration ([`dtpc-time-duration`](./src/components/dtpc-time-duration/))
- Volume Controls ([`dtpc-volume-controls`](./src/components/dtpc-volume-controls/))
- Volume Slider ([`dtpc-volume-slider`](./src/components/dtpc-volume-slider/))
- Mute Button ([`dtpc-mute-button`](./src/components/dtpc-mute-button/))

### Generic/Shared Internal Components

The following components are used internally by the block components to consolidate and share repeated UI/UX patterns:

- Button ([`dtpc-button`](./src/components/dtpc-button/))
- Slider ([`dtpc-slider`](./src/components/dtpc-slider/))

## Component Development

To start building a new player component, run th following from the `packages/blocks/player` directory:

```bash
npm install
npm start -w web-components
```

This will install development dependencies and start a development server at http://localhost:3333.

To generate files for a new component, run:

```bash
npm run generate dtpc-component-name -w web-components
```

To build the components for production, run:

```bash
npm run build -w web-components
```

To run the unit tests for the components, run:

```bash
npm test -w web-components
```

Need help? Check out the Stencil docs [here](https://stenciljs.com/docs/my-first-component).

## Naming Components

All component names should be prefixed with `dtpc-`, all lowercased, and use `-` to separate words, for example `dtpc-my-component-name`.

## Using Components

There are two strategies we recommend for using web components built with Stencil.

The first step for all two of these strategies is to [publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages).

You can read more about these different approaches in the [Stencil docs](https://stenciljs.com/docs/publishing).

### Lazy Loading

Components javascript files will be lazy loaded when a player blocks is rendered on the front-end, either by using the block in the block editor or using the player blocks shortcode. See [`blocks` package](../blocks/) for more information on how components are used in the rendered blocks.

### Development Server

You can preview your new component using the development server by editing `src/index.html`.

Add what you need to the file to render the component, but you will need to make sure to wrap it in a `<dtpc-player>` component that has a `src` set to a audio file URL.

```html
<dtpc-player src="https://audio-host.com/path/to/audio-file.mp3">
  <dtpc-my-component-name></dtpc-my-component-name>
</dtpc-player>
```

There are probably several layouts already marked up that can be duplicated or added to.

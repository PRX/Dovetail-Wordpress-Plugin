# dtpc-player



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                     | Type                  | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `duration` | `duration` | Preset audio source duration.                                                                                                                                                                                   | `number`              | `0`         |
| `layout`   | `layout`   | Predefined layouts. - 'flex': Adds `display: flex` to main container. - 'default': Renders player with basic controls. (Play button, progress bar, time display, volume controls) - TODO: More options to come. | `"default" \| "flex"` | `undefined` |
| `src`      | `src`      | Audio source URL.                                                                                                                                                                                               | `string`              | `undefined` |


## Shadow Parts

| Part         | Description |
| ------------ | ----------- |
| `"backdrop"` |             |


## Dependencies

### Depends on

- [dtpc-play-button](../dtpc-play-button)
- [dtpc-progress-bar](../dtpc-progress-bar)
- [dtpc-time-display](../dtpc-time-display)
- [dtpc-volume-controls](../dtpc-volume-controls)

### Graph
```mermaid
graph TD;
  dtpc-player --> dtpc-play-button
  dtpc-player --> dtpc-progress-bar
  dtpc-player --> dtpc-time-display
  dtpc-player --> dtpc-volume-controls
  dtpc-play-button --> dtpc-button
  dtpc-play-button --> icon-pause
  dtpc-play-button --> icon-play
  dtpc-progress-bar --> dtpc-slider
  dtpc-time-display --> dtpc-time-current
  dtpc-time-display --> dtpc-time-duration
  dtpc-volume-controls --> dtpc-mute-button
  dtpc-volume-controls --> dtpc-volume-slider
  dtpc-mute-button --> dtpc-button
  dtpc-mute-button --> icon-volume
  dtpc-volume-slider --> dtpc-slider
  style dtpc-player fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

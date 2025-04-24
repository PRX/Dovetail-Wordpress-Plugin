# dtpc-play-button



<!-- Auto Generated Below -->


## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `audio-toggle-paused` |             | `CustomEvent<any>` |
| `dtpc-control-init`   |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dtpc-player](../dtpc-player)

### Depends on

- [dtpc-button](../dtpc-button)
- [icon-pause](../icons)
- [icon-play](../icons)

### Graph
```mermaid
graph TD;
  dtpc-play-button --> dtpc-button
  dtpc-play-button --> icon-pause
  dtpc-play-button --> icon-play
  dtpc-player --> dtpc-play-button
  style dtpc-play-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

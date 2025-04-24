# dtpc-mute-button



<!-- Auto Generated Below -->


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `dtpc-control-init` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dtpc-volume-controls](../dtpc-volume-controls)

### Depends on

- [dtpc-button](../dtpc-button)
- [icon-volume](../icons)

### Graph
```mermaid
graph TD;
  dtpc-mute-button --> dtpc-button
  dtpc-mute-button --> icon-volume
  dtpc-volume-controls --> dtpc-mute-button
  style dtpc-mute-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

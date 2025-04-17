# dtpc-progress-bar



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type     | Default |
| ---------- | ---------- | ----------- | -------- | ------- |
| `duration` | `duration` |             | `number` | `0`     |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `dtpc-control-init` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dtpc-player](../dtpc-player)

### Depends on

- [dtpc-slider](../dtpc-slider)

### Graph
```mermaid
graph TD;
  dtpc-progress-bar --> dtpc-slider
  dtpc-player --> dtpc-progress-bar
  style dtpc-progress-bar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

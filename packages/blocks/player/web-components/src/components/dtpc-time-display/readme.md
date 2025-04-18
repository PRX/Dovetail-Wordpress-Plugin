# dtpc-time-display



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type     | Default |
| ---------- | ---------- | ----------- | -------- | ------- |
| `duration` | `duration` |             | `number` | `0`     |


## Dependencies

### Used by

 - [dtpc-player](../dtpc-player)

### Depends on

- [dtpc-time-current](../dtpc-time-current)
- [dtpc-time-duration](../dtpc-time-duration)

### Graph
```mermaid
graph TD;
  dtpc-time-display --> dtpc-time-current
  dtpc-time-display --> dtpc-time-duration
  dtpc-player --> dtpc-time-display
  style dtpc-time-display fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

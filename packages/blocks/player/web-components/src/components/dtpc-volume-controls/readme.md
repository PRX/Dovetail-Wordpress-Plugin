# dtpc-volume-controls

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type     | Default |
| -------- | --------- | ----------- | -------- | ------- |
| `volume` | `volume`  |             | `number` | `0.8`   |

## Dependencies

### Used by

- [dtpc-player](../dtpc-player)

### Depends on

- [dtpc-mute-button](../dtpc-mute-button)
- [dtpc-volume-slider](../dtpc-volume-slider)

### Graph

```mermaid
graph TD;
  dtpc-volume-controls --> dtpc-mute-button
  dtpc-volume-controls --> dtpc-volume-slider
  dtpc-mute-button --> dtpc-button
  dtpc-mute-button --> icon-volume
  dtpc-volume-slider --> dtpc-slider
  dtpc-player --> dtpc-volume-controls
  style dtpc-volume-controls fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_

# Dovetail Podcasts Player Components

## Player Wrapper

The base player component is designed to be a wrapper for portions of the page associated with an audio playback experience. Anything can be wrapped by the player element, and any Dovetail Podcasts Player components inside the wrapper will control or provide feedback for the audio being played. A set of default player controls will be provided when the wrapper is used on its own without any content.

### Block

- Block Name - `dovetail-podcasts-player/player`
- Block Attributes
  - `post_id` (Optional)
    - Integer
    - Set a specific post id to get podcast episode data from. Defaults to post for current render context.
  - `src` (Optional)
    - String
    - Manually set the audio URL that the player should play. No podcast episode data will be loaded, and `post_id` will be ignored, when the `src` is set.
  - `duration` (Optional)
    - Number
    - Duration of audio in seconds. Only needs to be set to if manually providing a `src` URL. Duration will render as `00:00` until audio is played if not provided.
  - `backdrop` (Optional)
    - Boolean
    - Determines if the player wrapper should display its built-in back drop element to add a background color or image to player container.
  - `layout` (Optional)
    - String - `default`, `flex`
    - Tells player to either render default controls or add flex layout to wrapper when adding specific controls. Will always be set to `default` if player is rendered without any child elements.

### Shortcode

- Shortcode - `[dovetail-podcasts-player]`
- Shortcode Attributes are identical to Block Attributes.

### HTML Web Component

- Web Component Name - `dtpc-player`
- [Stencil Component Docs](../packages/blocks/player/web-components/src/components/dtpc-player/readme.md)

### CSS Custom Styling Properties

| Property Name                         | Description                                                                                                                                                                                                                     | Default                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| --dtpc-player--foreground             | Color of player components foreground elements, such as icons, text, and borders.                                                                                                                                               | `currentColor`                   |
| --dtpc-player--highlight              | Color of player components focus ring when keyboard navigating with <kbd>Tab</kbd>.                                                                                                                                             | `LinkText`                       |
| --dtpc-player--spacing                | Space between components in `default` and `flex` layouts.                                                                                                                                                                       | `0.5rem`                         |
| --dtpc-player--surface                | Color of player backdrop surface.                                                                                                                                                                                               | 10% opacity of foreground color. |
| --dtpc-player--surface-image          | Background image of player backdrop surface. Can be set to an image using `url()` or to a gradient. See [`background-image` documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) for more details. | `none`                           |
| --dtpc-player--surface-image-position | Position of player backdrop surface background image. See [`background-position` documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) for more details.                                         | `center center`                  |
| --dtpc-player--surface-image-size     | Size of player backdrop surface background image. See [`background-size` documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size) for more details.                                                     | `cover`                          |
| --dtpc-player--surface-blur           | Amount of blur to add to backdrop. Will blur the surface image or what ever is behind the backdrop. Surface color must have transparency for effect to be visibly.                                                              |                                  |
| --dtpc-player--border-radius          | Rounds the corners of the backdrop. See [`border-radius` documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) for more details.                                                                       | `0.25rem`                        |
| --dtpc-player--padding                | Padding of all sides between backdrop edge and player content.                                                                                                                                                                  | `0.5rem`                         |
| --dtpc-player--padding-inline         | Padding of left and right sides between backdrop edge and player content.                                                                                                                                                       | `var(--_dtpc-player--padding)`   |
| --dtpc-player--padding-block          | Padding of top and bottom sides between backdrop edge and player content.                                                                                                                                                       | `var(--_dtpc-player--padding)`   |

#### Buttons

| Property Name                           | Description                                                                                                  | Default                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| --dtpc-button--size                     | Size of player buttons. Controls width and height of icon button, and height of buttons with text label.     | `1.5rem`                                |
| --dtpc-button--padding                  | Padding between button surface edge and icon and/or label.                                                   | `0.325rem`                              |
| --dtpc-button--foreground               | Color of player buttons' foreground elements, such as icons, text, and borders.                              | Player foreground color.                |
| --dtpc-button--foreground--hover        | Color of player buttons' foreground elements when mouse cursor is over the button.                           | Button foreground color.                |
| --dtpc-button--foreground--active       | Color of player buttons' foreground elements while button is pressed.                                        | Button foreground color.                |
| --dtpc-button--surface                  | Color of player buttons' background.                                                                         | `transparent`                           |
| --dtpc-button--surface--hover           | Color of player buttons' background when mouse cursor is over the button.                                    | 20% opacity of button foreground color. |
| --dtpc-button--surface--active          | Color of player buttons' background while button is pressed.                                                 | 10% opacity of button foreground color. |
| --dtpc-button--surface-blur             | Amount of blur to add to buttons' background. Surface color must have transparency for effect to be visibly. | `var(--_dtpc-player--surface-blur)`     |
| --dtpc-button--border-color             | Color of player buttons' border.                                                                             | `transparent`                           |
| --dtpc-button--border-color--hover      | Color of player buttons' border when mouse cursor is over the button.                                        | Button border color.                    |
| --dtpc-button--border-color--active     | Color of player buttons' border while button is pressed.                                                     | Button border color.                    |
| --dtpc-button--border-radius            | Roundness of player buttons' corners.                                                                        | `100vw`                                 |
| --dtpc-button--border-radius--hover     | Roundness of player buttons' corners when mouse cursor is over the button.                                   | Button border radius.                   |
| --dtpc-button--border-radius--active    | Roundness of player buttons' corners while button is pressed.                                                | Button border radius.                   |
| --dtpc-button--border-thickness         | Thickness of player buttons' borders.                                                                        | `0`                                     |
| --dtpc-button--border-thickness--hover  | Thickness of player buttons' borders when mouse cursor is over the button.                                   | Button border thickness.                |
| --dtpc-button--border-thickness--active | Thickness of player buttons' borders while button is pressed.                                                | Button border thickness.                |
| --dtpc-button--focus-ring-color         | Color of buttons' focus ring when keyboard navigating with <kbd>Tab</kbd>.                                   | `var(--_dtpc-player--highlight)`        |
| --dtpc-button--focus-ring-offset        | Distance between focus ring and button background edge.                                                      | `0.125rem`                              |
| --dtpc-button--focus-ring-thickness     | Thickness of buttons' focus ring.                                                                            | `0.125rem`                              |

#### Sliders

| Property Name                                 | Description                                                                                | Default                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------- |
| --dtpc-slider--progress--color                | Color of sliders' track progress.                                                          | Player foreground color.                |
| --dtpc-slider--track--color                   | Color of sliders' track.                                                                   | 20% opacity of player foreground color. |
| --dtpc-slider--track--thickness               | Thickness of sliders' track.                                                               | `0.25rem`                               |
| --dtpc-slider--track--radius                  | Roundness of sliders' track.                                                               | `100vw`                                 |
| --dtpc-slider--track--border-color            | Color of sliders' track border.                                                            | `transparent`                           |
| --dtpc-slider--track--border-thickness        | Thickness of sliders' track border.                                                        | `0px`                                   |
| --dtpc-slider--track--border-offset           | Distance of sliders' track border from track background edge.                              | `0px`                                   |
| --dtpc-slider--scrubber--color                | Color of sliders' scrubber handle.                                                         | Player foreground color.                |
| --dtpc-slider--scrubber--size                 | Size of sliders' scrubber handle.                                                          | `1.25rem`                               |
| --dtpc-slider--scrubber--border-color         | Color of sliders' scrubber handle border.                                                  | `transparent`                           |
| --dtpc-slider--scrubber--border-thickness     | Thickness of sliders' scrubber handle border.                                              | `0`                                     |
| --dtpc-slider--scrubber--border-radius        | Roundness of sliders' scrubber handle corners.                                             | `100vw`                                 |
| --dtpc-slider--scrubber--focus-ring-color     | Color of sliders' scrubber handle focus ring when keyboard navigating with <kbd>Tab</kbd>. | `var(--_dtpc-player--highlight)`        |
| --dtpc-slider--scrubber--focus-ring-offset    | Distance between focus ring and button background edge.                                    | `0.125rem`                              |
| --dtpc-slider--scrubber--focus-ring-thickness | Thickness of sliders' scrubber handle focus ring.                                          | `0.125rem`                              |

---

## Play Button

Button to play/pause the player.

### Block

- Block Name - `dovetail-podcasts-player/play-button`

### Shortcode

- Shortcode - `[dovetail-podcasts-play-button]`

### HTML Web Component

- Web Component Name - `dtpc-play-button`
- [Stencil Component Docs](../packages/blocks/player/web-components/src/components/dtpc-play-button/readme.md)

### CSS Custom Styling Properties

| Property Name                                         | Description                                                                                                  | Default                                 |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| --dtpc-play-button--size                              | Size of play button. Controls width and height of icon button, and height of buttons with text label.        | `2rem`                                  |
| --dtpc-play-button--padding                           | Padding between button surface edge and icon and/or label.                                                   | `0.5rem`                                |
| --dtpc-play-button--foreground                        | Color of play button foreground elements, such as icons, text, and borders.                                  | Button foreground color.                |
| --dtpc-play-button--foreground--hover                 | Color of play button foreground elements when mouse cursor is over the button.                               | Button foreground color.                |
| --dtpc-play-button--foreground--active                | Color of play button foreground elements while button is pressed.                                            | Button foreground color.                |
| --dtpc-play-button--foreground--playing               | Color of play button foreground elements, such as icons, text, and borders, while playing audio.             | Button foreground color.                |
| --dtpc-play-button--foreground--playing--hover        | Color of play button foreground elements when mouse cursor is over the button, while playing audio.          | Button foreground color.                |
| --dtpc-play-button--foreground--playing--active       | Color of play button foreground elements while button is pressed, while playing audio.                       | Button foreground color.                |
| --dtpc-play-button--surface                           | Color of play button background.                                                                             | `transparent`                           |
| --dtpc-play-button--surface--hover                    | Color of play button background when mouse cursor is over the button.                                        | 20% opacity of button foreground color. |
| --dtpc-play-button--surface--active                   | Color of play button background while button is pressed.                                                     | 10% opacity of button foreground color. |
| --dtpc-play-button--surface--playing                  | Color of play button background, while playing audio.                                                        | `transparent`                           |
| --dtpc-play-button--surface--playing--hover           | Color of play button background when mouse cursor is over the button, while playing audio.                   | 20% opacity of button foreground color. |
| --dtpc-play-button--surface--playing--active          | Color of play button background while button is pressed, while playing audio.                                | 10% opacity of button foreground color. |
| --dtpc-play-button--surface-blur                      | Amount of blur to add to buttons' background. Surface color must have transparency for effect to be visibly. | `var(--_dtpc-player--surface-blur)`     |
| --dtpc-play-button--border-color                      | Color of play button border.                                                                                 | `transparent`                           |
| --dtpc-play-button--border-color--hover               | Color of play button border when mouse cursor is over the button.                                            | Play button border color.               |
| --dtpc-play-button--border-color--active              | Color of play button border while button is pressed.                                                         | Button border color.                    |
| --dtpc-play-button--border-color--playing             | Color of play button border, while playing audio.                                                            | `transparent`                           |
| --dtpc-play-button--border-color--playing--hover      | Color of play button border when mouse cursor is over the button, while playing audio.                       | Play button border color.               |
| --dtpc-play-button--border-color--playing--active     | Color of play button border while button is pressed, while playing audio.                                    | Button border color.                    |
| --dtpc-play-button--border-radius                     | Roundness of play button corners.                                                                            | `100vw`                                 |
| --dtpc-play-button--border-radius--hover              | Roundness of play button corners when mouse cursor is over the button.                                       | Button border radius.                   |
| --dtpc-play-button--border-radius--active             | Roundness of play button corners while button is pressed.                                                    | Button border radius.                   |
| --dtpc-play-button--border-radius--playing            | Roundness of play button corners, while playing audio.                                                       | `100vw`                                 |
| --dtpc-play-button--border-radius--playing--hover     | Roundness of play button corners when mouse cursor is over the button, while playing audio.                  | Button border radius.                   |
| --dtpc-play-button--border-radius--playing--active    | Roundness of play button corners while button is pressed, while playing audio.                               | Button border radius.                   |
| --dtpc-play-button--border-thickness                  | Thickness of play button borders.                                                                            | `0.125rem`                              |
| --dtpc-play-button--border-thickness--hover           | Thickness of play button borders when mouse cursor is over the button.                                       | Play button border thickness.           |
| --dtpc-play-button--border-thickness--active          | Thickness of play button borders while button is pressed.                                                    | Play button border thickness.           |
| --dtpc-play-button--border-thickness--playing         | Thickness of play button borders, while playing audio.                                                       | `0.125rem`                              |
| --dtpc-play-button--border-thickness--playing--hover  | Thickness of play button borders when mouse cursor is over the button, while playing audio.                  | Play button border thickness.           |
| --dtpc-play-button--border-thickness--playing--active | Thickness of play button borders while button is pressed, while playing audio.                               | Play button border thickness.           |
| --dtpc-play-button--focus-ring-color                  | Color of buttons' focus ring when keyboard navigating with <kbd>Tab</kbd>.                                   | `var(--_dtpc-player--highlight)`        |
| --dtpc-play-button--focus-ring-offset                 | Distance between focus ring and button background edge.                                                      | `0.125rem`                              |
| --dtpc-play-button--focus-ring-thickness              | Thickness of buttons' focus ring.                                                                            | `0.125rem`                              |

---

## Progress Bar

Slider to display and control playback progress.

### Block

- Block Name - `dovetail-podcasts-player/progress-bar`

### Shortcode

- Shortcode - `[dovetail-podcasts-progress-bar]`
- Shortcode Attributes are identical to Block Attributes.

### HTML Web Component

- Web Component Name - `dtpc-progress-bar`
- [Stencil Component Docs](../packages/blocks/player/web-components/src/components/dtpc-progress-bar/readme.md)

### CSS Custom Styling Properties

| Property Name                                       | Description                                                                                    | Default                          |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------- |
| --dtpc-progress-bar--progress--color                | Color of progress bar track progress.                                                          | Player foreground color.         |
| --dtpc-progress-bar--track--color                   | Color of progress bar track.                                                                   | `transparent`                    |
| --dtpc-progress-bar--track--thickness               | Thickness of progress bar track.                                                               | `0.5rem`                         |
| --dtpc-progress-bar--track--radius                  | Roundness of progress bar track.                                                               | `100vw`                          |
| --dtpc-progress-bar--track--border-color            | Color of progress bar track border.                                                            | Player foreground color.         |
| --dtpc-progress-bar--track--border-thickness        | Thickness of progress bar track border.                                                        | `0.125rem`                       |
| --dtpc-progress-bar--track--border-offset           | Distance of progress bar track border from track background edge.                              | `0.125rem`                       |
| --dtpc-progress-bar--scrubber--color                | Color of progress bar scrubber handle.                                                         | Player foreground color.         |
| --dtpc-progress-bar--scrubber--size                 | Size of progress bar scrubber handle.                                                          | `1.25rem`                        |
| --dtpc-progress-bar--scrubber--border-color         | Color of progress bar scrubber handle border.                                                  | `transparent`                    |
| --dtpc-progress-bar--scrubber--border-thickness     | Thickness of progress bar scrubber handle border.                                              | `0`                              |
| --dtpc-progress-bar--scrubber--border-radius        | Roundness of progress bar scrubber handle corners.                                             | `100vw`                          |
| --dtpc-progress-bar--scrubber--focus-ring-color     | Color of progress bar scrubber handle focus ring when keyboard navigating with <kbd>Tab</kbd>. | `var(--_dtpc-player--highlight)` |
| --dtpc-progress-bar--scrubber--focus-ring-offset    | Distance between focus ring and button background edge.                                        | `0.125rem`                       |
| --dtpc-progress-bar--scrubber--focus-ring-thickness | Thickness of progress bar scrubber handle focus ring.                                          | `0.125rem`                       |

---

## [Component Name]

DESCRIPTION

### Block

- Block Name - `dovetail-podcasts-player/[component-name]`
- Block Attributes
  - `[attr-name]` (Optional)
    - Integer
    - DESCRIPTION

### Shortcode

- Shortcode - `[dovetail-podcasts-[component-name]]`
- Shortcode Attributes are identical to Block Attributes.

### HTML Web Component

- Web Component Name - `dtpc-[component-name]`
- [Stencil Component Docs](../packages/blocks/player/web-components/src/components/dtpc-[component-name]/readme.md)

### CSS Custom Styling Properties

| Property Name                                                                    | Description | Default |
| -------------------------------------------------------------------------------- | ----------- | ------- |
| --dtpc-[component-name]--[part]--[property-name]--[component-state]--[css-state] | DESCRIPTION | DEFAULT |

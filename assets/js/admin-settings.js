jQuery(document).ready(function ($) {
  // Password field visibility toggle.
  $("input[type='password']")
    .attr("data-visibility", "hidden")
    .next("button")
    .click((e) => {
      const $toggleBtn = $(e.target);
      const $input = $toggleBtn.prev();

      console.log("click", $input.attr("data-visibility"));

      switch ($input.attr("data-visibility")) {
        case "visible":
          $input.attr("data-visibility", "hidden").attr("type", "password");
          $toggleBtn
            .removeClass("dashicons-hidden")
            .addClass("dashicons-visibility")
            .attr("title", "Show");
          break;
        default:
          $input.attr("data-visibility", "visible").attr("type", "text");
          $toggleBtn
            .removeClass("dashicons-visibility")
            .addClass("dashicons-hidden")
            .attr("title", "Hide");
          break;
      }
    });

  /**
   * Player Settings
   */

  // Player preview.
  const $playerPreview = $("#dovetail-player-preview").attr(
    "data-theme",
    localStorage.getItem("dtpc.settings.player.preview.theme") || "auto",
  );
  const $player = $playerPreview.find("dtpc-player").each(function () {
    const $this = $(this);
    const showBackdrop = localStorage.getItem(
      "dtpc.settings.player.preview.backdrop",
    );

    if (showBackdrop) {
      $this.attr("backdrop", true);
    } else {
      $this.removeAttr("backdrop");
    }
  });

  // Update player preview when backdrop is enabled/disabled.
  $playerPreview.find(".dtpc-backdrop button").on("click", function () {
    const hasBackdrop = typeof $player.attr("backdrop") !== "undefined";

    if (!hasBackdrop) {
      $player.attr("backdrop", true);
    } else {
      $player.removeAttr("backdrop");
    }

    localStorage.setItem("dtpc.settings.player.preview.backdrop", !hasBackdrop);
  });

  // Player preview theme switcher.
  $playerPreview.find("button[data-theme-color]").on("click", function () {
    const themeColor = $(this).data("themeColor");

    $playerPreview.attr("data-theme", themeColor);
    localStorage.setItem("dtpc.settings.player.preview.theme", themeColor);
  });

  // Update player preview when player style inputs are changed.
  const $playerStyleInputs = $("input.dtpc-player-style");
  const $playerColorStyleInputs = $playerStyleInputs.filter(
    ".wp-color-picker-field",
  );
  const playerStyles = new Map();
  const $playerStyle = $(
    '<style type="text/css" id="dtpc-player-styles">',
  ).appendTo("head");

  function updatePlayerStylesCss() {
    const css = playerStyles.entries().reduce((a, [prop, value]) => {
      return `${a}--dtpc-${prop}: ${value};`;
    }, "");

    $playerStyle.text(`:root{${css}}`);
  }

  $playerStyleInputs
    .on("change", function () {
      const $this = $(this);
      const prop = $this.attr("id").match(/\[([^\]]+)\]/)[1];
      const value = $this.val()?.trim();

      if (value?.length) {
        playerStyles.set(prop, value);
      } else {
        playerStyles.delete(prop);
      }

      updatePlayerStylesCss();
    })
    .trigger("change");

  $playerColorStyleInputs.each(function () {
    const $this = $(this);
    const prop = $this.attr("id").match(/\[([^\]]+)\]/)[1];

    $this.spectrum({
      preferredFormat: "hsl",
      showInitial: true,
      showInput: true,
      allowEmpty: true,
      showAlpha: true,
      showPalette: true,
      palette: [],
      localStorageKey: "dtpc.player.palette",
      change: (color) => {
        if (color) {
          playerStyles.set(prop, color.toHslString());
        } else {
          playerStyles.delete(prop);
        }

        updatePlayerStylesCss();

        console.log(color, playerStyles, $playerStyle.text());
      },
    });
  });

  updatePlayerStylesCss();
});

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
});

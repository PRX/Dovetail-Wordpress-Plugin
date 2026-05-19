/**
 * Version utilities.
 */

function validateVersion(version) {
  console.log("Validating Version:", version, typeof version);
  return (
    typeof version === "string" && /^\d+\.\d+\.\d+(-[\w.]+)?/.test(version)
  );
}

// Export the utility functions
module.exports = {
  validateVersion,
};

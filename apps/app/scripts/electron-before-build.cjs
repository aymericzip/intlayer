// Returning false tells electron-builder that node_modules are handled
// externally, preventing it from resolving workspace symlinks.
module.exports = async () => false;

const { execSync } = require('child_process');
const path = require('path');

/**
 * Ad-hoc sign the macOS app to prevent the "damaged and can't be opened" error.
 * Without an Apple Developer cert, this changes the Gatekeeper message from "damaged"
 * to "unidentified developer", which users can bypass with right-click → Open.
 */
exports.default = async function afterSign(context) {
  const { packager, appOutDir } = context;
  if (packager.platform.name !== 'mac') return;

  const appName = packager.appInfo.productFilename;
  const appPath = path.join(appOutDir, `${appName}.app`);

  try {
    execSync(`codesign --force --deep --sign - "${appPath}"`, {
      stdio: 'inherit',
    });
    console.log(`Ad-hoc signed: ${appPath}`);
  } catch (err) {
    console.warn('Ad-hoc signing failed (non-fatal):', err.message);
  }
};

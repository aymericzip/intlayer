import type { Compiler } from 'webpack';

export const bundle = (compiler: Compiler) =>
  // Run the compiler
  compiler.run((err, stats) => {
    // Handle errors and webpack compilation stats
    if (err) {
      console.error('Webpack compilation error:', err);
      return;
    }

    console.info('Webpack compilation successful.');

    if (stats)
      console.info(
        stats.toString({
          // Add options here to customize the stats output
          colors: true,
        })
      );
  });

export const watch = (compiler: Compiler) =>
  // Run the compiler
  compiler.watch({}, (err, stats) => {
    // Handle errors and webpack compilation stats
    if (err) {
      console.error('Webpack compilation error:', err);
      return;
    }

    console.info('Webpack compilation successful.');

    if (stats)
      console.info(
        stats.toString({
          // Add options here to customize the stats output
          colors: true,
        })
      );

    // After successful compilation, start the server
    console.info('Watch IntLayer content...');
  });

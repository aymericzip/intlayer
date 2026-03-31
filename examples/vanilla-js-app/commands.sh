#!/bin/bash

# Initialize Intlayer config (if not already done)
bun x intlayer init --no-gitignore

# Build the dictionaries
bun x intlayer build

# Watch the dictionaries
bun x intlayer watch

# Create the standalone bundle for the browser
# This will create dist/intlayer-bundle.js
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile ./dist/intlayer-bundle.js
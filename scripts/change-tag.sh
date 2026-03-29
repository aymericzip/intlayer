packages=(
  "@intlayer/types" "@intlayer/config" "@intlayer/dictionaries-entry" 
  "@intlayer/unmerged-dictionaries-entry" "@intlayer/dynamic-dictionaries-entry" 
  "@intlayer/remote-dictionaries-entry" "@intlayer/fetch-dictionaries-entry" 
  "@intlayer/api" "@intlayer/core" "@intlayer/chokidar" "@intlayer/webpack" 
  "@intlayer/editor" "@intlayer/cli" "@intlayer/babel" "@intlayer/swc" 
  "@intlayer/editor-react" "@intlayer/ai" "@intlayer/vue-compiler" 
  "@intlayer/svelte-compiler" "intlayer" "@intlayer/docs" "@intlayer/mcp" 
  "intlayer-cli" "express-intlayer" "hono-intlayer" "adonis-intlayer" 
  "fastify-intlayer" "lit-intlayer" "vanilla-intlayer" "apps/backend" 
  "react-intlayer" "next-intlayer" "react-scripts-intlayer" "vue-intlayer" 
  "solid-intlayer" "svelte-intlayer" "preact-intlayer" "angular-intlayer" 
  "vite-intlayer" "nuxt-intlayer" "astro-intlayer" "react-native-intlayer" 
  "lynx-intlayer" "@intlayer/design-system" "intlayer-editor" "plugins/sync-json-plugin"
)

VERSION="8.6.0"

TOKEN="npm_"


for pkg in "${packages[@]}"; do
  if [ -z "$pkg" ]; then 
    continue
  fi
  
  npm --//registry.npmjs.org/:_authToken="$TOKEN" dist-tag add "$pkg@8.6.0" latest || echo "Échec pour $pkg, passage au suivant..."
done
# Install HelixDB

helix --version

# Add HelixDB to PATH

echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
source ~/.zshrc

# Initialize HelixDB

helix init --path helixdb-cfg

# Move to the HelixDB directory

cd helixdb-cfg

# Deploy HelixDB

helix deploy --path .

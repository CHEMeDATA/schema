#!/bin/zsh

# Check if the required tools are installed
if ! command -v wget > /dev/null; then
  echo "wget is required but not installed. Please install wget."
  exit 1
fi

# Check if a JSON file is provided as an argument
if [ $# -ne 1 ]; then
  echo "Usage: $0 <json_file>"
  exit 1
fi

json_file="$1"

# Extract the schema URL from the JSON file
schema_url=$(grep -o '"\$schema":\s*"[^"]*"' "$json_file" | cut -d '"' -f 4)

# Check if $schema key is present
if [ -z "$schema_url" ]; then
  echo "The JSON file does not contain a schema reference."
  exit 1
fi

# Download the schema content
schema_content=$(wget -qO- "$schema_url")

# Print the schema content
echo "$schema_content"

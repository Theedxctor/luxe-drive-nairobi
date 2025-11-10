#!/bin/bash

# Exit on error
set -e

# Configuration
REMOTE_USER="keith_austine"
REMOTE_HOST="102.37.217.64"
REMOTE_KEY="~/.ssh/vps-lab_key.pem"
REMOTE_DIR="/var/www/html"
LOCAL_DIR="dist"

# Build the project
echo "🚀 Building the project..."
npm run build

# Create a temporary directory
echo "📦 Preparing files for deployment..."
TEMP_DIR=$(mktemp -d)
cp -r $LOCAL_DIR/* "$TEMP_DIR/"

# Create a backup of the current deployment
echo "💾 Creating backup of current deployment..."
ssh -i $REMOTE_KEY $REMOTE_USER@$REMOTE_HOST "mkdir -p ~/backups && \
  tar -czf ~/backups/luxe-drive-$(date +%Y%m%d%H%M%S).tar.gz -C $REMOTE_DIR ."

# Deploy new files
echo "🚀 Deploying files to server..."
scp -i $REMOTE_KEY -r "$TEMP_DIR/"* $REMOTE_USER@$REMOTE_HOST:~/dist/

# Move files to web directory
echo "🔄 Updating live site..."
ssh -i $REMOTE_KEY $REMOTE_USER@$REMOTE_HOST "sudo cp -r ~/dist/* $REMOTE_DIR/ && \
  sudo chown -R www-data:www-data $REMOTE_DIR && \
  sudo chmod -R 755 $REMOTE_DIR"

# Cleanup
echo "🧹 Cleaning up..."
rm -rf "$TEMP_DIR"
ssh -i $REMOTE_KEY $REMOTE_USER@$REMOTE_HOST "rm -rf ~/dist"

echo "✅ Deployment successful!"
echo "🌐 Visit your site at: https://luxedrivekenya.me"

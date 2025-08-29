#!/bin/bash

# 🚀 MusicVNDow - Auto Deploy Script
# Hỗ trợ deploy lên Vercel, Netlify, Railway, Render

set -e

echo "🎵 MusicVNDow - Auto Deploy Script"
echo "=========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if git is installed
check_git() {
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install git first."
        exit 1
    fi
    print_status "Git is installed"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    print_status "Node.js is installed (version: $(node --version))"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    print_status "npm is installed (version: $(npm --version))"
}

# Install dependencies
install_dependencies() {
    print_step "Installing dependencies..."
    npm install
    print_status "Dependencies installed successfully"
}

# Build project
build_project() {
    print_step "Building project..."
    # This is a static project, no build step needed
    print_status "Project ready for deployment"
}

# Initialize git repository
init_git() {
    if [ ! -d ".git" ]; then
        print_step "Initializing git repository..."
        git init
        git add .
        git commit -m "Initial commit: MusicVNDow"
        print_status "Git repository initialized"
    else
        print_status "Git repository already exists"
    fi
}

# Deploy to Vercel
deploy_vercel() {
    print_step "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    print_status "Starting Vercel deployment..."
    vercel --prod
    print_status "Vercel deployment completed!"
}

# Deploy to Netlify
deploy_netlify() {
    print_step "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    print_status "Starting Netlify deployment..."
    netlify deploy --prod --dir=public
    print_status "Netlify deployment completed!"
}

# Deploy to Railway
deploy_railway() {
    print_step "Deploying to Railway..."
    
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
    
    print_status "Starting Railway deployment..."
    railway login
    railway up
    print_status "Railway deployment completed!"
}

# Deploy to Render
deploy_render() {
    print_step "Deploying to Render..."
    print_warning "Render deployment requires manual setup:"
    echo "1. Go to https://render.com"
    echo "2. Create new Web Service"
    echo "3. Connect your GitHub repository"
    echo "4. Set build command: npm install"
    echo "5. Set start command: npm start"
    print_status "Please follow the manual steps above"
}

# Main deployment function
main() {
    local platform=$1
    
    print_status "Starting deployment process..."
    
    # Pre-deployment checks
    check_git
    check_node
    check_npm
    
    # Install dependencies
    install_dependencies
    
    # Build project
    build_project
    
    # Initialize git
    init_git
    
    # Deploy based on platform
    case $platform in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "railway")
            deploy_railway
            ;;
        "render")
            deploy_render
            ;;
        *)
            print_error "Invalid platform. Use: vercel, netlify, railway, or render"
            print_status "Available platforms:"
            echo "  - vercel: Deploy to Vercel (recommended)"
            echo "  - netlify: Deploy to Netlify"
            echo "  - railway: Deploy to Railway"
            echo "  - render: Deploy to Render"
            exit 1
            ;;
    esac
    
    print_status "Deployment completed successfully! 🎉"
}

# Show help
show_help() {
    echo "🎵 MusicVNDow - Deploy Script"
    echo ""
    echo "Usage: ./deploy.sh [platform]"
    echo ""
    echo "Platforms:"
    echo "  vercel   - Deploy to Vercel (recommended)"
    echo "  netlify  - Deploy to Netlify"
    echo "  railway  - Deploy to Railway"
    echo "  render   - Deploy to Render"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh vercel"
    echo "  ./deploy.sh netlify"
    echo ""
    echo "Note: Make sure you have the necessary accounts and CLI tools installed."
}

# Check if script is run with arguments
if [ $# -eq 0 ]; then
    show_help
    exit 0
fi

# Run main function with platform argument
main "$1"

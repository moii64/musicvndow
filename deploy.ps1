# 🚀 MusicVNDow - Auto Deploy Script (PowerShell)
# Hỗ trợ deploy lên Vercel, Netlify, Railway, Render

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("vercel", "netlify", "railway", "render")]
    [string]$Platform
)

# Colors for PowerShell
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$White = "White"

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

function Write-Step {
    param([string]$Message)
    Write-Host "[STEP] $Message" -ForegroundColor $Blue
}

# Header
Write-Host "🎵 MusicVNDow - Auto Deploy Script" -ForegroundColor $White
Write-Host "==========================================" -ForegroundColor $White
Write-Host ""

# Check if git is installed
function Test-Git {
    try {
        $null = git --version
        Write-Status "Git is installed"
        return $true
    }
    catch {
        Write-Error "Git is not installed. Please install git first."
        return $false
    }
}

# Check if Node.js is installed
function Test-Node {
    try {
        $nodeVersion = node --version
        Write-Status "Node.js is installed (version: $nodeVersion)"
        return $true
    }
    catch {
        Write-Error "Node.js is not installed. Please install Node.js first."
        return $false
    }
}

# Check if npm is installed
function Test-Npm {
    try {
        $npmVersion = npm --version
        Write-Status "npm is installed (version: $npmVersion)"
        return $true
    }
    catch {
        Write-Error "npm is not installed. Please install npm first."
        return $false
    }
}

# Install dependencies
function Install-Dependencies {
    Write-Step "Installing dependencies..."
    npm install
    Write-Status "Dependencies installed successfully"
}

# Build project
function Build-Project {
    Write-Step "Building project..."
    # This is a static project, no build step needed
    Write-Status "Project ready for deployment"
}

# Initialize git repository
function Initialize-Git {
    if (-not (Test-Path ".git")) {
        Write-Step "Initializing git repository..."
        git init
        git add .
        git commit -m "Initial commit: MusicVNDow"
        Write-Status "Git repository initialized"
    }
    else {
        Write-Status "Git repository already exists"
    }
}

# Deploy to Vercel
function Deploy-Vercel {
    Write-Step "Deploying to Vercel..."
    
    try {
        $null = vercel --version
    }
    catch {
        Write-Warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    }
    
    Write-Status "Starting Vercel deployment..."
    vercel --prod
    Write-Status "Vercel deployment completed!"
}

# Deploy to Netlify
function Deploy-Netlify {
    Write-Step "Deploying to Netlify..."
    
    try {
        $null = netlify --version
    }
    catch {
        Write-Warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    }
    
    Write-Status "Starting Netlify deployment..."
    netlify deploy --prod --dir=public
    Write-Status "Netlify deployment completed!"
}

# Deploy to Railway
function Deploy-Railway {
    Write-Step "Deploying to Railway..."
    
    try {
        $null = railway --version
    }
    catch {
        Write-Warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    }
    
    Write-Status "Starting Railway deployment..."
    railway login
    railway up
    Write-Status "Railway deployment completed!"
}

# Deploy to Render
function Deploy-Render {
    Write-Step "Deploying to Render..."
    Write-Warning "Render deployment requires manual setup:"
    Write-Host "1. Go to https://render.com" -ForegroundColor $White
    Write-Host "2. Create new Web Service" -ForegroundColor $White
    Write-Host "3. Connect your GitHub repository" -ForegroundColor $White
    Write-Host "4. Set build command: npm install" -ForegroundColor $White
    Write-Host "5. Set start command: npm start" -ForegroundColor $White
    Write-Status "Please follow the manual steps above"
}

# Main deployment function
function Start-Deployment {
    param([string]$Platform)
    
    Write-Status "Starting deployment process..."
    
    # Pre-deployment checks
    if (-not (Test-Git)) { exit 1 }
    if (-not (Test-Node)) { exit 1 }
    if (-not (Test-Npm)) { exit 1 }
    
    # Install dependencies
    Install-Dependencies
    
    # Build project
    Build-Project
    
    # Initialize git
    Initialize-Git
    
    # Deploy based on platform
    switch ($Platform) {
        "vercel" {
            Deploy-Vercel
        }
        "netlify" {
            Deploy-Netlify
        }
        "railway" {
            Deploy-Railway
        }
        "render" {
            Deploy-Render
        }
        default {
            Write-Error "Invalid platform: $Platform"
            Write-Status "Available platforms:"
            Write-Host "  - vercel: Deploy to Vercel (recommended)" -ForegroundColor $White
            Write-Host "  - netlify: Deploy to Netlify" -ForegroundColor $White
            Write-Host "  - railway: Deploy to Railway" -ForegroundColor $White
            Write-Host "  - render: Deploy to Render" -ForegroundColor $White
            exit 1
        }
    }
    
    Write-Status "Deployment completed successfully! 🎉"
}

# Show help
function Show-Help {
    Write-Host "🎵 MusicVNDow - Deploy Script" -ForegroundColor $White
    Write-Host ""
    Write-Host "Usage: .\deploy.ps1 -Platform [platform]" -ForegroundColor $White
    Write-Host ""
    Write-Host "Platforms:" -ForegroundColor $White
    Write-Host "  vercel   - Deploy to Vercel (recommended)" -ForegroundColor $White
    Write-Host "  netlify  - Deploy to Netlify" -ForegroundColor $White
    Write-Host "  railway  - Deploy to Railway" -ForegroundColor $White
    Write-Host "  render   - Deploy to Render" -ForegroundColor $White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor $White
    Write-Host "  .\deploy.ps1 -Platform vercel" -ForegroundColor $White
    Write-Host "  .\deploy.ps1 -Platform netlify" -ForegroundColor $White
    Write-Host ""
    Write-Host "Note: Make sure you have the necessary accounts and CLI tools installed." -ForegroundColor $White
}

# Check if platform parameter is provided
if (-not $Platform) {
    Show-Help
    exit 0
}

# Run deployment
Start-Deployment -Platform $Platform

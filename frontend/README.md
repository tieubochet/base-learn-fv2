# Base Learn Frontend

A modern React-based frontend application for interacting with smart contracts deployed on Base blockchain. This application provides an intuitive interface for contract deployment, wallet connection, and blockchain interactions.

## 🌟 Features

- **Wallet Integration**: Seamless connection with MetaMask and other Web3 wallets via RainbowKit
- **Contract Deployment**: Deploy smart contracts directly from the browser interface
- **Contract Interaction**: Read and write operations with deployed contracts
- **Base Blockchain Support**: Full integration with Base Sepolia testnet and mainnet
- **Modern UI**: Beautiful, responsive design with Tailwind CSS v4
- **Real-time Updates**: Live contract status and transaction monitoring

## 🛠️ Tech Stack

### Core Framework
- **React 19** - Latest React with concurrent features
- **Vite 7** - Lightning-fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript features

### Web3 Integration
- **RainbowKit 2.2.8** - Beautiful wallet connection UI
- **wagmi 2.17.2** - React hooks for Ethereum
- **ethers.js 6.15.0** - Ethereum library for blockchain interactions
- **viem 2.37.8** - TypeScript interface for Ethereum

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework with latest features
- **Gradient Backgrounds** - Modern dark theme with smooth gradients
- **Responsive Design** - Mobile-first responsive layouts

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Vite Dev Server** - Hot module replacement for fast development

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Web3 Wallet** (MetaMask recommended)
- **Base Sepolia ETH** for testing (get from faucet)

### Installation

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd base-learn-main/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173` (or next available port).

### Environment Setup

Create a `.env` file in the frontend directory:

```env
# Optional: Add any environment variables if needed
VITE_APP_NAME="Base Learn Frontend"
VITE_NETWORK="base-sepolia"
```

## 📱 Application Structure

### Components

#### Main Components
- **`App.jsx`** - Root application component with layout
- **`ContractDeployer.jsx`** - Main contract deployment interface
- **`ContractCard.jsx`** - Individual contract display cards
- **`OwnerChecker.jsx`** - Contract ownership verification

#### Layout Structure
```jsx
App
├── Header (with ConnectButton)
├── Main Content
│   └── ContractDeployer
│       ├── ContractCard components
│       └── OwnerChecker
└── Gradient Background
```

### File Structure
```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ContractCard.jsx
│   │   ├── ContractDeployer.jsx
│   │   └── OwnerChecker.jsx
│   ├── contracts/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code quality checks
```

## 🌐 Wallet Connection

The application uses **RainbowKit** for wallet connections, supporting:

- **MetaMask** - Browser extension wallet
- **WalletConnect** - Mobile wallet connections
- **Coinbase Wallet** - Coinbase's native wallet
- **Rainbow Wallet** - Mobile-first wallet
- **Other Web3 Wallets** - Various community wallets

### Network Configuration

The app is configured for:
- **Base Sepolia Testnet** (Chain ID: 84532)
- **Base Mainnet** (Chain ID: 8453)

## 🔗 Smart Contract Integration

### Contract Deployment
- Deploy contracts directly from the UI
- Real-time deployment status
- Transaction hash tracking
- Gas estimation and optimization

### Contract Interaction
- Read contract state
- Execute write functions
- Event listening
- Contract verification status

### Supported Contract Types
- **Basic Math Contracts** - Mathematical operations
- **Storage Contracts** - Data storage and retrieval
- **Token Contracts** - ERC20/ERC721 implementations
- **Custom Contracts** - Project-specific smart contracts

## 🎨 Styling Guide

### Design System
- **Color Scheme**: Dark theme with gradient backgrounds
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind utilities
- **Components**: Reusable styled components

### Tailwind Configuration
```css
/* Main gradient background */
bg-gradient-to-br from-slate-900 via-gray-950 to-black

/* Component styling */
border-slate-800    /* Subtle borders */
text-white         /* Primary text */
hover:bg-slate-800 /* Interactive states */
```

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Wallet Connection**
   - [ ] Connect MetaMask wallet
   - [ ] Switch to Base Sepolia network
   - [ ] Display correct address and balance

2. **Contract Deployment**
   - [ ] Select contract type
   - [ ] Deploy with correct parameters
   - [ ] Verify transaction success
   - [ ] Display contract address

3. **Contract Interaction**
   - [ ] Read contract data
   - [ ] Execute write functions
   - [ ] Handle transaction confirmations
   - [ ] Display error states

### Browser Compatibility
- **Chrome/Chromium** ✅
- **Firefox** ✅
- **Safari** ✅
- **Edge** ✅

## 🚀 Deployment

### Build for Production

```bash
# Create optimized build
npm run build

# Preview build locally
npm run preview
```

### Deploy to Hosting Services

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Build and upload dist folder
npm run build
# Upload dist/ folder to Netlify
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Deploy
npm run build && npm run deploy
```

## 🔍 Troubleshooting

### Common Issues

**Wallet not connecting:**
- Ensure wallet extension is installed and unlocked
- Check if on correct network (Base Sepolia)
- Clear browser cache and reload

**Transactions failing:**
- Verify sufficient ETH balance for gas fees
- Check if contract addresses are correct
- Ensure wallet is connected to Base network

**Styling issues:**
- Restart development server
- Clear browser cache
- Check Tailwind CSS import in index.css

**Build errors:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Development Tips

1. **Hot Reload**: Vite provides instant hot reload for faster development
2. **DevTools**: Use React DevTools for component debugging
3. **Network Tab**: Monitor blockchain transactions in browser DevTools
4. **Console Logs**: Check browser console for Web3 interaction details

## 🔐 Security Considerations

- **Private Keys**: Never expose private keys in frontend code
- **Environment Variables**: Use VITE_ prefix for public variables only
- **Contract Verification**: Always verify contract addresses before interaction
- **Wallet Permissions**: Be cautious with wallet permission requests
- **HTTPS**: Always deploy on HTTPS in production

## 📚 Learning Resources

### Web3 Development
- [wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Docs](https://rainbowkit.com/)
- [ethers.js Documentation](https://docs.ethers.org/)

### React & Vite
- [React 19 Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS v4](https://tailwindcss.com/)

### Base Blockchain
- [Base Documentation](https://docs.base.org/)
- [Base Sepolia Faucet](https://bridge.base.org/)
- [BaseScan Explorer](https://basescan.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Follow ESLint configuration
- Use functional components with hooks
- Implement responsive design with Tailwind
- Add proper error handling for Web3 interactions

## 📄 License

This project is licensed under the MIT License - see the main project LICENSE file for details.

## 🆘 Support

For issues and questions:
- Check the main project README
- Open an issue with detailed description
- Include browser console errors
- Specify wallet and network used

---

**Ready to build on Base! 🚀**

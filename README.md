![Shōgun DeFAI Super Vaults](header.gif)


# Shōgun: DeFAI Super Vaults

A decentralized finance (DeFi) vault system with an AI agent managing asset allocation and investment strategies. This project demonstrates the integration of artificial intelligence with blockchain technology to create an automated, intelligent investment platform on Sonic mainnet.

## Overview

This DeFi vault system leverages artificial intelligence to:

- Optimize asset allocation strategies across multiple protocols
- Monitor market conditions and protocol performance in real-time
- Execute trades based on yield optimization parameters
- Manage risk through dynamic portfolio rebalancing with Allora Network
- Facilitate cross-chain strategies via deBridge integration
- Secure multi-signature transactions through Safe

## Live Deployment

Shōgun is currently live on Sonic mainnet with two active DeFi strategies that are automatically allocating capital based on AI-driven analysis.

**Live Demo:** [https://vault-web-eta.vercel.app/](https://vault-web-eta.vercel.app/)

### Repositories

* **AI Strategy Manager:** [strategies-ai-sonic](https://github.com/lausuarez02/strategies-ai-sonic/)
* **Agent Implementation:** [strategies-agent-sonic](https://github.com/lausuarez02/strategies-agent-sonic/)
* **Smart Contracts AI:** [strategies-contracts-sonic](https://github.com/lausuarez02/strategies-contracts-sonic/)
* **Smart Contracts Investing:** [contracts-sonic](https://github.com/lausuarez02/strategies-contracts-sonic/](https://github.com/tomi204/vaults-hackathon/)

## Tech Stack

### Frontend

- **Next.js 15** - React framework for production
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component system
- **Studiofreight Hamo** - Animation libraries
- **Lenis scroll** - Smooth scrolling
- **Spline 3D** - 3D objects rendering
- **RainbowKit** - Wallet connection interface
- **Wagmi** - React Hooks for Ethereum

### Blockchain & Security

- **Safe** (formerly Gnosis Safe) - Multi-signature wallet infrastructure
- **Viem** - TypeScript Ethereum library
- **Sonic Mainnet** - Deployment chain
- **USDC.e** - Stablecoin integration

### Safe Integration

- **@safe-global/safe-core-sdk** - Core Safe functionality
- **@safe-global/safe-ethers-lib** - Safe Ethereum library
- **@safe-global/sdk-starter-kit** - Safe development toolkit

### Partner Integrations

- **deBridge** - Cross-chain transaction execution
- **Allora Network** - Decentralized intelligence for risk assessment

### AI/ML Components

- Custom AI agent (Shōgun Council) for:
  - Market analysis
  - Protocol risk profiling
  - Yield optimization
  - Cross-chain strategy execution

## Key Features

- **SuperVaults**: Specialized liquidity pools that aggregate user deposits and prepare them for deployment
- **AI-Driven Strategy**: Automated investment decisions based on real-time yield and risk analysis
- **User Dashboard**: Real-time portfolio monitoring and performance tracking
- **Automated Rebalancing**: AI-managed portfolio adjustments for optimal yields
- **Risk Management**: Dynamic risk assessment and mitigation with Allora Network
- **Multi-signature Security**: Safe integration for secure transaction approval
- **Gas-Optimized Execution**: Transactions only execute when yield improvements exceed gas costs
- **Protocol-Agnostic Architecture**: Compatible with lending markets, AMMs, liquid staking, and more

## Market Position

Shōgun uniquely occupies the high-yield + passive management quadrant in the DeFi landscape:
- Delivers Morpho-level yields with Superform-level passivity
- Combines the best of active management returns with passive user experience
- Uses AI to bridge the gap between yield and convenience

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Safe Integration

Our vault system utilizes Safe's multi-signature infrastructure to:

- Secure high-value transactions
- Implement time-locks for significant changes
- Enable collective governance
- Manage access control

Key features include:

1. **Multi-signature Transactions**
   - Required multiple approvals for large transactions
   - Configurable threshold settings
   - Transaction queue management

2. **Access Control**
   - Role-based permissions
   - Granular control over vault operations
   - Admin management

3. **Transaction Guards**
   - Custom validation rules
   - Transaction limits
   - Automated security checks

## AI Agent Architecture

The Shōgun Council is our sophisticated AI agent that:

1. **Market Analysis**
   - Processes on-chain data and market trends
   - Identifies yield opportunities across protocols
   - Evaluates protocol risk with Allora Network
   - Analyzes market sentiment

2. **Portfolio Management**
   - Optimizes asset allocation for maximum yield
   - Executes rebalancing strategies when profitable
   - Manages risk exposure across various strategies
   - Facilitates cross-chain capital movement

3. **Performance Monitoring**
   - Tracks investment performance in real-time
   - Generates performance reports
   - Adjusts strategies based on results
   - Continuously improves through machine learning

## Smart Contract Integration

The vault system interacts with multiple smart contracts to:
- Handle deposits and withdrawals of USDC.e
- Issue vault shares representing user stakes
- Execute trades across protocols
- Manage dynamic asset allocation
- Track user positions and performance

## Security

- Multi-signature transaction approval
- Modular vault design for strategy isolation
- Automated security monitoring
- Regular security assessments
- Time-locked operations for critical changes

## Governance: The Ronin Council

The AI Ronin Council is our governance framework that allows users to:
- Propose new investment strategies
- Vote on protocol parameters
- Participate in strategic decisions
- Earn rewards for successful strategy contributions

## Roadmap

- Expansion to additional L1/L2 networks
- Specialized vaults for different asset classes
- Enhanced AI models with additional data sources
- Advanced governance framework for the Shōgun AI Council

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Sonic Labs Documentation](https://docs.soniclabs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [RainbowKit](https://www.rainbowkit.com/)
- [Wagmi Hooks](https://wagmi.sh/)
- [Safe Documentation](https://docs.safe.global/)
- [deBridge Documentation](https://docs.debridge.finance/)
- [Allora Network Documentation](https://docs.allora.network/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Join the Community

Join the AI Ronin Council. Propose strategies. Stake your honor. Maximize yield.

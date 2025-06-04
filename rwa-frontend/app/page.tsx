'use client';

import { useEffect } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { useContractStore } from '@/stores/contract';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Coins, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { formatTokenAmount, formatCurrency, formatPercentage } from '@/lib/stellar';
import Link from 'next/link';
import { SAMPLE_PROJECTS } from '@/lib/contract';

export default function Dashboard() {
  const { isConnected, address, checkConnection } = useWalletStore();
  const { 
    assetMetadata, 
    userBalance, 
    isWhitelisted, 
    compliance,
    isLoading,
    fetchContractData,
    fetchUserData 
  } = useContractStore();

  // Check wallet connection and fetch data on mount
  useEffect(() => {
    checkConnection();
    fetchContractData();
  }, [checkConnection, fetchContractData]);

  // Fetch user data when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      fetchUserData(address);
    }
  }, [isConnected, address, fetchUserData]);

  // Calculate total portfolio value
  const totalPortfolioValue = SAMPLE_PROJECTS.reduce((sum, project) => 
    sum + project.financial.current_funding, 0
  );

  // Calculate active projects
  const activeProjects = SAMPLE_PROJECTS.length;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] space-y-8">
            <div className="text-center space-y-4 max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight">
                Real World Asset Investment Platform
              </h1>
              <p className="text-xl text-muted-foreground">
                Access tokenized real estate, commodities, and other physical assets 
                through compliant blockchain technology on Stellar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <Card className="text-center">
                <CardHeader>
                  <Building2 className="h-12 w-12 mx-auto text-primary" />
                  <CardTitle className="text-lg">Tokenized Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Invest in premium real estate and other assets through blockchain tokens
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
                  <CardTitle className="text-lg">Compliant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    KYC verification and regulatory compliance built into every transaction
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 mx-auto text-blue-600" />
                  <CardTitle className="text-lg">High Yield</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Earn passive income through rental yields and asset appreciation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome to RWA Investor</h1>
            <p className="text-lg text-muted-foreground">
              Your gateway to tokenized real world assets
            </p>
          </div>

          {/* Research Dashboard */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Research Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Your scientific research portfolio overview
            </p>
          </div>

          {/* Metrics Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Research Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${totalPortfolioValue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total funded research
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects}</div>
                <p className="text-xs text-muted-foreground">
                  Ongoing research
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Research Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">High</div>
                <p className="text-xs text-muted-foreground">
                  Based on citations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Ethics Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Compliant</div>
                <p className="text-xs text-muted-foreground">
                  All checks passed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Current Asset */}
          {assetMetadata && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{assetMetadata.name}</CardTitle>
                    <CardDescription className="text-base">
                      {assetMetadata.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {assetMetadata.asset_type.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Valuation</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(formatTokenAmount(assetMetadata.valuation, 7))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Your Share</p>
                    <p className="text-2xl font-bold">
                      {((parseFloat(formatTokenAmount(userBalance)) / 2500) * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Token Symbol</p>
                    <p className="text-2xl font-bold font-mono">{assetMetadata.symbol}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button asChild>
                    <Link href="/transfer">
                      Transfer Tokens
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/marketplace">
                      View More Assets
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-24">
              <div className="flex flex-col items-center">
                <span className="text-lg">🔬</span>
                <span>Explore Projects</span>
              </div>
            </Button>
            <Button variant="outline" className="h-24">
              <div className="flex flex-col items-center">
                <span className="text-lg">📊</span>
                <span>Research Analytics</span>
              </div>
            </Button>
            <Button variant="outline" className="h-24">
              <div className="flex flex-col items-center">
                <span className="text-lg">🧪</span>
                <span>Tokenize Research</span>
              </div>
            </Button>
            <Button variant="outline" className="h-24">
              <div className="flex flex-col items-center">
                <span className="text-lg">💼</span>
                <span>Portfolio</span>
              </div>
            </Button>
          </div>

          {/* Recent Projects */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SAMPLE_PROJECTS.slice(0, 3).map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.asset_type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span>{Math.round((project.financial.current_funding / project.financial.funding_goal) * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Phase</span>
                        <span>{project.asset_details.research_phase}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

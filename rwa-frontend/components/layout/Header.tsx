'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useWalletStore } from '@/stores/wallet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Wallet, 
  Network, 
  Settings, 
  LogOut,
  ExternalLink,
  Copy,
  ChevronDown 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { truncateAddress, getExplorerUrl } from '@/lib/stellar';
import { toast } from 'sonner';

export function Header() {
  const {
    isConnected,
    address,
    balance,
    network,
    isLoading,
    connect,
    disconnect,
    switchNetwork,
    checkConnection
  } = useWalletStore();

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully');
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info('Wallet disconnected');
  };

  const handleNetworkSwitch = async (newNetwork: 'testnet' | 'mainnet') => {
    if (newNetwork === network) return;
    
    try {
      await switchNetwork(newNetwork);
      toast.success(`Switched to ${newNetwork}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Failed to switch to ${newNetwork}`;
      
      // Check if this is a manual switch required error
      if (errorMessage.includes('Please switch to')) {
        toast.error(errorMessage, {
          duration: 6000, // Show longer for important instructions
        });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  const openInExplorer = () => {
    if (address) {
      window.open(getExplorerUrl(address, 'account', network), '_blank');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="font-bold">SciInvest Lab</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">Research Dashboard</Link>
            <Link href="/marketplace" className="transition-colors hover:text-foreground/80">Project Marketplace</Link>
            <Link href="/tokenize" className="transition-colors hover:text-foreground/80">Tokenize Research</Link>
            <Link href="/transfer" className="transition-colors hover:text-foreground/80">Share Transfer</Link>
          </nav>
        </div>

        {/* Wallet Section */}
        <div className="flex items-center gap-3">
          {/* Network Selector */}
          {isConnected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Network className="h-4 w-4" />
                  <Badge variant={network === 'testnet' ? 'secondary' : 'default'}>
                    {network}
                  </Badge>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => handleNetworkSwitch('testnet')}
                  className={network === 'testnet' ? 'bg-muted' : ''}
                >
                  <Network className="h-4 w-4 mr-2" />
                  Testnet
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleNetworkSwitch('mainnet')}
                  className={network === 'mainnet' ? 'bg-muted' : ''}
                >
                  <Network className="h-4 w-4 mr-2" />
                  Mainnet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Wallet Connection */}
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 max-w-48">
                  <Wallet className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-mono text-sm">
                      {truncateAddress(address || '')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {parseFloat(balance).toFixed(2)} XLM
                    </div>
                  </div>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <div className="text-sm font-medium">Connected Wallet</div>
                  <div className="font-mono text-xs text-muted-foreground break-all">
                    {address}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={copyAddress}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openInExplorer}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View in Explorer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={handleConnect} 
              disabled={isLoading}
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
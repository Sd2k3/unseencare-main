
import { useEffect } from 'react';
import { AccountInfo } from '@/components/AccountInfo';
import { AdvancedQRScanner } from '@/components/AdvancedQRScanner';
import { TransactionsList } from '@/components/TransactionsList';
import { NetworkStatus } from '@/components/NetworkStatus';
import { useNetworkStatus } from '@/utils/networkStatus';
import { getAccountPublicKey } from '@/utils/localStorage';
import { processPendingTransactions } from '@/utils/stellarOperations';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Settings, Wallet, ScanLine, History } from 'lucide-react';

const Index = () => {
  const { isOnline } = useNetworkStatus();

  // Monitor network status and process pending transactions when online
  useEffect(() => {
    const handleNetworkReconnection = async () => {
      if (!isOnline) return;

      const publicKey = getAccountPublicKey();
      if (!publicKey) return;

      console.log('Network is online, checking for pending transactions to process automatically...');
      
      // Use the processPendingTransactions function from stellarOperations
      await processPendingTransactions(publicKey);
    };

    // Only process if we just came online (not on initial load)
    const timeoutId = setTimeout(() => {
      handleNetworkReconnection();
    }, 2000); // Delay to ensure network is stable

    return () => clearTimeout(timeoutId);
  }, [isOnline]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Stellar Wallet</h1>
                <p className="text-blue-100 text-sm">Secure & Simple</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <NetworkStatus />
              <Link 
                to="/settings" 
                className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-105"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-6 py-6">        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg border-0 p-1 rounded-2xl">
            <TabsTrigger 
              value="account" 
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger 
              value="scan"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              <ScanLine className="h-4 w-4" />
              <span className="hidden sm:inline">Scan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="transactions"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-gray-100">
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-600" />
                  Account Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  View your Stellar account details and balance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AccountInfo />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scan" className="mt-6">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <AdvancedQRScanner />
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-b border-gray-100">
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <History className="h-5 w-5 text-purple-600" />
                  Transaction History
                </CardTitle>
                <CardDescription className="text-gray-600">
                  View and manage your recent transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <TransactionsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

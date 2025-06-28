import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPendingTransactions, updateTransactionStatus } from '@/utils/localStorage';
import { PendingTransaction } from '@/types/stellar';
import { Check, ArrowUp, ArrowDown, Clock, Info, Link as LinkIcon, Filter, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { useSecureTransaction } from '@/contexts/SecureTransactionContext';
import { getActiveAccount } from '@/utils/accountStorage';
import { toast } from '@/components/ui/sonner';

const getExplorerUrl = (txHash: string) =>
  `https://testnet.steexp.com/tx/${txHash}`;

const pastelGradient = "bg-gradient-to-r from-[#E5DEFF] via-[#D3E4FD] to-[#FDE1D3]";

export const TransactionsList = () => {
  const [transactions, setTransactions] = useState<PendingTransaction[]>([]);
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  const [lastLoaded, setLastLoaded] = useState<number>(Date.now());
  const [retryingTx, setRetryingTx] = useState<string | null>(null);

  const [filterStatus, setFilterStatus] = useState<'all'|'pending'|'completed'|'failed'>('all');
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 999999]);
  const [dateRange, setDateRange] = useState<[string, string]>(['','']);

  const { signAndSendTransaction } = useSecureTransaction();

  useEffect(() => {
    const loadTransactions = () => {
      const pendingTx = getPendingTransactions();
      setTransactions(pendingTx);
      setLastLoaded(Date.now());
    };

    loadTransactions();
    const interval = setInterval(loadTransactions, 5000);
    window.addEventListener('storage', loadTransactions);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', loadTransactions);
    };
  }, []);

  const handleRetryTransaction = async (transaction: PendingTransaction) => {
    const activeAccount = getActiveAccount();
    if (!activeAccount || !activeAccount.publicKey) {
      toast.error('No active account found', {
        description: 'Please select an account first',
        duration: 3000
      });
      return;
    }

    // Check if the account has a stored private key
    if (!activeAccount.hasStoredKey) {
      toast.error('No private key stored for this account', {
        description: 'Please import your private key in Settings first',
        duration: 5000
      });
      return;
    }

    setRetryingTx(transaction.id);
    
    try {
      toast.info('Retrying transaction...', {
        description: `${transaction.amount} XLM to ${transaction.destination.substring(0, 8)}...`,
        duration: 3000
      });

      console.log('Attempting to retry transaction:', {
        id: transaction.id,
        amount: transaction.amount,
        destination: transaction.destination.substring(0, 8) + '...',
        hasStoredKey: activeAccount.hasStoredKey
      });

      const result = await signAndSendTransaction(
        activeAccount.publicKey,
        transaction.destination,
        transaction.amount,
        transaction.memo
      );

      console.log('Retry transaction result:', result);

      if (result.success && result.txHash) {
        updateTransactionStatus(transaction.id, 'completed', result.txHash);
        toast.success('Transaction completed successfully!', {
          description: `Hash: ${result.txHash.substring(0, 8)}...`,
          duration: 5000
        });
      } else {
        updateTransactionStatus(transaction.id, 'failed');
        
        // Provide more specific error messages
        let errorMessage = 'Transaction failed';
        let errorDescription = result.error || 'Unknown error occurred';
        
        if (result.error?.includes('private key') || result.error?.includes('Private key')) {
          errorMessage = 'Private key access failed';
          errorDescription = 'Please check your PIN and ensure your private key is properly stored';
        } else if (result.error?.includes('cancelled')) {
          errorMessage = 'Transaction cancelled';
          errorDescription = 'Transaction was cancelled by user';
        }
        
        toast.error(errorMessage, {
          description: errorDescription,
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Retry transaction error:', error);
      updateTransactionStatus(transaction.id, 'failed');
      
      let errorMessage = 'Retry failed';
      let errorDescription = 'Unknown error';
      
      if (error instanceof Error) {
        errorDescription = error.message;
        if (error.message.includes('private key') || error.message.includes('Private key')) {
          errorMessage = 'Private key access denied';
          errorDescription = 'Unable to access your private key. Please check your PIN.';
        }
      }
      
      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000
      });
    } finally {
      setRetryingTx(null);
    }
  };

  const DebugStatus = () => (
    <div className="mb-4 flex flex-col items-center gap-2 p-2 bg-white/60 rounded shadow border border-gray-100">
      <span className="flex items-center gap-2">
        <Info className="h-4 w-4 text-gray-400" />
        <Badge className="bg-gray-200">
          Loaded <b className="mx-1">{transactions.length}</b> transaction{transactions.length === 1 ? '' : 's'} from localStorage
        </Badge>
      </span>
      <span className="text-[11px] text-gray-400 font-mono">
        Last refreshed: <span className="bg-gray-900 text-white px-1 rounded">{new Date(lastLoaded).toLocaleTimeString()}</span>
      </span>
      <span className="text-[11px] text-gray-400">
        Transactions update automatically every 5 seconds & when localStorage changes.
      </span>
    </div>
  );

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    if(filterStatus !== 'all') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }
    filtered = filtered.filter(t => {
      const amt = parseFloat(t.amount || '0');
      return amt >= amountRange[0] && amt <= amountRange[1];
    });
    if(dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(t =>
        t.timestamp >= new Date(dateRange[0]).getTime() &&
        t.timestamp <= new Date(dateRange[1]).getTime() + 86400000
      );
    }
    return filtered;
  }, [transactions, filterStatus, amountRange, dateRange]);

  const FilterBar = () => (
    <div className={`rounded-xl px-3 py-2 mb-4 flex flex-wrap items-center gap-4 shadow-sm ${pastelGradient}`}>
      <span className="flex items-center gap-1 font-semibold text-gray-700">
        <Filter className="h-4 w-4" /> Filter:
      </span>
      <select
        className="rounded px-2 py-1 border bg-white shadow-sm outline-none text-sm font-medium"
        value={filterStatus}
        onChange={e => setFilterStatus(e.target.value as any)}
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>
      <span className="text-xs text-gray-600 font-semibold">Amount</span>
      <input type="number" placeholder="Min" min={0} max={amountRange[1]} value={amountRange[0]}
        className="w-14 rounded px-1 py-1 border bg-white" onChange={e => setAmountRange([+e.target.value, amountRange[1]])}
      />
      <span>-</span>
      <input type="number" placeholder="Max" min={amountRange[0]} value={amountRange[1]}
        className="w-14 rounded px-1 py-1 border bg-white" onChange={e => setAmountRange([amountRange[0], +e.target.value])}
      />
      <span className="text-xs text-gray-600 font-semibold">Date</span>
      <input type="date" value={dateRange[0]}
        className="rounded px-1 py-1 border bg-white" onChange={e => setDateRange([e.target.value, dateRange[1]])}
      />
      <span>-</span>
      <input type="date" value={dateRange[1]}
        className="rounded px-1 py-1 border bg-white" onChange={e => setDateRange([dateRange[0], e.target.value])}
      />
      <Button variant="outline" size="sm"
        className="ml-2 px-3 py-1 rounded-md border border-gray-200 font-medium bg-white/70 hover:bg-pastel-pink"
        onClick={()=>{setFilterStatus('all'); setAmountRange([0,999999]); setDateRange(['','']);}}
      >Reset</Button>
    </div>
  );

  const toggleExpand = (id: string) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  const getStatusBadge = (status: 'pending' | 'completed' | 'failed') => {
    if (status === 'completed') {
      return (
        <Badge variant="default" className="bg-green-500 text-white flex items-center gap-1">
          <Check className="h-3 w-3" />
          Confirmed on Blockchain
        </Badge>
      );
    }
    if (status === 'pending') {
      return (
        <Badge variant="secondary" className="bg-yellow-400 text-gray-900">
          Pending
        </Badge>
      );
    }
    return (
      <Badge variant="destructive" className="bg-red-500 text-white">
        Failed
      </Badge>
    );
  };

  if (transactions.length === 0) {
    return (
      <div>
        <DebugStatus />
        <FilterBar />
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No transactions yet</p>
          <p className="text-xs mt-2">Transactions will appear here once you make them</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DebugStatus />
      <FilterBar />
      {filteredTransactions.length === 0 ?
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No transactions match your filters</p>
        </div>
      :
      <div className="space-y-4">
        {filteredTransactions.map(transaction => (
          <Collapsible 
            key={transaction.id} 
            open={expandedTransaction === transaction.id}
            onOpenChange={() => toggleExpand(transaction.id)}
            className={`p-3 rounded-lg border ${
              transaction.status === 'completed' ? 'bg-green-50 border-green-100' : 
              transaction.status === 'failed' ? 'bg-red-50 border-red-100' : 
              'bg-yellow-50 border-yellow-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {transaction.status === 'completed' ? (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                ) : transaction.status === 'pending' ? (
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <ArrowUp className="h-4 w-4 text-yellow-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <ArrowDown className="h-4 w-4 text-red-600" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(transaction.status)}
                    {(transaction.status === 'pending' || transaction.status === 'failed') && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 text-xs flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRetryTransaction(transaction);
                        }}
                        disabled={retryingTx === transaction.id}
                      >
                        <RotateCcw className={`h-3 w-3 ${retryingTx === transaction.id ? 'animate-spin' : ''}`} />
                        {retryingTx === transaction.id ? 'Retrying...' : 'Retry'}
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{transaction.amount} XLM</p>
                <p className="text-xs text-gray-500 truncate max-w-[140px]">
                  To: {transaction.destination.substring(0, 10)}...
                </p>
              </div>
            </div>
            
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2 flex items-center justify-center gap-1 p-1 h-6"
              >
                <Info className="h-3 w-3" />
                <span className="text-xs">
                  {expandedTransaction === transaction.id ? "Hide details" : "View details"}
                </span>
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-3 pt-3 border-t border-gray-200 space-y-2">
              <div>
                <p className="text-xs font-medium">Full Destination Address</p>
                <p className="text-xs break-all bg-white/50 p-1 rounded">
                  {transaction.destination}
                </p>
              </div>
              
              {transaction.memo && (
                <div>
                  <p className="text-xs font-medium">Memo</p>
                  <p className="text-xs p-1">{transaction.memo}</p>
                </div>
              )}
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Transaction ID:</span>
                <span>{transaction.id}</span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Date:</span>
                <span>{new Date(transaction.timestamp).toLocaleString()}</span>
              </div>

              {transaction.status === 'completed' && transaction.txHash && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-200 text-green-800 flex items-center gap-1" variant="outline">
                    <Check className="h-3 w-3" /> Blockchain Confirmed
                  </Badge>
                  <a
                    href={getExplorerUrl(transaction.txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-700 hover:underline pl-2"
                  >
                    <LinkIcon className="w-4 h-4" />
                    <span>View on Explorer</span>
                  </a>
                </div>
              )}

              {transaction.qrFormat && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">QR Format:</span>
                  <Badge variant="outline" className="text-[10px] h-4 capitalize">
                    {transaction.qrFormat}
                  </Badge>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      }
    </div>
  );
};

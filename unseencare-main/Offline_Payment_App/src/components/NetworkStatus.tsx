
import { useNetworkStatus } from '@/utils/networkStatus';
import { Wifi, WifiOff, Clock, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { getPendingTransactions } from '@/utils/localStorage';

export const NetworkStatus = ({ showTimestamp = false }: { showTimestamp?: boolean }) => {
  const { isOnline, lastChecked } = useNetworkStatus();
  const [prevStatus, setPrevStatus] = useState<boolean | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  
  useEffect(() => {
    // Update transaction counts
    const updateTransactionCounts = () => {
      const allTxs = getPendingTransactions();
      const pendingTxs = allTxs.filter(tx => tx.status === 'pending');
      const completedTxs = allTxs.filter(tx => tx.status === 'completed');
      
      setPendingCount(pendingTxs.length);
      setCompletedCount(completedTxs.length);
    };

    updateTransactionCounts();
    const interval = setInterval(updateTransactionCounts, 2000);
    window.addEventListener('storage', updateTransactionCounts);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', updateTransactionCounts);
    };
  }, []);

  useEffect(() => {
    // Only notify on network status change after initial load
    if (prevStatus !== null && prevStatus !== isOnline) {
      // Check notification preferences
      try {
        const prefsJson = localStorage.getItem('stellar_notification_preferences');
        const prefs = prefsJson ? JSON.parse(prefsJson) : { networkStatusChange: true };
        
        if (prefs.networkStatusChange) {
          if (isOnline) {
            if (pendingCount > 0) {
              toast.success('Network connection restored', {
                description: `Automatically processing ${pendingCount} pending transaction${pendingCount > 1 ? 's' : ''}...`,
                duration: 5000
              });
            } else {
              toast.success('Network connection restored', {
                description: 'Ready to process transactions',
                duration: 3000
              });
            }
          } else {
            toast.warning('Network connection lost', {
              description: 'Transactions will be saved offline and processed when back online',
              duration: 5000
            });
          }
        }
      } catch (error) {
        console.error('Failed to check notification preferences:', error);
      }
    }
    
    setPrevStatus(isOnline);
  }, [isOnline, prevStatus, pendingCount]);
  
  const lastCheckedText = showTimestamp && lastChecked ? 
    `Last checked: ${formatDistanceToNow(lastChecked, { addSuffix: true })}` : 
    '';

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
      isOnline 
        ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
        : 'bg-red-500/20 text-red-100 border border-red-400/30'
    }`}>
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4" />
          <span>Online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          <span>Offline</span>
        </>
      )}
      
      {/* Show pending transaction count when offline */}
      {!isOnline && pendingCount > 0 && (
        <div className="flex items-center gap-1 ml-1 px-2 py-1 bg-yellow-400/30 text-yellow-100 rounded-lg text-xs border border-yellow-400/40">
          <Clock className="h-3 w-3" />
          <span>{pendingCount}</span>
        </div>
      )}
      
      {/* Show completed transactions when online */}
      {isOnline && completedCount > 0 && (
        <div className="flex items-center gap-1 ml-1 px-2 py-1 bg-green-400/30 text-green-100 rounded-lg text-xs border border-green-400/40">
          <CheckCircle className="h-3 w-3" />
          <span>{completedCount}</span>
        </div>
      )}
      
      {lastCheckedText && (
        <span className="text-xs opacity-75">
          {lastCheckedText}
        </span>
      )}
    </div>
  );
};

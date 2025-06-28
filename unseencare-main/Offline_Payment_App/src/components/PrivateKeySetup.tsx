
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import { storePrivateKey } from '@/utils/accountStorage';

interface PrivateKeySetupProps {
  open: boolean;
  publicKey: string;
  accountName: string;
  onClose: () => void;
  onComplete: () => void;
}

export const PrivateKeySetup: React.FC<PrivateKeySetupProps> = ({
  open,
  publicKey,
  accountName,
  onClose,
  onComplete,
}) => {
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (isLoading) {
      console.log('Already processing, ignoring duplicate call');
      return;
    }

    if (!privateKey.startsWith('S') || privateKey.length < 56) {
      toast.error('Invalid Stellar private key format', {
        description: 'Private key must start with "S" and be at least 56 characters long'
      });
      return;
    }

    setIsLoading(true);
    console.log('🔐 Starting private key storage process...');
    console.log('📋 Account details:', { publicKey, accountName, privateKeyLength: privateKey.length });
    
    try {
      console.log('💾 Attempting to store private key...');
      
      const success = await storePrivateKey(publicKey, privateKey);
      console.log('📊 Storage operation result:', success);
      
      if (success) {
        console.log('🎉 Private key stored successfully!');
        
        // Show success notifications
        toast.success('🔐 Private Key Secured!', {
          description: `Private key for "${accountName}" has been stored securely.`,
          duration: 4000
        });
        
        setTimeout(() => {
          toast.success('🔗 Account Linked', {
            description: `Account "${accountName}" is now ready for secure transaction signing.`,
            duration: 3000
          });
        }, 1000);
        
        // Complete the setup
        setTimeout(() => {
          console.log('🏁 Completing setup process...');
          onComplete();
          handleClose();
        }, 2000);
      } else {
        console.error('❌ Storage failed: storePrivateKey returned false');
        toast.error('Storage Failed', {
          description: 'Failed to store private key securely. Please try again.'
        });
      }
    } catch (error) {
      console.error('💥 Unexpected error in handleSubmit:', error);
      toast.error('Storage Error', {
        description: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [privateKey, publicKey, accountName, isLoading, onComplete]);

  const handleClose = () => {
    if (isLoading) {
      console.log('⏳ Cannot close while operation in progress');
      return;
    }
    setPrivateKey('');
    setShowPrivateKey(false);
    onClose();
  };

  const handleSkip = () => {
    if (isLoading) {
      console.log('⏳ Cannot skip while operation in progress');
      return;
    }
    toast.info('Private Key Skipped', {
      description: `Account "${accountName}" added successfully. You can add the private key later in Settings.`
    });
    onComplete();
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={!isLoading ? handleClose : undefined}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Secure Private Key - {accountName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Optional but recommended</p>
                <p>Store your private key to sign transactions directly from the app.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Account: {accountName}</Label>
            <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
              {publicKey.substring(0, 8)}...{publicKey.substring(publicKey.length - 8)}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="privateKey">Stellar Private Key (Secret Key)</Label>
            <div className="relative">
              <Input
                id="privateKey"
                type={showPrivateKey ? 'text' : 'password'}
                placeholder="S..."
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="pr-10"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                disabled={isLoading}
              >
                {showPrivateKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Your private key will be stored securely in your browser
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="flex-1"
              disabled={isLoading}
            >
              Skip for now
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!privateKey || isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Storing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Store Securely
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

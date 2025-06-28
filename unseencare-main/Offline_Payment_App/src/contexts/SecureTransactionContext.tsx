
import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as StellarSdk from 'stellar-sdk';
import { toast } from '@/components/ui/sonner';
import { retrievePrivateKey } from '@/utils/accountStorage';
import { BlockchainTransactionResult } from '@/types/stellar';

interface SecureTransactionContextType {
  signAndSendTransaction: (
    publicKey: string,
    destination: string,
    amount: string,
    memo?: string
  ) => Promise<BlockchainTransactionResult>;
  isProcessing: boolean;
}

const SecureTransactionContext = createContext<SecureTransactionContextType | undefined>(undefined);

export const useSecureTransaction = () => {
  const context = useContext(SecureTransactionContext);
  if (context === undefined) {
    throw new Error('useSecureTransaction must be used within a SecureTransactionProvider');
  }
  return context;
};

interface SecureTransactionProviderProps {
  children: ReactNode;
}

// Network to use (test network for development, public for production)
const NETWORK = StellarSdk.Networks.TESTNET;
// Server for Horizon API
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

export const SecureTransactionProvider = ({ children }: SecureTransactionProviderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Sign and send a transaction directly (no PIN authentication)
  const signAndSendTransaction = async (
    publicKey: string,
    destination: string,
    amount: string,
    memo?: string
  ): Promise<BlockchainTransactionResult> => {
    setIsProcessing(true);
    
    try {
      // Retrieve private key directly from localStorage
      const privateKey = await retrievePrivateKey(publicKey);
      
      if (!privateKey) {
        toast.error('No private key stored for this account', {
          description: 'Please import your private key in Settings first'
        });
        return { success: false, error: 'Private key not found' };
      }
      
      // Create a keypair for signing using the private key
      const sourceKeypair = StellarSdk.Keypair.fromSecret(privateKey);
      
      // Fetch the account sequence number from the network
      const account = await server.loadAccount(publicKey);
      
      // Start building the transaction
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK,
      });
      
      // Add the payment operation
      transaction.addOperation(
        StellarSdk.Operation.payment({
          destination: destination,
          asset: StellarSdk.Asset.native(), // XLM
          amount: amount.toString()
        })
      );
      
      // Add memo if provided
      if (memo) {
        transaction.addMemo(StellarSdk.Memo.text(memo));
      }
      
      // Set a timeout for this transaction
      transaction.setTimeout(180);
      
      // Build the transaction and sign it
      const builtTx = transaction.build();
      builtTx.sign(sourceKeypair);
      
      // Submit the transaction
      const result = await server.submitTransaction(builtTx);
      
      console.log("Transaction successful! Hash:", result.hash);
      console.log("Transaction details:", {
        hash: result.hash,
        amount,
        destination: destination.substring(0, 8) + '...',
        memo: memo || 'none'
      });
      
      return {
        success: true,
        txHash: result.hash
      };
    } catch (error) {
      console.error('Payment failed:', error);
      
      // Get a more descriptive error
      let errorMessage = 'Transaction failed';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Check for specific Stellar errors
        if ('response' in error && (error as any).response) {
          const response = (error as any).response;
          if (response.data && response.data.extras && response.data.extras.result_codes) {
            const resultCodes = response.data.extras.result_codes;
            errorMessage = `Transaction failed: ${JSON.stringify(resultCodes)}`;
          }
        }
      }
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SecureTransactionContext.Provider value={{ signAndSendTransaction, isProcessing }}>
      {children}
    </SecureTransactionContext.Provider>
  );
};

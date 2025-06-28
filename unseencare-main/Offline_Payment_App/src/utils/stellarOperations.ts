import * as StellarSdk from 'stellar-sdk';
import { PendingTransaction, QRCodeData } from '@/types/stellar';
import { getPendingTransactions, updateTransactionStatus } from './localStorage';
import { toast } from '@/components/ui/sonner';
import { retrievePrivateKey } from './accountStorage';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
// For production, use: new Server('https://horizon.stellar.org');

// Network to use (test network for development, public for production)
const NETWORK = StellarSdk.Networks.TESTNET;
// Change to Networks.PUBLIC for mainnet

export const loadAccount = async (publicKey: string): Promise<any> => {
  try {
    const account = await server.loadAccount(publicKey);
    const balance = account.balances
      .filter(balance => balance.asset_type === 'native')
      .map(balance => balance.balance)[0] || '0';

    return {
      publicKey,
      balance,
      isLoading: false,
      error: null
    };
  } catch (error) {
    console.error('Failed to load account:', error);
    return {
      publicKey,
      balance: '0',
      isLoading: false,
      error: 'Failed to load account details'
    };
  }
};

// Securely create and submit a transaction to the Stellar blockchain
// This is now a wrapper for the secure transaction context
// The actual transaction signing happens in the SecureTransactionContext
export const sendPayment = async (
  sourceSecretKey: string,
  destinationKey: string,
  amount: string,
  memo?: string
): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  try {
    // Get the public key from the secret key
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();
    
    // Fetch the account sequence number from the network
    const account = await server.loadAccount(sourcePublicKey);
    
    // Start building the transaction
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK,
    });
    
    // Add the payment operation
    transaction.addOperation(
      StellarSdk.Operation.payment({
        destination: destinationKey,
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
  }
};

// Process pending transactions without PIN protection
export const processPendingTransactions = async (publicKey: string): Promise<void> => {
  // Retrieve the private key directly (no PIN required)
  const secretKey = await retrievePrivateKey(publicKey);
  
  if (!secretKey) {
    toast.error("Cannot process transactions: No private key stored for this account");
    return;
  }

  const pendingTransactions = getPendingTransactions().filter(tx => tx.status === 'pending');
  
  if (!pendingTransactions.length) return;
  
  let processed = 0;
  let failed = 0;
  
  for (const transaction of pendingTransactions) {
    try {
      const result = await sendPayment(
        secretKey,
        transaction.destination,
        transaction.amount,
        transaction.memo
      );
      
      if (result.success) {
        // Update transaction status with the hash
        updateTransactionStatus(transaction.id, 'completed', result.txHash);
        processed++;
      } else {
        updateTransactionStatus(transaction.id, 'failed');
        failed++;
        console.error(`Failed to process transaction ${transaction.id}:`, result.error);
      }
    } catch (error) {
      console.error(`Error processing transaction ${transaction.id}:`, error);
      updateTransactionStatus(transaction.id, 'failed');
      failed++;
    }
  }
  
  // Show toast notifications
  if (processed > 0) {
    toast.success(`Processed ${processed} pending transactions on the blockchain`);
  }
  if (failed > 0) {
    toast.error(`Failed to process ${failed} transactions`);
  }
};

// Verify transaction on the blockchain by hash
export const verifyTransaction = async (txHash: string): Promise<any> => {
  try {
    const transaction = await server.transactions().transaction(txHash).call();
    return {
      verified: true,
      transaction
    };
  } catch (error) {
    console.error('Failed to verify transaction:', error);
    return {
      verified: false,
      error: 'Could not verify transaction on the blockchain'
    };
  }
};

// Validate a Stellar address
export const validateStellarAddress = (address: string): boolean => {
  try {
    const keypair = StellarSdk.Keypair.fromPublicKey(address);
    return !!keypair;
  } catch (error) {
    return false;
  }
};

export const parseQRCodeData = (data: string): QRCodeData => {
  let result: QRCodeData = {
    destination: '',
    amount: undefined,
    memo: undefined,
    format: 'unknown',
    rawData: data,
    isValid: false
  };
  
  // Handle different QR code formats:
  
  // Simple address only (G... format)
  if (data.startsWith('G') && data.length >= 56) {
    result = {
      ...result,
      destination: data,
      format: 'plain',
      isValid: validateStellarAddress(data),
    };
    return result;
  }
  
  // Try to parse as a stellar URI or JSON
  try {
    // Check if it's a stellar URI (stellar:GAddress...)
    if (data.startsWith('stellar:')) {
      const uri = new URL(data);
      const destination = uri.pathname || uri.hostname;
      const amount = uri.searchParams.get('amount') || undefined;
      const memo = uri.searchParams.get('memo') || undefined;
      
      const cleanDestination = destination.replace('stellar:', '');
      
      result = {
        destination: cleanDestination,
        amount,
        memo,
        format: 'uri',
        rawData: data,
        isValid: validateStellarAddress(cleanDestination),
      };
      return result;
    }
    
    // Try parsing as JSON
    const jsonData = JSON.parse(data);
    const destination = jsonData.destination || jsonData.address || '';
    
    result = {
      destination,
      amount: jsonData.amount?.toString(),
      memo: jsonData.memo?.toString(),
      format: 'json',
      rawData: data,
      isValid: validateStellarAddress(destination),
    };
    return result;
  } catch (e) {
    // If all parsing fails, just return the string as the destination with invalid status
    return {
      destination: data,
      format: 'unknown',
      rawData: data,
      isValid: false,
    };
  }
};

// Generate a new Stellar keypair
export const generateKeypair = (): { publicKey: string; secretKey: string } => {
  const keypair = StellarSdk.Keypair.random();
  return {
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret()
  };
};

// Function to fund a testnet account (only works on testnet)
export const fundTestnetAccount = async (publicKey: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a funded Testnet account:", responseJSON);
    return true;
  } catch (error) {
    console.error("Error funding testnet account:", error);
    return false;
  }
};

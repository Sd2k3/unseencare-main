
import { StellarAccount } from '@/types/stellar';

const ACCOUNTS_STORAGE_KEY = 'stellar_accounts';
const ACTIVE_ACCOUNT_KEY = 'stellar_active_account';
const PRIVATE_KEY_PREFIX = 'private_key_';

export const getAllAccounts = (): StellarAccount[] => {
  try {
    const accountsJson = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    return accountsJson ? JSON.parse(accountsJson) : [];
  } catch (error) {
    console.error('Failed to retrieve accounts:', error);
    return [];
  }
};

export const saveAccounts = (accounts: StellarAccount[]): void => {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    console.log('Accounts saved successfully:', accounts.length);
  } catch (error) {
    console.error('Failed to save accounts:', error);
  }
};

export const addAccount = (account: StellarAccount): void => {
  const accounts = getAllAccounts();
  // Check for duplicates
  if (!accounts.some(acc => acc.publicKey === account.publicKey)) {
    saveAccounts([...accounts, account]);
  }
};

export const removeAccount = (publicKey: string): void => {
  const accounts = getAllAccounts();
  saveAccounts(accounts.filter(account => account.publicKey !== publicKey));
  
  // If we removed the active account, clear it
  const active = getActiveAccount();
  if (active?.publicKey === publicKey) {
    localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
  }
  
  // Also remove the stored private key if it exists
  localStorage.removeItem(`${PRIVATE_KEY_PREFIX}${publicKey}`);
};

export const updateAccount = (updated: StellarAccount): void => {
  const accounts = getAllAccounts();
  const updatedAccounts = accounts.map(account => 
    account.publicKey === updated.publicKey ? updated : account
  );
  saveAccounts(updatedAccounts);
  
  // Update active account if necessary
  const active = getActiveAccount();
  if (active?.publicKey === updated.publicKey) {
    setActiveAccount(updated);
  }
};

export const getActiveAccount = (): StellarAccount | null => {
  try {
    const activeJson = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
    return activeJson ? JSON.parse(activeJson) : null;
  } catch (error) {
    console.error('Failed to retrieve active account:', error);
    return null;
  }
};

export const setActiveAccount = (account: StellarAccount): void => {
  try {
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, JSON.stringify(account));
  } catch (error) {
    console.error('Failed to set active account:', error);
  }
};

// Store private key directly in localStorage (no PIN protection)
export const storePrivateKey = async (publicKey: string, privateKey: string): Promise<boolean> => {
  try {
    console.log('storePrivateKey called with:', { publicKey, privateKeyLength: privateKey.length });
    
    // Store the private key directly in localStorage
    const storeKey = `${PRIVATE_KEY_PREFIX}${publicKey}`;
    console.log('Storing with key:', storeKey);
    
    localStorage.setItem(storeKey, privateKey);
    console.log('Private key stored in localStorage successfully');
    
    // Update the account object to indicate that a private key is stored
    const accounts = getAllAccounts();
    console.log('Current accounts before update:', accounts.length);
    
    const updatedAccounts = accounts.map(account => {
      if (account.publicKey === publicKey) {
        console.log('Updating account with hasStoredKey: true');
        return { ...account, hasStoredKey: true };
      }
      return account;
    });
    
    console.log('Saving updated accounts...');
    saveAccounts(updatedAccounts);
    
    // Also update the active account if it's the same
    const activeAccount = getActiveAccount();
    if (activeAccount && activeAccount.publicKey === publicKey) {
      console.log('Updating active account with hasStoredKey: true');
      setActiveAccount({ ...activeAccount, hasStoredKey: true });
    }
    
    console.log('Account update complete');
    return true;
  } catch (error) {
    console.error('Failed to store private key:', error);
    return false;
  }
};

// Retrieve private key directly from localStorage
export const retrievePrivateKey = async (publicKey: string): Promise<string | null> => {
  try {
    const privateKey = localStorage.getItem(`${PRIVATE_KEY_PREFIX}${publicKey}`);
    return privateKey;
  } catch (error) {
    console.error('Failed to retrieve private key:', error);
    return null;
  }
};

// Check if a private key exists for an account
export const hasStoredPrivateKey = async (publicKey: string): Promise<boolean> => {
  const accounts = getAllAccounts();
  const account = accounts.find(acc => acc.publicKey === publicKey);
  const hasFlag = !!account?.hasStoredKey;
  console.log('hasStoredPrivateKey check:', { publicKey, hasFlag });
  return hasFlag;
};

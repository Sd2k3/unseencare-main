import React, { useState, useEffect } from 'react';
import { StellarAccount } from '@/types/stellar';
import { toast } from '@/components/ui/sonner';
import { getAllAccounts, saveAccounts, getActiveAccount, setActiveAccount } from '@/utils/accountStorage';
import { AccountDropdown } from './AccountDropdown';
import { AccountEditMenu } from './AccountEditMenu';
import { AccountDialog } from './AccountDialog';
import { PrivateKeySetup } from './PrivateKeySetup';

export const AccountManager = ({ onAccountChange }: { onAccountChange: (account: StellarAccount) => void }) => {
  const [accounts, setAccounts] = useState<StellarAccount[]>([]);
  const [open, setOpen] = useState(false);
  const [newAccountKey, setNewAccountKey] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingAccount, setEditingAccount] = useState<StellarAccount | null>(null);
  const [activeAccount, setActiveAccountState] = useState<StellarAccount | null>(null);
  const [showPrivateKeySetup, setShowPrivateKeySetup] = useState(false);
  const [newlyAddedAccount, setNewlyAddedAccount] = useState<StellarAccount | null>(null);

  useEffect(() => {
    loadAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAccounts = () => {
    const storedAccounts = getAllAccounts();
    setAccounts(storedAccounts);

    const current = getActiveAccount();
    if (current) {
      setActiveAccountState(current);
      onAccountChange(current);
    } else if (storedAccounts.length > 0) {
      handleSetActiveAccount(storedAccounts[0]);
    }
  };

  const handleAddAccount = () => {
    if (!newAccountKey.startsWith('G') || newAccountKey.length < 56) {
      toast.error('Invalid Stellar public key format');
      return;
    }
    if (accounts.some(acc => acc.publicKey === newAccountKey)) {
      toast.error('This account is already in your wallet');
      return;
    }
    const newAccount: StellarAccount = {
      publicKey: newAccountKey,
      balance: '0',
      isLoading: true,
      error: null,
      name: newAccountName || `Account ${accounts.length + 1}`,
      isActive: accounts.length === 0
    };
    const updatedAccounts = [...accounts, newAccount];
    saveAccounts(updatedAccounts);
    setAccounts(updatedAccounts);
    if (accounts.length === 0) {
      handleSetActiveAccount(newAccount);
    }
    
    // Store the newly added account and show private key setup
    setNewlyAddedAccount(newAccount);
    setNewAccountKey('');
    setNewAccountName('');
    setOpen(false);
    
    toast.success('Account added successfully');
    
    // Show private key setup dialog
    setShowPrivateKeySetup(true);
  };

  const handleUpdateAccount = () => {
    if (!editingAccount) return;
    const updatedAccounts = accounts.map(acc =>
      acc.publicKey === editingAccount.publicKey
        ? { ...acc, name: newAccountName || acc.name }
        : acc
    );
    saveAccounts(updatedAccounts);
    setAccounts(updatedAccounts);
    if (activeAccount && activeAccount.publicKey === editingAccount.publicKey) {
      const updatedActive = updatedAccounts.find(acc => acc.publicKey === editingAccount.publicKey);
      if (updatedActive) {
        handleSetActiveAccount(updatedActive);
      }
    }
    setIsEditing(false);
    setEditingAccount(null);
    setNewAccountName('');
    setOpen(false);
    toast.success('Account updated successfully');
  };

  const handleDeleteAccount = (account: StellarAccount) => {
    const updatedAccounts = accounts.filter(acc => acc.publicKey !== account.publicKey);
    saveAccounts(updatedAccounts);
    setAccounts(updatedAccounts);
    if (activeAccount && activeAccount.publicKey === account.publicKey) {
      if (updatedAccounts.length > 0) {
        handleSetActiveAccount(updatedAccounts[0]);
      } else {
        setActiveAccountState(null);
        onAccountChange({
          publicKey: '',
          balance: '0',
          isLoading: false,
          error: null
        });
      }
    }
    toast.success('Account removed successfully');
  };

  const handleSetActiveAccount = (account: StellarAccount) => {
    setActiveAccount(account);
    setActiveAccountState(account);
    onAccountChange(account);
    toast.info(`Switched to ${account.name || 'account'}`);
  };

  const startEditing = (account: StellarAccount) => {
    setIsEditing(true);
    setEditingAccount(account);
    setNewAccountName(account.name || '');
    setOpen(true);
  };

  const handlePrivateKeySetupComplete = () => {
    // Reload accounts to update the hasStoredKey flag
    loadAccounts();
    setNewlyAddedAccount(null);
  };

  const handlePrivateKeySetupClose = () => {
    setShowPrivateKeySetup(false);
    setNewlyAddedAccount(null);
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <AccountDropdown
          accounts={accounts}
          activeAccount={activeAccount}
          onSetActiveAccount={handleSetActiveAccount}
          onAddAccount={() => {
            setIsEditing(false);
            setOpen(true);
          }}
        />
        {activeAccount && (
          <AccountEditMenu
            activeAccount={activeAccount}
            onEdit={startEditing}
            onDelete={handleDeleteAccount}
          />
        )}
      </div>
      
      <AccountDialog
        open={open}
        isEditing={isEditing}
        newAccountKey={newAccountKey}
        newAccountName={newAccountName}
        onChangeAccountKey={setNewAccountKey}
        onChangeAccountName={setNewAccountName}
        onClose={() => {
          setOpen(false);
          setNewAccountKey('');
          setNewAccountName('');
          setIsEditing(false);
          setEditingAccount(null);
        }}
        onSubmit={isEditing ? handleUpdateAccount : handleAddAccount}
      />

      {showPrivateKeySetup && newlyAddedAccount && (
        <PrivateKeySetup
          open={showPrivateKeySetup}
          publicKey={newlyAddedAccount.publicKey}
          accountName={newlyAddedAccount.name || 'New Account'}
          onClose={handlePrivateKeySetupClose}
          onComplete={handlePrivateKeySetupComplete}
        />
      )}
    </>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlusCircle, Check, ChevronDown } from 'lucide-react';
import { StellarAccount } from '@/types/stellar';

interface AccountDropdownProps {
  accounts: StellarAccount[];
  activeAccount: StellarAccount | null;
  onSetActiveAccount: (account: StellarAccount) => void;
  onAddAccount: () => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
  accounts,
  activeAccount,
  onSetActiveAccount,
  onAddAccount,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="w-full justify-between">
        <span className="truncate max-w-[180px]">
          {activeAccount?.name || 'No Account Selected'}
        </span>
        <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[200px]">
      {accounts.map((account) => (
        <DropdownMenuItem
          key={account.publicKey}
          className="flex items-center justify-between"
          onClick={() => onSetActiveAccount(account)}
        >
          <span className="truncate">{account.name || account.publicKey.substring(0, 10) + '...'}</span>
          {activeAccount?.publicKey === account.publicKey && (
            <Check className="h-4 w-4 ml-2" />
          )}
        </DropdownMenuItem>
      ))}
      {accounts.length === 0 && (
        <DropdownMenuItem disabled>No accounts added</DropdownMenuItem>
      )}
      <DropdownMenuItem
        className="border-t mt-1 pt-1 text-center justify-center text-primary"
        onClick={onAddAccount}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add New Account
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


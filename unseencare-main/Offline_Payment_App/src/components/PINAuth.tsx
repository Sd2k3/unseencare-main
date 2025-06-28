
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { verifyPIN, isPINSetup } from '@/utils/secureStorage';

interface PINAuthProps {
  onSuccess: (pin: string) => void;
  onCancel?: () => void;
  title?: string;
  message?: string;
}

export const PINAuth = ({ 
  onSuccess, 
  onCancel, 
  title = 'Enter PIN', 
  message = 'Please enter your security PIN to continue'
}: PINAuthProps) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPINSetup, setShowPINSetup] = useState(false);
  
  useEffect(() => {
    const checkPinStatus = async () => {
      const hasPin = await isPINSetup();
      if (!hasPin) {
        setShowPINSetup(true);
      }
    };
    
    checkPinStatus();
  }, []);
  
  const handleSubmit = async () => {
    if (pin.length < 4) {
      toast.error('PIN must be at least 4 digits');
      return;
    }
    
    setIsLoading(true);
    try {
      const isValid = await verifyPIN(pin);
      if (isValid) {
        onSuccess(pin);
      } else {
        toast.error('Invalid PIN');
        setPin('');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (showPINSetup) {
    // We need to handle the case where PIN hasn't been set up yet
    // This should be rare because PINSetup would usually be shown first
    toast.error('Security PIN not set up');
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <Card className="w-[350px] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-sm text-center text-muted-foreground mb-6">
            {message}
          </p>
          
          <InputOTP maxLength={6} value={pin} onChange={setPin}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          {onCancel && (
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
          <Button 
            className="flex-1 bg-gradient-to-r from-[#E5DEFF] to-[#D3E4FD] text-primary hover:opacity-90"
            onClick={handleSubmit}
            disabled={isLoading || pin.length < 4}
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

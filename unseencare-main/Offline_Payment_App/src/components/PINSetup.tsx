
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { setupPIN, isPINSetup } from '@/utils/secureStorage';

interface PINSetupProps {
  onComplete: () => void;
}

export const PINSetup = ({ onComplete }: PINSetupProps) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1); // 1: Enter PIN, 2: Confirm PIN
  const [isLoading, setIsLoading] = useState(false);
  const [isPinAlreadySet, setIsPinAlreadySet] = useState(false);
  
  useEffect(() => {
    const checkPinStatus = async () => {
      const hasPin = await isPINSetup();
      setIsPinAlreadySet(hasPin);
      if (hasPin) {
        // If PIN is already set, skip to completion
        onComplete();
      }
    };
    
    checkPinStatus();
  }, [onComplete]);
  
  const handleNext = () => {
    if (pin.length < 4) {
      toast.error('PIN must be at least 4 digits');
      return;
    }
    setStep(2);
  };
  
  const handleSubmit = async () => {
    if (pin !== confirmPin) {
      toast.error('PINs do not match');
      setConfirmPin('');
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await setupPIN(pin);
      if (success) {
        toast.success('PIN setup successful');
        onComplete();
      } else {
        toast.error('Failed to set up PIN');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isPinAlreadySet) {
    return null; // Don't render if PIN is already set
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <Card className="w-[350px] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-center">
            {step === 1 ? 'Create Security PIN' : 'Confirm Your PIN'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-sm text-center text-muted-foreground mb-6">
            {step === 1 
              ? 'Set a PIN to protect your wallet and transactions' 
              : 'Enter the same PIN again to confirm'}
          </p>
          
          {step === 1 ? (
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
          ) : (
            <InputOTP maxLength={6} value={confirmPin} onChange={setConfirmPin}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {step === 1 ? (
            <Button 
              className="w-full bg-gradient-to-r from-[#E5DEFF] to-[#D3E4FD] text-primary hover:opacity-90"
              onClick={handleNext}
              disabled={pin.length < 4}
            >
              Continue
            </Button>
          ) : (
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                onClick={() => {
                  setStep(1);
                  setConfirmPin('');
                }}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#E5DEFF] to-[#D3E4FD] text-primary hover:opacity-90"
                onClick={handleSubmit}
                disabled={isLoading || confirmPin.length < 4}
              >
                {isLoading ? 'Setting up...' : 'Confirm PIN'}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

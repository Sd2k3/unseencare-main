import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNetworkStatus } from '@/utils/networkStatus';
import { parseQRCodeData, validateStellarAddress } from '@/utils/stellarOperations';
import { savePendingTransaction } from '@/utils/localStorage';
import { PendingTransaction, QRCodeData } from '@/types/stellar';
import { QrCode, Check, AlertTriangle, Info, Camera, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Import real QR scanner
import QrReader from 'react-qr-scanner';

interface CameraDevice {
  deviceId: string;
  label: string;
  kind: string;
}

// --- BEGIN DEBUG ONLY ---
interface DebugTransactionLog {
  id: string;
  timestamp: number;
  isOffline: boolean;
  data: any;
}
// --- END DEBUG ONLY ---

export const AdvancedQRScanner = () => {
  const { isOnline } = useNetworkStatus();
  const [scanning, setScanning] = useState(false);
  const [continuous, setContinuous] = useState(false);
  const [result, setResult] = useState<QRCodeData | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [customMemo, setCustomMemo] = useState<string>('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [lastRawData, setLastRawData] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [showCameraSelection, setShowCameraSelection] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);

  // --- DEBUG LOG STATE ---
  const [debugSavedTx, setDebugSavedTx] = useState<DebugTransactionLog | null>(null);
  const [debugLogList, setDebugLogList] = useState<DebugTransactionLog[]>([]);

  // Enumerate available cameras
  const enumerateCameras = useCallback(async () => {
    try {
      // First request camera permission
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermissionGranted(true);
      
      // Then enumerate devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter(device => device.kind === 'videoinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${devices.indexOf(device) + 1}`,
          kind: device.kind
        }));
      
      setAvailableCameras(videoDevices);
      
      // Auto-select the first camera if none selected
      if (videoDevices.length > 0 && !selectedCamera) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
      
      return videoDevices;
    } catch (error) {
      console.error('Error enumerating cameras:', error);
      setCameraError('Unable to access camera. Please check your browser permissions.');
      setCameraPermissionGranted(false);
      return [];
    }
  }, [selectedCamera]);

  // Handle continuous/non-continuous scan
  useEffect(() => {
    if (!continuous) return;
    if (!scanning) setContinuous(false);
  }, [scanning, continuous]);

  // Handle scan result from real camera
  const handleScan = useCallback(
    (data: any) => {
      if (!data) return;
      const codeData = typeof data === 'string' ? data : data.text;
      if (codeData && codeData !== lastRawData) {
        setLastRawData(codeData);
        const parsedData = parseQRCodeData(codeData);
        setResult(parsedData);

        if (parsedData.isValid) {
          toast.success(`Successfully scanned ${parsedData.format} format QR code`);
        } else {
          toast.error("Invalid QR code format detected");
        }

        if (!continuous) {
          setScanning(false);
        }
      }
    },
    [continuous, lastRawData]
  );

  // Handle camera errors
  const handleError = (err: any) => {
    setCameraError('Unable to access camera. Please check your browser permissions.');
    setScanning(false);
  };

  // Start scanning with camera selection
  const startScanner = async () => {
    if (!cameraPermissionGranted || availableCameras.length === 0) {
      const cameras = await enumerateCameras();
      if (cameras.length === 0) {
        return;
      }
    }

    if (availableCameras.length > 1) {
      setShowCameraSelection(true);
    } else {
      // Directly start scanning if only one camera
      setScanning(true);
      setCameraError(null);
      setResult(null);
      setLastRawData(null);
    }
  };

  const handleCameraSelect = (cameraId: string) => {
    setSelectedCamera(cameraId);
    setShowCameraSelection(false);
    setScanning(true);
    setCameraError(null);
    setResult(null);
    setLastRawData(null);
  };

  const handleTransaction = () => {
    if (!result?.destination) return;

    if (!validateStellarAddress(result.destination)) {
      toast.error("Invalid Stellar address");
      return;
    }

    const amount = customAmount || result.amount || '1';
    const memo = customMemo || result.memo;

    const pendingTx: PendingTransaction = {
      id: Date.now().toString(),
      destination: result.destination,
      amount,
      memo,
      timestamp: Date.now(),
      status: 'pending',
      qrFormat: result.format,
      rawData: result.rawData
    };

    savePendingTransaction(pendingTx);

    const txLog = {
      id: pendingTx.id,
      timestamp: pendingTx.timestamp,
      isOffline: !isOnline,
      data: { ...pendingTx }
    };
    setDebugSavedTx(txLog);
    setDebugLogList((logs) => [txLog, ...logs].slice(0, 5));

    setResult(null);
    setCustomAmount('');
    setCustomMemo('');
    setLastRawData(null);

    toast.success(
      isOnline
        ? 'Transaction will be processed right away!'
        : 'Transaction saved and will be processed when you\'re back online.',
      {
        duration: 5000
      }
    );
  };

  const resetScanner = () => {
    setResult(null);
    setScanning(false);
    setContinuous(false);
    setCustomAmount('');
    setCustomMemo('');
    setCameraError(null);
    setLastRawData(null);
  };

  const toggleContinuous = () => {
    if (!continuous && !scanning) {
      setContinuous(true);
      startScanner();
    } else {
      setContinuous(!continuous);
      if (!continuous) {
        setScanning(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Advanced QR Scanner</CardTitle>
          <Badge variant={continuous ? "default" : "outline"}>
            {continuous ? "Continuous" : "Single Scan"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {scanning ? (
          <>
            {cameraError ? (
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-red-500" />
                  <p className="text-red-500">{cameraError}</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="h-64 rounded overflow-hidden relative">
                  <QrReader
                    delay={continuous ? 1500 : false}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%', height: '17rem', objectFit: 'cover' }}
                    facingMode={selectedCamera ? { exact: selectedCamera } : "environment"}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none">
                    <p className="bg-white/80 px-2 py-1 text-xs rounded mb-2">Point the camera at a Stellar QR code</p>
                  </div>
                </div>
                <div className="text-center mt-2 text-gray-600 text-xs">
                  {continuous
                    ? "Keep scanning, new codes will be detected automatically."
                    : "Scanning will stop after a successful QR detection."}
                </div>
                {availableCameras.length > 1 && (
                  <div className="mt-2 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCameraSelection(true)}
                      className="text-xs"
                    >
                      Switch Camera
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : result ? (
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              {result.isValid ? (
                <Check className="h-5 w-5 text-green-500 mt-1" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
              )}
              <div>
                <p className="text-sm font-medium flex items-center gap-1">
                  QR Format:
                  <Badge variant="outline" className="capitalize">
                    {result.format}
                  </Badge>
                  {!result.isValid && (
                    <Badge variant="destructive">Invalid</Badge>
                  )}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Destination Account</p>
              <p className="text-xs break-all bg-gray-50 p-2 rounded">
                {result.destination}
              </p>
              {!validateStellarAddress(result.destination) && (
                <p className="text-xs text-red-500 mt-1">
                  ⚠️ This doesn't appear to be a valid Stellar address
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div>
                <p className="text-sm font-medium">Amount (XLM)</p>
                <Input
                  type="text"
                  placeholder={result.amount || "Enter amount"}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <p className="text-sm font-medium">Memo (Optional)</p>
                <Input
                  type="text"
                  placeholder={result.memo || "Enter memo"}
                  value={customMemo}
                  onChange={(e) => setCustomMemo(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {result.rawData && (
              <div>
                <p className="text-sm font-medium flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  Raw Data
                </p>
                <p className="text-xs break-all bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                  {result.rawData}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <QrCode className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Tap the button below to scan a QR code</p>
              <p className="text-xs mt-2 text-gray-400">
                {isOnline
                  ? "You're online - transactions will process immediately"
                  : "You're offline - transactions will be saved for later"}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleContinuous}
                  className={continuous ? "bg-primary/10" : ""}
                >
                  {continuous ? "Disable" : "Enable"} Continuous Mode
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* DEBUG LOG UI BOX FOR TRANSACTION SAVES */}
        <div className="mt-5">
          <h3 className="text-xs mb-1 text-gray-500 font-semibold flex items-center gap-1">
            <Info className="w-3 h-3" />
            Recent transaction save logs
          </h3>
          {debugLogList.length === 0 ? (
            <div className="text-[11px] text-gray-400 bg-gray-100 py-2 px-3 rounded">
              No QR-captured transactions saved in this session yet.
            </div>
          ) : (
            <ul className="space-y-1">
              {debugLogList.map((log, idx) => (
                <li
                  key={log.id}
                  className="bg-gray-100/70 rounded px-2 py-1 text-xs flex flex-col border border-gray-200"
                >
                  <span className="flex gap-2 items-center">
                    <span className="text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <Badge variant={log.isOffline ? "destructive" : "secondary"} className="ml-1">
                      {log.isOffline ? 'Offline' : 'Online'}
                    </Badge>
                  </span>
                  <span className="text-gray-700">
                    Saved: <b>{log.data.amount} XLM</b> to <span className="font-mono">{log.data.destination.slice(0, 8)}...</span>
                    <span className="ml-2 text-gray-400">TX ID {log.id.slice(-5)}</span>
                  </span>
                  <span className="text-gray-400">
                    Status: <b>{log.data.status}</b> | QR: <i>{log.data.qrFormat}</i>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Camera Selection Dialog */}
        <Dialog open={showCameraSelection} onOpenChange={setShowCameraSelection}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Select Camera
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {availableCameras.map((camera) => (
                <Button
                  key={camera.deviceId}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleCameraSelect(camera.deviceId)}
                >
                  <div className="flex items-center gap-3">
                    <Camera className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">{camera.label}</p>
                      <p className="text-xs text-gray-500">
                        {camera.deviceId.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-center">
        {result ? (
          <div className="space-x-2">
            <Button onClick={handleTransaction} disabled={!result.isValid}>
              Send Transaction
            </Button>
            <Button variant="outline" onClick={resetScanner}>Cancel</Button>
          </div>
        ) : (
          <Button onClick={startScanner} disabled={scanning}>
            <Camera className="mr-1 w-4 h-4" />
            Scan QR Code
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationSettings } from '@/components/NotificationSettings';
import { TransactionExport } from '@/components/TransactionExport';
import { NetworkStatus } from '@/components/NetworkStatus';
import { Bell, Download, Info, ArrowLeft, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <SettingsIcon className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="text-blue-100 text-sm">Customize your experience</p>
                </div>
              </div>
            </div>
            <NetworkStatus />
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-6 py-6">
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg border-0 p-1 rounded-2xl">
            <TabsTrigger 
              value="notifications"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="export"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="mt-6">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <NotificationSettings />
            </div>
          </TabsContent>
          
          <TabsContent value="export" className="mt-6">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <TransactionExport />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Enhanced About section */}
        <Card className="mt-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-gray-100">
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Info className="h-5 w-5 text-indigo-600" />
              About
            </CardTitle>
            <CardDescription className="text-gray-600">
              Stellar Offline Transfer
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This application allows you to scan Stellar QR codes and process transactions
                even when offline. Transactions will be stored locally and processed when you're
                back online.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-600">Version</span>
                <span className="text-sm text-gray-500">2.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Built with</span>
                <span className="text-sm text-gray-500">Stellar SDK</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

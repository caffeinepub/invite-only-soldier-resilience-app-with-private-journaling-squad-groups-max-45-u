import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProductionUrl } from '../../hooks/useProductionUrl';
import { copyToClipboard } from '../../utils/clipboard';
import { Copy, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRef, useEffect, useState } from 'react';
import { generateQRCode, downloadCanvasAsPNG } from '../../utils/qrcode';

export function ShareProductionLinkCard() {
  const { url } = useProductionUrl();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrReady, setQrReady] = useState(false);

  useEffect(() => {
    if (canvasRef.current && url) {
      try {
        generateQRCode(canvasRef.current, url, {
          size: 200,
          level: 'H',
          bgColor: '#ffffff',
          fgColor: '#000000',
          margin: 4,
        });
        setQrReady(true);
      } catch (error) {
        console.error('QR generation failed:', error);
        toast.error('Failed to generate QR code');
      }
    }
  }, [url]);

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(url);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Failed to copy link');
    }
  };

  const handleDownloadQR = () => {
    if (!canvasRef.current || !qrReady) {
      toast.error('QR code not ready');
      return;
    }

    try {
      downloadCanvasAsPNG(canvasRef.current, 'dagger-h2f-qr-code.png');
      toast.success('QR code downloaded');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download QR code');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          <CardTitle>Share This App</CardTitle>
        </div>
        <CardDescription>Share the app link or QR code with others</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Link Section */}
        <div className="space-y-2">
          <Label htmlFor="production-url">App Link</Label>
          <div className="flex gap-2">
            <Input
              id="production-url"
              value={url}
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={handleCopyLink} size="icon" variant="outline" title="Copy link">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Copy this link to share the app with others
          </p>
        </div>

        {/* QR Code Section */}
        <div className="space-y-3">
          <Label>QR Code</Label>
          <div className="flex flex-col items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="bg-white p-4 rounded-lg">
              <canvas
                ref={canvasRef}
                width={200}
                height={200}
                className="max-w-full h-auto"
              />
            </div>
            <Button 
              onClick={handleDownloadQR} 
              variant="outline" 
              className="w-full sm:w-auto"
              disabled={!qrReady}
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Scan this QR code to open the app on a mobile device
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

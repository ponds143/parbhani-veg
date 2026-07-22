import React from 'react';
import { Card } from '../ui/card';
import { BadgeInfo, CircleHelp, Copy, PhoneCall, QrCode } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Capacitor } from '@capacitor/core';

const WalletPaymentGuide = ({ settings }) => {
  const upiLink = settings?.payment_upi_id
    ? `upi://pay?pa=${encodeURIComponent(settings.payment_upi_id)}&pn=${encodeURIComponent(settings.payment_receiver_name || 'KALYAN GAMES')}`
    : null;

  const handleCopy = async (value, message) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(message);
    } catch {
      toast.error('Copy failed');
    }
  };

  const openUpiApp = (link) => {
    if (!link) return;

    if (Capacitor.isNativePlatform()) {
      window.location.href = link;
      return;
    }

    window.open(link, '_system');
  };

  return (
    <Card className="cyber-card wallet-guide-card p-6 bg-neon-blue/10 border-neon-blue/30" data-testid="wallet-payment-guide">
      <div className="wallet-guide-layout flex items-start gap-4">
        <div className="wallet-guide-icon w-12 h-12 rounded-2xl bg-neon-blue/20 flex items-center justify-center shrink-0">
          <QrCode className="w-6 h-6 text-neon-blue" />
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <h3 className="font-chakra font-bold text-xl text-foreground">Add Money / Withdrawal Guide</h3>
            <p className="text-sm font-manrope text-muted-foreground mt-2">
              Real gateway abhi connected nahi hai, lekin aap direct request flow use karke payment details submit kar sakte hain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="wallet-detail-card rounded-xl border border-white/10 bg-background/60 p-4" data-testid="wallet-payment-receiver">
              <div className="text-xs text-muted-foreground">Receiver Name</div>
              <div className="font-chakra font-bold mt-1">{settings?.payment_receiver_name || 'Kalyan Games'}</div>
            </div>
            <div className="wallet-detail-card rounded-xl border border-white/10 bg-background/60 p-4" data-testid="wallet-payment-upi">
              <div className="text-xs text-muted-foreground">UPI ID</div>
              <div className="font-mono font-bold mt-1 break-all">{settings?.payment_upi_id || 'Admin will share after request'}</div>
            </div>
            <div className="wallet-detail-card rounded-xl border border-white/10 bg-background/60 p-4" data-testid="wallet-payment-number">
              <div className="text-xs text-muted-foreground">Support / WhatsApp</div>
              <div className="font-mono font-bold mt-1">{settings?.support_whatsapp || settings?.payment_number || 'Not added yet'}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
            <div className="wallet-qr-card rounded-xl border border-white/10 bg-background/60 p-4 text-center" data-testid="wallet-payment-qr-card">
              <div className="text-xs text-muted-foreground mb-3">Scan & Pay</div>
              <img
                src={settings?.payment_qr_image_url || '/payment-qr.jpeg'}
                alt="Payment QR"
                className="mx-auto w-full max-w-[250px] rounded-lg border border-white/10 bg-white p-2"
                data-testid="wallet-payment-qr-image"
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => handleCopy(settings?.payment_upi_id || '', 'UPI ID copied')}
                  data-testid="wallet-copy-upi-button"
                >
                  <Copy className="w-4 h-4" /> Copy UPI
                </Button>
                <Button
                  type="button"
                  className="btn-primary"
                  asChild
                  data-testid="wallet-open-upi-button"
                >
                  <a
                    href={upiLink || '#'}
                    onClick={(e) => {
                      if (!upiLink) return e.preventDefault();
                      e.preventDefault();
                      openUpiApp(upiLink);
                    }}
                  >
                    Open UPI App
                  </a>
                </Button>
              </div>

              <div className="wallet-note-card rounded-xl border border-white/10 p-4 bg-background/50 text-sm font-manrope text-muted-foreground" data-testid="wallet-manual-payment-note">
                Payment karne ke baad same page se <span className="text-foreground font-semibold">UTR / transaction ID</span> submit karein. Admin verify karke wallet me amount add karega.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-manrope text-muted-foreground">
            <div className="wallet-note-card rounded-xl border border-white/10 p-4 bg-background/50" data-testid="wallet-payment-instructions">
              <div className="inline-flex items-center gap-2 text-foreground font-semibold mb-2"><BadgeInfo className="w-4 h-4" /> Add Money Steps</div>
              <p>{settings?.payment_instructions || 'Payment karke transaction detail submit karein.'}</p>
            </div>
            <div className="wallet-note-card rounded-xl border border-white/10 p-4 bg-background/50" data-testid="wallet-withdrawal-note">
              <div className="inline-flex items-center gap-2 text-foreground font-semibold mb-2"><CircleHelp className="w-4 h-4" /> Withdrawal Steps</div>
              <p>{settings?.withdrawal_note || 'UPI ya bank detail ke saath withdrawal request bhejein.'}</p>
            </div>
          </div>

          {(settings?.support_whatsapp || settings?.payment_number) && (
            <div className="inline-flex items-center gap-2 text-sm text-neon-green" data-testid="wallet-contact-line">
              <PhoneCall className="w-4 h-4" />
              Quick help: {settings?.support_whatsapp || settings?.payment_number}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WalletPaymentGuide;


import React from 'react';
import { Mic, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MicPermissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAllowMic: () => void;
}

const MicPermissionModal: React.FC<MicPermissionModalProps> = ({
  open,
  onOpenChange,
  onAllowMic
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-therapy-purple-500" />
            Microphone Access Required
          </DialogTitle>
          <DialogDescription>
            SpeakWell needs access to your microphone to analyze your speech patterns and provide effective therapy sessions.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-start p-4 bg-therapy-blue-50 rounded-lg">
          <Info className="h-5 w-5 text-therapy-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-gray-700">
            <p className="mb-2">Your privacy is important to us:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your recordings are only analyzed for stutter patterns</li>
              <li>You can delete your voice data at any time</li>
              <li>We never share your voice recordings with third parties</li>
            </ul>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Not Now
          </Button>
          <Button 
            className="bg-therapy-purple-500 hover:bg-therapy-purple-700" 
            onClick={onAllowMic}
          >
            Allow Microphone Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MicPermissionModal;

"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface EndScoutingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function EndScoutingDialog({ open, onOpenChange, onConfirm }: EndScoutingDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>End Scouting?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Are you sure you want to end the scouting process?</p>
            <div className="mt-4 p-3 bg-muted rounded-[0.3rem] text-sm">
              <p className="font-medium mb-2">Note:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>All applications on hold will be moved to rejected</li>
                <li>Meetings can still take place</li>
                <li>All inbox applications will be declined</li>
                <li>All sent invites will be cancelled</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            End Scouting
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 
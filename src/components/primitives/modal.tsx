"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"
import { Spinner } from "./loading"

const modalVariants = cva(
  "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200",
  {
    variants: {
      size: {
        sm: "max-w-[calc(100%-2rem)] p-4 sm:max-w-sm",
        default: "max-w-[calc(100%-2rem)] p-6 sm:max-w-lg",
        lg: "max-w-[calc(100%-2rem)] p-6 sm:max-w-2xl",
        xl: "max-w-[calc(100%-2rem)] p-6 sm:max-w-4xl",
        full: "max-w-[calc(100%-2rem)] p-6 sm:max-w-[90vw] max-h-[90vh] overflow-auto",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface ModalProps extends VariantProps<typeof modalVariants> {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  showCloseButton?: boolean
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
  trigger?: React.ReactNode
  footer?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  loading?: boolean
  disabled?: boolean
}

function Modal({
  children,
  open,
  onOpenChange,
  title,
  description,
  showCloseButton = true,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  trigger,
  footer,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  loading = false,
  disabled = false,
  size,
  ...props
}: ModalProps) {
  const handleConfirm = React.useCallback(() => {
    if (onConfirm && !loading && !disabled) {
      onConfirm()
    }
  }, [onConfirm, loading, disabled])

  const handleCancel = React.useCallback(() => {
    if (onCancel && !loading) {
      onCancel()
    } else if (onOpenChange && !loading) {
      onOpenChange(false)
    }
  }, [onCancel, onOpenChange, loading])

  const defaultFooter = (onConfirm || onCancel) && (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      {onCancel && (
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>
      )}
      {onConfirm && (
        <Button
          variant={confirmVariant}
          onClick={handleConfirm}
          disabled={loading || disabled}
          className="flex items-center gap-2"
        >
          {loading && <Spinner size="sm" />}
          {confirmText}
        </Button>
      )}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(modalVariants({ size }), contentClassName)}
        showCloseButton={showCloseButton}
      >
        {(title || description) && (
          <DialogHeader className={cn("text-left", headerClassName)}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        
        <div className={cn("flex-1", className)}>
          {children}
        </div>

        {(footer || defaultFooter) && (
          <DialogFooter className={footerClassName}>
            {footer || defaultFooter}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Confirmation Modal - specialized variant
interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
  loading?: boolean
  disabled?: boolean
}

function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  loading = false,
  disabled = false,
}: ConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmText={confirmText}
      cancelText={cancelText}
      confirmVariant={variant}
      loading={loading}
      disabled={disabled}
      size="sm"
    >
      {/* Confirmation modal content - title and description are in header */}
      <div className="py-4">
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Modal>
  )
}

// Form Modal - specialized variant for forms
interface FormModalProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onSubmit?: () => void
  onCancel?: () => void
  submitText?: string
  cancelText?: string
  loading?: boolean
  disabled?: boolean
  size?: VariantProps<typeof modalVariants>["size"]
}

function FormModal({
  children,
  open,
  onOpenChange,
  title,
  description,
  onSubmit,
  onCancel,
  submitText = "Save",
  cancelText = "Cancel",
  loading = false,
  disabled = false,
  size = "default",
}: FormModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      onConfirm={onSubmit}
      onCancel={onCancel}
      confirmText={submitText}
      cancelText={cancelText}
      loading={loading}
      disabled={disabled}
      size={size}
    >
      {children}
    </Modal>
  )
}

export {
  Modal,
  ConfirmationModal,
  FormModal,
  modalVariants,
  type ModalProps,
  type ConfirmationModalProps,
  type FormModalProps,
}

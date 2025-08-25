'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/primitives'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/primitives'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

// Mock error reporting function - replace with actual implementation
const reportClientError = (error: Error, context?: Record<string, unknown>) => {
  console.error('Client Error:', error, context)
  // In a real app, this would send to your error tracking service
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isReporting, setIsReporting] = useState(false)
  const [hasReported, setHasReported] = useState(false)

  useEffect(() => {
    // Report error automatically
    if (!hasReported) {
      reportClientError(error, {
        digest: error.digest,
        boundary: 'global-error-boundary',
      })
      setHasReported(true)
    }
  }, [error, hasReported])

  const handleReset = () => {
    setHasReported(false)
    reset()
  }

  const handleReportBug = async () => {
    setIsReporting(true)
    try {
      // Additional bug report with user context
      reportClientError(error, {
        digest: error.digest,
        boundary: 'global-error-boundary',
        userReported: true,
        timestamp: new Date().toISOString(),
      })
      
      // You could also open a feedback form or redirect to a bug report page
      setTimeout(() => setIsReporting(false), 1000)
    } catch (reportError) {
      console.error('Failed to report bug:', reportError)
      setIsReporting(false)
    }
  }

  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-xl">Something went wrong!</CardTitle>
          <CardDescription>
            We encountered an unexpected error. Our team has been notified and is working on a fix.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isDevelopment && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
              <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                Development Error Details:
              </p>
              <p className="text-xs text-red-700 dark:text-red-300 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button onClick={handleReset} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleReportBug}
              disabled={isReporting}
              className="w-full"
            >
              <Bug className="h-4 w-4 mr-2" />
              {isReporting ? 'Reporting...' : 'Report Bug'}
            </Button>
          </div>

          {!isDevelopment && error.digest && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Please include this ID when contacting support.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

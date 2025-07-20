"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PasswordProtectionProps {
  children: React.ReactNode
  correctPassword: string
}

export function PasswordProtection({ children, correctPassword }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authenticated = sessionStorage.getItem("betta-fish-authenticated")
    if (authenticated === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === correctPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem("betta-fish-authenticated", "true")
      setError("")
    } else {
      setError("Incorrect password")
      setPassword("")
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Betta Fish</CardTitle>
          <CardDescription>
            Enter the master password to access the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter master password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Access Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
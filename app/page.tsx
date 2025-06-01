"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Play, Timer } from "lucide-react"

export default function HomePage() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [isCountdownActive, setIsCountdownActive] = useState(false)
  const [canViewVideo, setCanViewVideo] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCountdownActive(false)
            setCanViewVideo(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isCountdownActive, countdown])

  const handleUnlockClick = () => {
    // Open the unlock link in a new tab
    window.open("https://otieu.com/4/8877443", "_blank")

    // Start the countdown
    setIsUnlocked(true)
    setIsCountdownActive(true)
    setCountdown(10)
  }

  const handleViewVideoClick = () => {
    if (canViewVideo) {
      window.open("https://videohub1.website", "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">VideoHub</h1>
            <p className="text-gray-600">Unlock your video content in just a few steps</p>
          </div>

          <div className="space-y-4">
            {!isUnlocked ? (
              <Button
                onClick={handleUnlockClick}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                size="lg"
              >
                <Lock className="mr-2 h-5 w-5" />
                Unlock Content
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Timer className="h-5 w-5" />
                  <span className="text-sm font-medium">{isCountdownActive ? "Please wait..." : "Ready!"}</span>
                </div>

                <Button
                  onClick={handleViewVideoClick}
                  disabled={!canViewVideo}
                  className={`w-full h-12 font-semibold text-lg transition-all duration-200 ${
                    canViewVideo
                      ? "bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  size="lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {isCountdownActive
                    ? `View Video (${countdown}s)`
                    : canViewVideo
                      ? "View Video"
                      : "View Video (Locked)"}
                </Button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2 text-center">How to Access Videos:</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>• Unlock Content එක ක්ලික් කරාට පස්සෙ වෙන සයිට් එකකට යයි.</li>
              <li>• 12s ක් විතර ඒ සයිට් එකෙ ඉන්න.</li>
              <li>• පසුව (RETURN BACK) මේ පිටුවට එන්න.</li>
              <li>• ඊන් පසු VIEW VIDEO කියන එක නැවත ක්ලික් කරන්න.</li>
              <li>• එකෙන් ගියාට පස්සේ Video Hub website එකෙන් videos එනවා.</li>
            </ol>
          </div>

          {isUnlocked && (
            <div className="text-xs text-gray-500 space-y-1">
              <p>✓ Unlock link opened in new tab</p>
              {canViewVideo && <p>✓ Video access granted!</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

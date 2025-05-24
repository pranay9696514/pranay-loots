"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IndianRupee, RotateCcw } from "lucide-react"

interface PriceFilterProps {
  minPrice: number
  maxPrice: number
  onPriceChange: (min: number, max: number) => void
  className?: string
}

const pricePresets = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹1500", min: 1000, max: 1500 },
  { label: "₹1500 - ₹2000", min: 1500, max: 2000 },
  { label: "₹2000 - ₹2500", min: 2000, max: 2500 },
  { label: "₹2500 - ₹3000", min: 2500, max: 3000 },
  { label: "Above ₹3000", min: 3000, max: 10000 },
]

export function PriceFilter({ minPrice, maxPrice, onPriceChange, className = "" }: PriceFilterProps) {
  const [localMin, setLocalMin] = useState(minPrice)
  const [localMax, setLocalMax] = useState(maxPrice)
  const [sliderValues, setSliderValues] = useState([minPrice, maxPrice])

  const absoluteMin = 0
  const absoluteMax = 10000

  useEffect(() => {
    setLocalMin(minPrice)
    setLocalMax(maxPrice)
    setSliderValues([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values)
    setLocalMin(values[0])
    setLocalMax(values[1])
    onPriceChange(values[0], values[1])
  }

  const handleMinInputChange = (value: string) => {
    const numValue = Number.parseInt(value) || 0
    if (numValue <= localMax && numValue >= absoluteMin) {
      setLocalMin(numValue)
      setSliderValues([numValue, localMax])
      onPriceChange(numValue, localMax)
    }
  }

  const handleMaxInputChange = (value: string) => {
    const numValue = Number.parseInt(value) || absoluteMax
    if (numValue >= localMin && numValue <= absoluteMax) {
      setLocalMax(numValue)
      setSliderValues([localMin, numValue])
      onPriceChange(localMin, numValue)
    }
  }

  const handlePresetClick = (preset: { min: number; max: number }) => {
    setLocalMin(preset.min)
    setLocalMax(preset.max)
    setSliderValues([preset.min, preset.max])
    onPriceChange(preset.min, preset.max)
  }

  const handleReset = () => {
    setLocalMin(absoluteMin)
    setLocalMax(absoluteMax)
    setSliderValues([absoluteMin, absoluteMax])
    onPriceChange(absoluteMin, absoluteMax)
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}k`
    }
    return `₹${price}`
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-stone-800 flex items-center space-x-2">
            <IndianRupee className="w-5 h-5 text-orange-600" />
            <span>Price Range</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-stone-500 hover:text-stone-700">
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range Display */}
        <div className="text-center">
          <div className="text-2xl font-bold text-stone-900 mb-2">
            {formatPrice(localMin)} - {formatPrice(localMax)}
          </div>
          <p className="text-sm text-stone-500">
            {localMin === absoluteMin && localMax === absoluteMax
              ? "All prices"
              : `${(((localMax - localMin) / (absoluteMax - absoluteMin)) * 100).toFixed(0)}% of price range`}
          </p>
        </div>

        {/* Slider */}
        <div className="px-3">
          <Slider
            value={sliderValues}
            onValueChange={handleSliderChange}
            min={absoluteMin}
            max={absoluteMax}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-stone-500 mt-2">
            <span>{formatPrice(absoluteMin)}</span>
            <span>{formatPrice(absoluteMax)}</span>
          </div>
        </div>

        {/* Manual Input */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-price" className="text-sm font-medium text-stone-700">
              Min Price
            </Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                id="min-price"
                type="number"
                value={localMin}
                onChange={(e) => handleMinInputChange(e.target.value)}
                className="pl-10"
                min={absoluteMin}
                max={localMax}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-price" className="text-sm font-medium text-stone-700">
              Max Price
            </Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                id="max-price"
                type="number"
                value={localMax}
                onChange={(e) => handleMaxInputChange(e.target.value)}
                className="pl-10"
                min={localMin}
                max={absoluteMax}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Quick Presets */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-stone-700">Quick Select</Label>
          <div className="grid grid-cols-2 gap-2">
            {pricePresets.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick(preset)}
                className={`text-xs transition-all duration-200 ${
                  localMin === preset.min && localMax === preset.max
                    ? "bg-orange-50 border-orange-300 text-orange-700"
                    : "hover:bg-stone-50"
                }`}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filter Badge */}
        {(localMin !== absoluteMin || localMax !== absoluteMax) && (
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
              Filter: {formatPrice(localMin)} - {formatPrice(localMax)}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

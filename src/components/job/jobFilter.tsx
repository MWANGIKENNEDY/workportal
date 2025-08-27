"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSearchParams } from "next/navigation"

export default function JobSearchCard() {
  const searchParams = useSearchParams()

  return (
    <Card className="rounded-lg py-4 bg-white shadow-sm mb-8">
      <CardContent className="py-2">
        <h1 className="my-2 text-2xl font-bold text-gray-900">Find jobs</h1>

        <form method="get" action="/" className="grid gap-4 md:grid-cols-3">
          {/* 🔎 Search */}
          <Input
            placeholder="Search jobs"
            name="query"
            defaultValue={searchParams.get("query") ?? ""}
          />

          {/* 🏷️ Job type */}
          <Select name="type" defaultValue={searchParams.get("type") ?? ""}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>

          {/* 📍 Location */}
          <Input
            placeholder="Location"
            name="location"
            defaultValue={searchParams.get("location") ?? ""}
          />

          {/* ✅ Checkbox group (multi-select) */}
          <div className="md:col-span-3">
            <Label className="block mb-2 font-medium">Work preference</Label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remote"
                  name="remote"
                  value="true"
                  defaultChecked={searchParams.get("remote") === "true"}
                />
                <Label htmlFor="remote">Remote</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="onsite"
                  name="onsite"
                  value="true"
                  defaultChecked={searchParams.get("onsite") === "true"}
                />
                <Label htmlFor="onsite">On-site</Label>
              </div>
            </div>
          </div>

          {/* 🎯 Radio group (single select) */}
          <div className="md:col-span-3">
            <Label className="block mb-2 font-medium">Salary range</Label>
            <RadioGroup
              name="salary"
              defaultValue={searchParams.get("salary") ?? ""}
              className="flex gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Any</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="0-50k" id="0-50k" />
                <Label htmlFor="0-50k">0 - 50k</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="50k-100k" id="50k-100k" />
                <Label htmlFor="50k-100k">50k - 100k</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="100k+" id="100k+" />
                <Label htmlFor="100k+">100k+</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 🔒 Hidden params */}
          <input type="hidden" name="page" value={searchParams.get("page") ?? "1"} />
          <input type="hidden" name="limit" value={searchParams.get("limit") ?? "5"} />

          {/* 🔘 Submit */}
          <Button
            className="md:col-span-3 bg-indigo-500 hover:bg-indigo-700 cursor-pointer"
            type="submit"
          >
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

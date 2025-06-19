// app/print/[id]/page.tsx
'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function PrintPage() {
  const { id } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (id) {
      const raw = localStorage.getItem(`Test-${id}`)
      if (raw) setData(JSON.parse(raw))
    }
  }, [id])

  if (!data) return <p>Loading...</p>

  return (
    <div className="p-10 print:p-0">
      <h1 className="text-3xl font-bold mb-4">Print Test</h1>
      <p><strong>Patient Name:</strong> {data.name}</p>
      <p><strong>Doctor:</strong> {data.doctor || "N/A"}</p>
      <p><strong>Tests:</strong> {data.test.join(", ")}</p>
      <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</p>

      <button
        onClick={() => window.print()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Print
      </button>
    </div>
  )
}

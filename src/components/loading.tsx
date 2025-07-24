import { Loader2 } from 'lucide-react'
export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <Loader2 className="h-16 w-16 animate-spin text-teal-500" />
    </div>
  )
}

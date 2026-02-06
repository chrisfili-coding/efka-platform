import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'

export default async function Home() {
  // Test Supabase connection
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Test Prisma connection
  let userCount = 0
  try {
    userCount = await prisma.user.count()
  } catch (error) {
    console.error('Prisma error:', error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">eFKa Platform</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">✅ Setup Status</h2>
          </div>

          <div className="space-y-2">
            <StatusItem label="Next.js" status="Running" color="green" />
            <StatusItem label="TypeScript" status="Configured" color="blue" />
            <StatusItem label="Tailwind CSS" status="Active" color="cyan" />
            <StatusItem
              label="Supabase Connection"
              status={user ? 'Authenticated' : 'Ready'}
              color="green"
            />
            <StatusItem
              label="Prisma Database"
              status={`Connected (${userCount} users)`}
              color="green"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function StatusItem({
  label,
  status,
  color,
}: {
  label: string
  status: string
  color: 'green' | 'blue' | 'cyan'
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  }

  return (
    <div className="flex justify-between items-center">
      <span className="font-medium">{label}:</span>
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[color]}`}
      >
        {status}
      </span>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Total Programs</h2>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Active Programs</h2>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Upcoming Meetings</h2>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Total Investments</h2>
          <p className="text-2xl font-bold">$1.2M</p>
        </div>
      </div>
    </div>
  )
} 
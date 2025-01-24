export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen font-poppins grid place-items-center">
      {children}
    </div>
  )
} 
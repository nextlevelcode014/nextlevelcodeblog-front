'use client'
export const MenuItem = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) => (
  <li>
    <button
      className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-blue-400 transition-colors"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  </li>
)

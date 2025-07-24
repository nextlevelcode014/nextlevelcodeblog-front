'use client'
export const PasswordChangeModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  isLoading,
  messageError,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  form: any
  isLoading: boolean
  messageError: Error | null
}) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold text-teal-400 mb-4">
          Change Password
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              {...form.register('oldPassword')}
              placeholder="Current Password"
              className="w-full p-2 bg-[#242424] rounded focus:ring-2 focus:ring-teal-500 outline-none"
              aria-invalid={!!form.formState.errors.oldPassword}
            />
            {form.formState.errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.oldPassword.message}
              </p>
            )}
          </div>
          {messageError && (
            <p className="text-red-500 text-sm mt-1">{messageError.message}</p>
          )}
          <div>
            <input
              type="password"
              {...form.register('newPassword')}
              placeholder="New Password"
              className="w-full p-2 bg-[#242424] rounded focus:ring-2 focus:ring-teal-500 outline-none"
              aria-invalid={!!form.formState.errors.newPassword}
            />
            {form.formState.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...form.register('newPasswordConfirm')}
              placeholder="Confirm New Password"
              className="w-full p-2 bg-[#242424] rounded focus:ring-2 focus:ring-teal-500 outline-none"
              aria-invalid={!!form.formState.errors.newPasswordConfirm}
            />
            {form.formState.errors.newPasswordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.newPasswordConfirm.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

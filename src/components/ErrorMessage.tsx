export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="mt-4 p-4 border border-red-600 rounded-lg bg-red-50">
      <p className="text-red-600 font-semibold">Error: {message}</p>
    </div>
  )
}

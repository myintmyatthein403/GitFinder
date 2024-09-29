interface CreateIssueModalProps {
  handleCreateIssue: (event: React.FormEvent<HTMLFormElement>) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  isSubmitting: boolean;
}

export const CreateIssueModal: React.FC<CreateIssueModalProps> = ({ handleCreateIssue, setIsModalOpen, isSubmitting }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-semibold mb-4">Create New Issue</h3>
        <form onSubmit={handleCreateIssue}>
          <input
            name="title"
            placeholder="Issue Title"
            className="w-full p-3 mb-5 border border-gray-300 rounded-md"
          />
          <textarea
            name="body"
            placeholder="Issue Description"
            className="w-full p-3 mb-5 border border-gray-300 rounded-md"
          ></textarea>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-3 text-white rounded-md ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
              disabled={isSubmitting}
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

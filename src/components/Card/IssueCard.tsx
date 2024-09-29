interface Issue {
  id: string;
  title: string;
  author: {
    login: string;
  };
  createdAt: string;
  body: string;
}

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <li key={issue.id} className="p-5 bg-white rounded-md shadow-sm">
      <h4 className="text-2xl font-medium flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        {issue.title}
      </h4>
      <p className="text-gray-700 flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A3.001 3.001 0 015 15V5a3 3 0 013-3h8a3 3 0 013 3v10a3 3 0 01-.121.804M12 7v4m0 4h.01"
          ></path>
        </svg>
        Created by: {issue.author.login} on{" "}
        {new Date(issue.createdAt).toDateString()}
      </p>
      <p className="text-gray-700 flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"
          ></path>
        </svg>
        {issue.body}
      </p>
    </li>
  )
}

interface RepoInformationCardProps {
  repoData: {
    repository: {
      name: string;
      description: string;
      stargazerCount: number;
      forkCount: number;
    };
  };
  userData: {
    user: {
      name: string;
    };
  };
}

export const RepoInformationCard: React.FC<RepoInformationCardProps> = ({ repoData, userData }) => {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
      <h4 className="text-3xl font-bold mb-4 text-blue-600 flex items-center">
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
        {repoData?.repository.name}
      </h4>
      <p className="text-gray-800 mb-3 flex items-center">
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
        <span className="font-semibold">Owner: </span>
        <span className="text-blue-600 text-lg">{userData?.user.name}</span>
      </p>
      <p className="text-gray-800 mb-3 flex items-center">
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
        <span className="font-semibold">Description:</span>{" "}
        {repoData?.repository.description}
      </p>
      <p className="text-gray-800 mb-3 flex items-center">
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
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"
          ></path>
        </svg>
        <span className="font-semibold">Stars:</span>{" "}
        {repoData?.repository.stargazerCount}
      </p>
      <p className="text-gray-800 mb-3 flex items-center">
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
            d="M8 12h.01M12 12h.01M16 12h.01M9 16h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"
          ></path>
        </svg>
        <span className="font-semibold">Forks:</span>{" "}
        {repoData?.repository.forkCount}
      </p>
    </div>
  )
}

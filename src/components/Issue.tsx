import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_REPO_ISSUES, CREATE_ISSUE, GET_REPO_INFO, SEARCH_USER_BY_LOGIN } from '../graphql/users/graphql';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';
import { PageNavigation } from './PageNavigation';

const Issues = ({ owner, repo }: { owner: string; repo: string }) => {
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 4
  const { loading, error, data, refetch } = useQuery(GET_REPO_ISSUES, {
    variables: { owner, name: repo, first: limit, after, before },
  });

  const { data: repoData } = useQuery(GET_REPO_INFO, {
    variables: { owner, name: repo },
  });

  const { data: userData } = useQuery(SEARCH_USER_BY_LOGIN, {
    variables: { login: owner },
  });

  const [createIssue] = useMutation(CREATE_ISSUE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const title = (e.target as any).elements.title.value;
    const body = (e.target as any).elements.body.value;
    await createIssue({ variables: { repositoryId: repoData?.repository.id, title, body } });
    (e.target as any).reset();
    refetch();
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    if (data?.repository.issues.pageInfo.hasNextPage) {
      setAfter(data?.repository.issues.pageInfo.endCursor);
      setBefore(null);
    }
  };

  const handlePrevPage = () => {
    if (data?.repository.issues.pageInfo.hasPreviousPage) {
      setBefore(data?.repository.issues.pageInfo.startCursor);
      setAfter(null);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="max-w-3xl mx-auto p-8 border border-gray-200 rounded-lg shadow-md bg-gray-50">
      <h3 className="text-3xl font-bold mb-6">Repository Information</h3>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
        <h4 className="text-3xl font-bold mb-4 text-blue-600 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          {repoData?.repository.name}
        </h4>
        <p className="text-gray-800 mb-3 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A3.001 3.001 0 015 15V5a3 3 0 013-3h8a3 3 0 013 3v10a3 3 0 01-.121.804M12 7v4m0 4h.01"></path>
          </svg>
          <span className="font-semibold">Owner: </span>
          <span className="text-blue-600 text-lg">{userData?.user.name}</span>
        </p>
        <p className="text-gray-800 mb-3 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"></path>
          </svg>
          <span className="font-semibold">Description:</span> {repoData?.repository.description}
        </p>
        <p className="text-gray-800 mb-3 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"></path>
          </svg>
          <span className="font-semibold">Stars:</span> {repoData?.repository.stargazerCount}
        </p>
        <p className="text-gray-800 mb-3 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M9 16h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"></path>
          </svg>
          <span className="font-semibold">Forks:</span> {repoData?.repository.forkCount}
        </p>
      </div>
      <div className="flex items-center mb-6">
        <h3 className="text-3xl font-bold">Open Issues</h3>
        <button onClick={() => setIsModalOpen(true)} className="ml-auto px-5 py-3 text-white bg-green-500 hover:bg-green-600 rounded-md">Create New Issue</button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                  className={`px-5 py-3 text-white rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                  disabled={isSubmitting}
                >
                  Create Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ul className="space-y-6">
        {data.repository.issues.nodes.map((issue: any) => (
          <li key={issue.id} className="p-5 bg-white rounded-md shadow-sm">
            <h4 className="text-2xl font-medium flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              {issue.title}
            </h4>
            <p className="text-gray-700 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A3.001 3.001 0 015 15V5a3 3 0 013-3h8a3 3 0 013 3v10a3 3 0 01-.121.804M12 7v4m0 4h.01"></path>
              </svg>
              Created by: {issue.author.login} on {new Date(issue.createdAt).toDateString()}
            </p>
            <p className="text-gray-700 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"></path>
              </svg>
              {issue.body}
            </p>
          </li>
        ))}
        <PageNavigation
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          pageInfo={data?.repository.issues.pageInfo}
          totalCount={data?.repository.issues.totalCount}
          itemsPerPage={limit}
          limit={limit}
          currentPage={after ? Math.ceil(after / limit) + 1 : 1}
          totalPages={Math.ceil(data?.repository.issues.totalCount / limit)}
        />
      </ul>
    </div>
  );
};

export default Issues;

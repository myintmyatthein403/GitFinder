import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_REPO_ISSUES,
  CREATE_ISSUE,
  GET_REPO_INFO,
  SEARCH_USER_BY_LOGIN,
} from "../graphql/users/graphql";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";
import { PageNavigation } from "./PageNavigation";
import { RepoInformationCard } from "./Card/RepoInformationCard";
import { CreateIssueModal } from "./Modal/CreateIssueModal";
import { IssueCard } from "./Card/IssueCard";

const Issues = ({ owner, repo }: { owner: string; repo: string }) => {
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;
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
    await createIssue({
      variables: { repositoryId: repoData?.repository.id, title, body },
    });
    (e.target as any).reset();
    refetch();
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    if (data?.repository.issues.pageInfo.hasNextPage) {
      setCurrentPage(currentPage + 1);
      setAfter(data?.repository.issues.pageInfo.endCursor);
      setBefore(null);
    }
  };

  const handlePrevPage = () => {
    if (data?.repository.issues.pageInfo.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
      setBefore(data?.repository.issues.pageInfo.startCursor);
      setAfter(null);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="max-w-3xl mx-auto p-8 border border-gray-200 rounded-lg shadow-md bg-gray-50">
      <h3 className="text-3xl font-bold mb-6">Repository Information</h3>
      <RepoInformationCard repoData={repoData} userData={userData} />
      <div className="flex items-center mb-6">
        <h3 className="text-3xl font-bold">Open Issues</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-auto px-5 py-3 text-white bg-green-500 hover:bg-green-600 rounded-md"
        >
          Create New Issue
        </button>
      </div>

      <ul className="space-y-6">
        {data.repository.issues.nodes.map((issue: any) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
        <PageNavigation
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          pageInfo={data?.repository.issues.pageInfo}
          totalCount={data?.repository.issues.totalCount}
          itemsPerPage={limit}
          limit={limit}
          currentPage={currentPage}
          totalPages={Math.ceil(data?.repository.issues.totalCount / limit)}
        />
      </ul>

      {isModalOpen && (
        <CreateIssueModal handleCreateIssue={handleCreateIssue} setIsModalOpen={setIsModalOpen} isSubmitting={isSubmitting} />
      )}
    </div>
  );
};

export default Issues;

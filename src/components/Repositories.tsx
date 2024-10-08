import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_REPOS } from "../graphql/users/graphql";
import { Loading } from "./Loading";
import { PageNavigation } from "./PageNavigation";
import { NameCard } from "./Card/NameCard";
import { RepoCard } from "./Card/RepoCard";
import { ErrorMessage } from "./ErrorMessage";

const Repositories = ({ login }: { login: string }) => {
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;
  const { loading, error, data } = useQuery(GET_USER_REPOS, {
    variables: { login, first: limit, after, before },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleNextPage = () => {
    if (data?.user.repositories.pageInfo.hasNextPage) {
      setCurrentPage(currentPage + 1);
      setAfter(data.user.repositories.pageInfo.endCursor);
      setBefore(null);
    }
  };

  const handlePrevPage = () => {
    if (data?.user.repositories.pageInfo.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
      setBefore(data.user.repositories.pageInfo.startCursor);
      setAfter(null);
    }
  };

  return (
    <div className="max-w-2xl h-screen mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <NameCard name={login} pathName={"Repositories"} />
      <ul className="space-y-4">
        {data.user.repositories.nodes.map((repo: any) => (
          <RepoCard key={repo.id} repo={repo} name={login} />
        ))}
      </ul>
      <PageNavigation
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        pageInfo={data?.user?.repositories?.pageInfo}
        totalCount={data?.user?.repositories?.totalCount}
        limit={limit}
        itemsPerPage={limit}
        currentPage={currentPage}
        totalPages={Math.ceil(data?.user?.repositories.totalCount / limit)}
      />
    </div>
  );
};

export default Repositories;

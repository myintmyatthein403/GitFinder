import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_USER_REPOS } from '../graphql/users/graphql';
import { Loading } from './Loading';
import { PageNavigation } from './PageNavigation';
import { NameCard } from './NameCard';
import { RepoCard } from './RepoCard';

const Repositories = ({ login }: { login: string }) => {
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const limit = 5;
  const { loading, error, data } = useQuery(GET_USER_REPOS, {
    variables: { login, first: limit, after, before },
  });



  if (loading) return <Loading />
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const handleNextPage = () => {
    if (data?.user.repositories.pageInfo.hasNextPage) {
      setAfter(data.user.repositories.pageInfo.endCursor);
      setBefore(null);
    }
  };

  const handlePrevPage = () => {
    if (data?.user.repositories.pageInfo.hasPreviousPage) {
      setBefore(data.user.repositories.pageInfo.startCursor);
      setAfter(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <NameCard name={login} pathName={'Repositories'} />
      <ul className="space-y-4">
        {data.user.repositories.nodes.map((repo: any) => (
          <RepoCard key={repo.id} repo={repo} name={login} />
        ))}
      </ul>
      <PageNavigation
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        pageInfo={data?.user?.repositories?.pageInfo}
      />
    </div>
  );
};

export default Repositories;

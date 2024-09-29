import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../graphql/users/graphql";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";
import { UserCard } from "./UserCard";
import { PageNavigation } from "./PageNavigation";
import { SearchForm } from "./SearchForm";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { loading, error, data } = useQuery(SEARCH_USERS, {
    variables: { query: searchTerm, first: limit, after, before },
    skip: searchTerm === "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      elements: { text: { value: string } };
    };
    setSearchTerm(target.elements.text.value);
    setAfter(null); // Reset to first page on new search
    setBefore(null); // Reset to first page on new search
  };

  const handleNextPage = () => {
    if (data?.search.pageInfo.hasNextPage) {
      setCurrentPage(currentPage + 1);
      setAfter(data.search.pageInfo.endCursor);
      setBefore(null);
    }
  };

  const handlePrevPage = () => {
    if (data?.search.pageInfo.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
      setBefore(data.search.pageInfo.startCursor);
      setAfter(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <SearchForm handleSearch={handleSearch} />
      {loading && <Loading />}
      {error && <ErrorMessage message={error?.message} />}
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.search.edges.map((user: { node: any }, index: number) => (
          <UserCard key={index} user={user.node} />
        ))}
      </ul>
      <PageNavigation
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        pageInfo={data?.search.pageInfo}
        totalCount={data?.search.userCount}
        itemsPerPage={limit}
        limit={limit}
        currentPage={currentPage}
        totalPages={Math.ceil(data?.search.userCount / limit)}
      />
    </div>
  );
};

export default SearchUser;

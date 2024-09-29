import { useQuery } from "@apollo/client";
import { SEARCH_USER_BY_LOGIN } from "../graphql/users/graphql";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";

interface NameCardProps {
  name: string;
  pathName: string
}

export const NameCard = ({ name, pathName }: NameCardProps) => {
  const { loading, error, data } = useQuery(SEARCH_USER_BY_LOGIN, {
    variables: { login: name },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="flex items-center mb-4">
      <img src={data.user.avatarUrl} alt={`${data.user.login} avatar`} className="w-12 h-12 rounded-full mr-4" />
      <h3 className="text-xl font-bold">{data.user.login}'s {pathName}</h3>
    </div>
  )
}

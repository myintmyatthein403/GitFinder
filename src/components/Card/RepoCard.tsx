interface Repo {
  name: string;
  description: string;
}

interface RepoCardProps {
  repo: Repo;
  name: string;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo, name }) => {
  return (
    <li key={repo.name} className="border p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer">
      <a href={`/users/${name}/${repo.name}`} className="no-underline">
        <h4 className="text-lg font-semibold text-blue-600">{repo.name}</h4>
        <p className="text-gray-700">{repo.description ? repo.description : "No description available"}</p>
      </a>
    </li>
  )
}

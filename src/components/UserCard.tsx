interface Node {
  login: string;
  avatarUrl: string;
}

export const UserCard = ({ user }: { user: Node }) => {
  return (
    <li key={user?.login} className="flex flex-col items-center p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <a href={`/users/${user?.login}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
        <img src={user?.avatarUrl} alt={user?.login} className="w-24 h-24 rounded-full mb-4 border-2 border-blue-500" />
        <span className="text-gray-900 font-semibold text-lg">{user?.login}</span>
      </a>
    </li>
  )
}

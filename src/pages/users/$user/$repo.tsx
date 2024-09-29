import { useParams } from "react-router-dom"
import Issue from "./../../../components/Issue"
import { ErrorMessage } from "../../../components/ErrorMessage"

export default function IssuePage() {
  const { user, repo } = useParams()
  if (!user || !repo) {
    return <ErrorMessage message={"Error: Missing user or repo parameter"} />
  }
  return (
    <div>
      <Issue owner={user} repo={repo} />
    </div>
  )
}

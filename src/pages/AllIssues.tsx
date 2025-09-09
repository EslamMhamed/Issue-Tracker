import { useEffect, useState } from "react"

type Issue = {
  id: string,
  title: string,
  description: string,
  status: "open" | "closed",
  createdAt : string,
  updatedAt : string,
  wasEditedInOPenPage: boolean
}

const sortedByUpdatedAt = (issues: Issue[]) =>
  issues.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  function loadIssues(): Issue[] {
  const data = localStorage.getItem("issues");
  return data ? JSON.parse(data) : [];
}

function saveIssues(issues: Issue[]): void {
  localStorage.setItem("issues", JSON.stringify(issues));
}

function AllIssues() {

  const [issues, setIssues] = useState<Issue[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  function addIssue(title: string, description: string){
    const now = new Date().toISOString()
    const newIssue :Issue = {
      id: crypto.randomUUID() ,
      title,
      description,    
      status: "open",
      createdAt: now  ,
      updatedAt: now,
      wasEditedInOPenPage:false
    }
    issues.push(newIssue)
    const updatedIssues = [...issues, newIssue]
    saveIssues(issues)
    setIssues(sortedByUpdatedAt(updatedIssues))
  }

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()

    if(title.trim() && description.trim()){
      addIssue(title.trim(),description.trim() )
      setTitle("")
      setDescription("")
    }
  }

    useEffect(() => {
    const loadedIssues = loadIssues();
    setIssues(sortedByUpdatedAt(loadedIssues));
  }, []);

  function deleteIssue(id: string){
    const updatedIssues = issues.filter(issue => issue.id !== id)
    saveIssues(updatedIssues)
    setIssues(updatedIssues)
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Create a New Issue</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4 lg:max-w-xl">
        <div className="space-y-2">
          <label htmlFor="title" className="font-bold">Title</label>
          <input value={title} onChange={(e)=>{setTitle(e.target.value)}}
            type="text"
            className="w-full px-3 py-2 border border-slate-400 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-bold">Description</label>
          <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}
            className="w-full px-3 py-2 border border-slate-400 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
            rows={3}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Issue
        </button>
      </form>

      <section
        id="issues-list"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {issues.map((issue)=> (
            <IssueCard key={issue.id} issue={issue} onDelete={deleteIssue} />
          ))}
      </section>
    </>
  )
}

export default AllIssues
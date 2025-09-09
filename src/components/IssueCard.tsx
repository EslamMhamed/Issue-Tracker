import { useLocation } from "react-router-dom"
import type { Issue } from "../pages/AllIssues"
import { useState } from "react"
import ViewModal from "./ViewModal"

type IssueCardProps = {
    issue : Issue,
    onDelete : (id:string) => void
}

function IssueCard({issue, onDelete}: IssueCardProps) {
    const [showViewModal, setShowViewModel] = useState(false)
    const location = useLocation()
    const isAllIssuesPage = location.pathname === "/"

    const truncatedDescription = (desc:string, maxLength = 50) =>{
        if(desc.length <= maxLength) return desc

        return desc.slice(0,maxLength) + "..."
    }

  return (
    <>
        <div className="grid 2xl:grid-rows-subgrid 2xl:row-span-5 gap-4 items-start p-4 border border-gray-300 dark:border-gray-700 rounded">
            <div className="grid grid-cols-4 items-center">
                {
                    issue.wasEditedInOPenPage && (
                        <p className="text-sm text-blue-500 dark:text-blue-400 col-span-3">
                    Last Edited : ${new Date(issue.updatedAt).toLocaleString()}
                </p>
                    )
                }
                {isAllIssuesPage && (
                        <p className="p-2 text-sm rounded text-center justify-self-end col-start-4 bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200">
                    open</p>)
                }
            </div>
            <h2 className="font-bold text-lg">{issue.title}</h2>
            <p>{isAllIssuesPage ? truncatedDescription(issue.description) : issue.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Created : {new Date(issue.createdAt).toLocaleString()}
            </p>
            <div className="flex gap-2 flex-wrap">
                <button onClick={()=> onDelete(issue.id)} className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-700 transition-colors">
                    Delete
                </button>
                {isAllIssuesPage && issue.description.length> 50 &&
                    <button onClick={()=> setShowViewModel(true)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 ">
                    View
                </button>
                }
            </div>
        </div>

        {
            showViewModal && (
                <ViewModal title = {issue.title} description ={issue.description} onClose = {()=> setShowViewModel(false)} />
            )
        }
    </>
  )
}

export default IssueCard
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import searchData from "@/lib/search";
import Fuse from "fuse.js";
import Link from "next/link";
import { useState, useEffect } from "react";

const options = {
    keys: ['label' , 'description', 'keywords'],
    threshold: 0.3
}

const SearchModel = ({ open, setOpen }) => {
    const [query, setQuery] = useState('')
    const [results, setResult] = useState([])

    const fuse = new Fuse(searchData, options )

    useEffect(() => {
        if(query.trim() === "" ){
            setResult([])
        }
    
    const res = fuse.search(query)
    setResult(res.map((r) => r.item))
    // console.log(res)
    }, [query])

    return (
        <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quick Search</DialogTitle>
                    <DialogDescription>
                        Find and navigate to any admin section instantly. Type a keyword to get started.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="mt-4 w-full rounded-md"
                />
                <ul className="mt-4 max-h-60 overflow-y-auto">
                    {results.map((item, index) => (
                     <li key={index}>
                        <Link
                            href={item.url}
                            className="block py-2 px-3 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-800 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {item.label}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {item.description}  </p>
                        </Link>
                    </li>
                    ))}

                    {query && results.length === 0 &&
                     <div className="text-sm text-center text-pink-500 text-muted-foreground">
                        No Result Found.
                     </div>
                    }
                </ul>


            </DialogContent>
        </Dialog>
    )
}

export default SearchModel;
//https://www.fusejs.io/
//npm install fuse.js


// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// const SearchModel = (open, setOpen) => {
//     return (
//         <Dialog open={open} onOpenChange = {() => setOpen (!open)}>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Quick Search</DialogTitle>
//                     <DialogDescription>
//                         Find and navigate to any admin section instantly. Type a keyword to get started.
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default SearchModel

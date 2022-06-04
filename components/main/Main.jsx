import Image from 'next/image'
import React from 'react'


const Main = ({products}) => {
  console.log(products)
  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-between items-center mb-4">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">SOLICITUDES DE COMPRA</h5>
      <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
        View all
      </a>
    </div>
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                  </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@windster.com
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $320
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                    </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Bonnie Green
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@windster.com
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $3467
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                     </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Michael Gough
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@windster.com
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $67
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                  </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Lana Byrd
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@windster.com
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $367
            </div>
          </div>
        </li>
        <li className="pt-3 pb-0 sm:pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                    </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Thomes Lean
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@windster.com
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $2367
            </div>
          </div>
        </li>
      </ul>
    </div>
    <a href="#" className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
      Previous
    </a>
    <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      Next
      <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </a>
  </div>
  )
}

export default Main
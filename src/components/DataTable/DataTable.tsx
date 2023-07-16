/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTable, TableInstance } from 'react-table';

interface Props {
   data: any;
   columns: any;
   deleteSingleURL?: string;
   dispatchFunction?: any;
}

const DataTable = ({ data, columns }: Props) => {
   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
   }: TableInstance<object> | any = useTable({ data, columns });

   return (
      <div className='w-full mx-auto h-full'>
         <div className='overflow-x-auto overflow-y-auto w-full h-full whitespace-nowrap'>
            <table {...getTableProps()} className='w-full text-sm font-inter'>
               <thead>
                  {
                     // Loop over the header rows
                     headerGroups.map((headerGroup: any, index: any) => (
                        // Apply the header row props
                        <tr
                           key={index}
                           {...headerGroup.getHeaderGroupProps()}
                           className='sticky bg-gray-100 top-0 w-full z-[2]'
                        >
                           {
                              // Loop over the headers in each row
                              headerGroup.headers.map((column: any) => {
                                 // Apply the header cell props
                                 return (
                                    <th
                                       {...column.getHeaderProps()}
                                       className={`py-3 pl-3 text-start font-semibold text-[13px] `}
                                       style={{
                                          minWidth: '10.5rem',
                                       }}
                                    >
                                       {
                                          // Render the header
                                          column.render('Header')
                                       }
                                    </th>
                                 );
                              })
                           }
                        </tr>
                     ))
                  }
               </thead>
               {/* Apply the table body props */}
               <tbody {...getTableBodyProps()}>
                  {
                     // Loop over the table rows
                     rows.map((row: any, index: any) => {
                        // Prepare the row for display
                        prepareRow(row);
                        return (
                           // Apply the row props
                           <tr
                              key={index}
                              {...row.getRowProps()}
                              className={`border-b border-gray-300 group hover:bg-gray-100 w-full`}
                           >
                              {
                                 // Loop over the rows cells
                                 row.cells.map((cell: any, index: any) => {
                                    // Apply the cell props
                                    return (
                                       <td
                                          key={index}
                                          {...cell.getCellProps()}
                                          className={`py-3 pl-3`}
                                       >
                                          {
                                             // Render the cell contents
                                             cell.render('Cell')
                                          }
                                       </td>
                                    );
                                 })
                              }
                           </tr>
                        );
                     })
                  }
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default DataTable;

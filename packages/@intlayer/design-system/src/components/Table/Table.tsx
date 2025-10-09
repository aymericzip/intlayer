'use client';

import { MoveDiagonal } from 'lucide-react';
import { type FC, type HTMLAttributes, useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { ExpandCollapse } from '../ExpandCollapse';
import { Modal, ModalSize } from '../Modal';

/**
 * Properties for the Table component that extends standard HTML table attributes
 *
 * @interface TableProps
 * @extends {HTMLAttributes<HTMLTableElement>}
 *
 * @property {boolean} [isRollable] - Whether the table content can be collapsed/expanded using the ExpandCollapse wrapper
 * @property {string} [className] - Additional CSS classes for custom styling
 * @property {ReactNode} children - The table content including thead, tbody, tfoot elements
 *
 * @example
 * ```tsx
 * // Basic table usage
 * <Table>
 *   <thead>
 *     <tr>
 *       <th>Name</th>
 *       <th>Email</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>John Doe</td>
 *       <td>john@example.com</td>
 *     </tr>
 *   </tbody>
 * </Table>
 *
 * // Collapsible table with custom styling
 * <Table isRollable className="border border-gray-300 rounded-lg">
 *   <thead>
 *     <tr>
 *       <th>Product</th>
 *       <th>Price</th>
 *       <th>Stock</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>Laptop</td>
 *       <td>$999</td>
 *       <td>15</td>
 *     </tr>
 *   </tbody>
 * </Table>
 * ```
 */
type TableProps = HTMLAttributes<HTMLTableElement> & {
  isRollable?: boolean;
  displayModal?: boolean;
};

/**
 * Table component that provides an enhanced table experience with modal expansion and collapsible content
 *
 * The Table component wraps a standard HTML table element with additional functionality:
 * - **Modal Expansion**: Click the diagonal arrow button to view the table in a full-screen modal
 * - **Collapsible Content**: Optionally wrap content in an ExpandCollapse component for space-saving
 * - **Responsive Design**: Handles large tables gracefully with modal overflow
 * - **Sticky Controls**: Table controls remain accessible even when scrolling
 *
 * ## Features
 * - **Modal View**: Full-screen modal for better viewing of large tables
 * - **Expand/Collapse**: Optional collapsible wrapper to save space
 * - **Responsive**: Handles overflow and responsive behavior automatically
 * - **Accessibility**: Maintains proper table semantics and keyboard navigation
 * - **Customizable**: Supports all standard HTML table attributes and styling
 *
 * ## Best Practices
 * - Use semantic HTML table structure (thead, tbody, tfoot)
 * - Provide proper column headers with scope attributes
 * - Use the isRollable prop for large tables that might need space management
 * - Apply consistent styling through the className prop
 * - Consider pagination for very large datasets
 *
 * @param {TableProps} props - The properties for the Table component
 * @returns {JSX.Element} The rendered table with enhanced functionality
 *
 * @example
 * ```tsx
 * // Simple data table
 * <Table>
 *   <thead>
 *     <tr>
 *       <th scope="col">Name</th>
 *       <th scope="col">Email</th>
 *       <th scope="col">Status</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>John Doe</td>
 *       <td>john@example.com</td>
 *       <td>
 *         <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
 *           Active
 *         </span>
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>Jane Smith</td>
 *       <td>jane@example.com</td>
 *       <td>
 *         <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
 *           Pending
 *         </span>
 *       </td>
 *     </tr>
 *   </tbody>
 * </Table>
 *
 * // Large collapsible table with custom styling
 * <Table
 *   isRollable
 *   className="border border-gray-200 rounded-lg overflow-hidden"
 * >
 *   <thead className="bg-gray-50">
 *     <tr>
 *       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
 *         Product ID
 *       </th>
 *       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
 *         Name
 *       </th>
 *       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
 *         Category
 *       </th>
 *       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
 *         Price
 *       </th>
 *       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
 *         Stock
 *       </th>
 *     </tr>
 *   </thead>
 *   <tbody className="bg-white divide-y divide-gray-200">
 *     {products.map((product) => (
 *       <tr key={product.id} className="hover:bg-gray-50">
 *         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
 *           #{product.id}
 *         </td>
 *         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
 *           {product.name}
 *         </td>
 *         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
 *           {product.category}
 *         </td>
 *         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
 *           ${product.price.toFixed(2)}
 *         </td>
 *         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
 *           {product.stock} units
 *         </td>
 *       </tr>
 *     ))}
 *   </tbody>
 * </Table>
 *
 * // Financial data table with formatted numbers
 * <Table className="w-full border-collapse">
 *   <thead>
 *     <tr className="border-b-2 border-gray-300">
 *       <th scope="col" className="text-left py-3 px-4">Quarter</th>
 *       <th scope="col" className="text-right py-3 px-4">Revenue</th>
 *       <th scope="col" className="text-right py-3 px-4">Profit</th>
 *       <th scope="col" className="text-right py-3 px-4">Growth</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr className="border-b border-gray-200">
 *       <td className="py-3 px-4 font-medium">Q1 2024</td>
 *       <td className="py-3 px-4 text-right">$2,450,000</td>
 *       <td className="py-3 px-4 text-right text-green-600">$345,000</td>
 *       <td className="py-3 px-4 text-right text-green-600">+12.5%</td>
 *     </tr>
 *     <tr className="border-b border-gray-200">
 *       <td className="py-3 px-4 font-medium">Q2 2024</td>
 *       <td className="py-3 px-4 text-right">$2,780,000</td>
 *       <td className="py-3 px-4 text-right text-green-600">$398,000</td>
 *       <td className="py-3 px-4 text-right text-green-600">+13.5%</td>
 *     </tr>
 *   </tbody>
 * </Table>
 * ```
 *
 * @see {@link ExpandCollapse} - Component used for collapsible table content
 * @see {@link Modal} - Component used for full-screen table view
 * @see {@link Button} - Component used for the modal trigger button
 */
export const Table: FC<TableProps> = ({
  className,
  isRollable,
  displayModal,
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      {displayModal && (
        <div className="sticky top-48 z-10">
          <div className="absolute top-4 right-2">
            <Button
              variant="hoverable"
              size="icon-md"
              onClick={() => {
                setIsModalOpen(true);
              }}
              label="Move"
              Icon={MoveDiagonal}
            />
          </div>
        </div>
      )}
      <ExpandCollapse
        isRollable={isRollable}
        className="max-w-full overflow-x-auto"
      >
        <table
          className={cn(
            'min-w-full max-w-full table-auto overflow-x-auto bg-background text-left',
            className
          )}
          {...props}
        />
      </ExpandCollapse>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={ModalSize.XL}
        hasCloseButton
      >
        {isModalOpen ? (
          <div className="grid">
            <table
              className={cn(
                'min-w-full max-w-full table-auto text-left',
                className
              )}
              {...props}
            />
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

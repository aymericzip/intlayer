import type { NextPageIntlayer } from 'next-intlayer';

const AdminUsersPage: NextPageIntlayer = async () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                User Management System
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                This is a placeholder for the user management interface. Here
                you would be able to:
              </p>
              <div className="text-left max-w-md mx-auto">
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View all registered users
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Manage user roles and permissions
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Create and delete user accounts
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Monitor user activity
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Handle user support requests
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;

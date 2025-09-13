import type { NextPageIntlayer } from 'next-intlayer';

const AdminSystemPage: NextPageIntlayer = async () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          System Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure system-wide settings and monitor platform health
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                System Administration
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                This is a placeholder for the system administration interface.
                Here you would be able to:
              </p>
              <div className="text-left max-w-md mx-auto">
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Monitor system health and performance
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Configure global platform settings
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Manage system-wide features and flags
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View system logs and analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Handle maintenance and updates
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

export default AdminSystemPage;

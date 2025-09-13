import { PagesRoutes } from '@/Routes';
import type { NextPageIntlayer } from 'next-intlayer';
import Link from 'next/link';

const AdminPage: NextPageIntlayer = async () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Manage your Intlayer platform from this central administration
            panel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Link
              href={PagesRoutes.Admin_Users}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="text-blue-500 text-4xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  User Management
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage user accounts, roles, and permissions
                </p>
              </div>
            </Link>

            <Link
              href={PagesRoutes.Admin_Organizations}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="text-green-500 text-4xl mb-4">🏢</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Organizations
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage organizations and their members
                </p>
              </div>
            </Link>

            <Link
              href={PagesRoutes.Admin_Projects}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="text-purple-500 text-4xl mb-4">📁</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Projects
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage projects and configurations
                </p>
              </div>
            </Link>

            <Link
              href={PagesRoutes.Admin_System}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="text-red-500 text-4xl mb-4">⚙️</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  System Settings
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure system-wide settings
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

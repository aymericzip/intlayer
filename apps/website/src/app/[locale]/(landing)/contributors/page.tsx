'use client';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { useEffect, useState } from 'react';
import ContributorsList from '@/components/Contributors/ContributorsList';

const ContributorsPage = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/aymericzip/intlayer/contributors'
        );
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <BackgroundLayout>
      <div className="flex min-h-screen w-full flex-col items-center px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          {/* Headers */}
          <div className="relative mb-12 text-center">
            <p className="mb-3 font-medium text-base text-neutral-400 sm:text-lg">
              Meet our amazing
            </p>
            <h1 className="font-bold text-5xl text-neutral-900 sm:text-6xl md:text-7xl dark:text-neutral-100">
              Contributors
            </h1>
          </div>

          {/* Contributors List */}
          <ContributorsList contributors={contributors} />
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default ContributorsPage;

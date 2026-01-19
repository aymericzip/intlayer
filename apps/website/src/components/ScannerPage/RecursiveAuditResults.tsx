'use client';

import { Tag } from '@intlayer/design-system';
import type { FC } from 'react';
import { memo } from 'react';

type RecursiveAuditResultsProps = {
  status: {
    job: {
      status: string;
      progress: number;
      totalPageCount: number;
      completedPageCount: number;
    };
    pages: {
      url: string;
      status: string;
      score?: number;
      error?: string;
    }[];
  };
};

export const RecursiveAuditResults: FC<RecursiveAuditResultsProps> = memo(
  ({ status }) => {
    const { job, pages } = status;

    return (
      <div className="mt-6 flex flex-col gap-4 border-neutral border-t border-dashed pt-6 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Full Site Audit Progress</h3>
          <Tag color={job.status === 'completed' ? 'success' : 'warning'}>
            {job.status}
          </Tag>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm text-text/70">
            <span>Progress</span>
            <span>{job.progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral/20">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${job.progress}%` }}
            />
          </div>
          <div className="text-text/50 text-xs">
            {job.completedPageCount} / {job.totalPageCount} pages audited
          </div>
        </div>

        <div className="max-h-96 overflow-auto rounded-xl border border-neutral/20 bg-card/50">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-card shadow-sm">
              <tr>
                <th className="p-3">URL</th>
                <th className="p-3">Status</th>
                <th className="p-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, index) => (
                <tr key={index} className="border-neutral/10 border-t">
                  <td className="max-w-xs truncate p-3 font-mono text-xs">
                    {page.url}
                  </td>
                  <td className="p-3">
                    <Tag
                      color={
                        page.status === 'completed'
                          ? 'success'
                          : page.status === 'failed'
                            ? 'error'
                            : 'warning'
                      }
                      size="sm"
                    >
                      {page.status}
                    </Tag>
                  </td>
                  <td className="p-3 font-semibold">
                    {page.score !== undefined ? `${page.score}/100` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

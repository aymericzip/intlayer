'use client';

import {
  Button,
  Checkbox,
  Container,
  Loader,
  Modal,
  SearchInput,
} from '@intlayer/design-system';
import { useGetTags } from '@intlayer/design-system/hooks';
import { type FC, useState } from 'react';

type TagAPI = {
  key: string;
  name?: string;
};

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  params: any;
  setParam: (key: any, value: any) => void;
  setParams: (updates: any) => void;
  locationOptions: any;
  tableHeaders: any;
  filterLabels: any;
};

export const FiltersModal: FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  params,
  setParam,
  setParams,
  locationOptions,
  tableHeaders,
  filterLabels,
}) => {
  const [tagSearch, setTagSearch] = useState('');
  const { data: tagsData, isLoading: isLoadingTags } = useGetTags({
    pageSize: 100,
  });

  const allTags = (tagsData?.data ?? []) as TagAPI[];

  const filteredTags = allTags.filter(
    (tag) =>
      tag.key.toLowerCase().includes(tagSearch.toLowerCase()) ||
      (tag.name?.toLowerCase() ?? '').includes(tagSearch.toLowerCase())
  );

  const activeTags = params.tags ? (params.tags as string).split(',') : [];

  const activeLocations =
    params.location === 'none'
      ? []
      : params.location === 'both'
        ? ['remote', 'local']
        : params.location === 'remote'
          ? ['remote']
          : ['local'];

  const handleClearAll = () => {
    setParams({
      location: 'none',
      tags: null,
    });
    onClose();
  };

  const handleTagToggle = (tagKey: string) => {
    let newTags: string[];
    if (activeTags.includes(tagKey)) {
      newTags = activeTags.filter((t: string) => t !== tagKey);
    } else {
      newTags = [...activeTags, tagKey];
    }
    setParam('tags', newTags.length > 0 ? newTags.join(',') : null);
  };

  const handleLocationToggle = (locationKey: 'remote' | 'local') => {
    let newLocations: string[];
    if (activeLocations.includes(locationKey)) {
      newLocations = activeLocations.filter((l: string) => l !== locationKey);
    } else {
      newLocations = [...activeLocations, locationKey];
    }

    let newLocationValue: string;
    if (newLocations.length === 0) {
      newLocationValue = 'none';
    } else if (newLocations.length === 2) {
      newLocationValue = 'both';
    } else {
      newLocationValue = newLocations[0];
    }

    setParam('location', newLocationValue);
  };

  const hasAppliedFilters = params.location !== 'none' || !!params.tags;

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="lg">
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">{filterLabels.title}</h2>
          {hasAppliedFilters && (
            <Button
              variant="hoverable"
              color="text"
              size="sm"
              onClick={handleClearAll}
              label={filterLabels.clearAll.value}
            >
              {filterLabels.clearAll}
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-medium text-sm">{tableHeaders.location}</div>
          <Container
            background="none"
            border
            borderColor="card"
            roundedSize="xl"
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <Checkbox
                id="location-remote"
                name="location-remote"
                checked={activeLocations.includes('remote')}
                onChange={() => handleLocationToggle('remote')}
              />
              <label
                htmlFor="location-remote"
                className="cursor-pointer text-sm"
              >
                {locationOptions.remote.value}
              </label>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                id="location-local"
                name="location-local"
                checked={activeLocations.includes('local')}
                onChange={() => handleLocationToggle('local')}
              />
              <label
                htmlFor="location-local"
                className="cursor-pointer text-sm"
              >
                {locationOptions.local.value}
              </label>
            </div>
          </Container>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-medium text-sm">{tableHeaders.tags}</div>
          <SearchInput
            placeholder={filterLabels.searchTagsPlaceholder.value}
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
          />
          <Loader isLoading={isLoadingTags}>
            <Container
              background="none"
              border
              borderColor="card"
              roundedSize="xl"
              className="flex max-h-40 flex-col gap-4 overflow-y-auto"
            >
              {filteredTags.map((tag) => (
                <div key={tag.key} className="flex items-center gap-4">
                  <Checkbox
                    id={`tag-${tag.key}`}
                    name={`tag-${tag.key}`}
                    checked={activeTags.includes(tag.key)}
                    onChange={() => handleTagToggle(tag.key)}
                  />
                  <label
                    htmlFor={`tag-${tag.key}`}
                    className="cursor-pointer text-sm"
                  >
                    {tag.name || tag.key}
                  </label>
                </div>
              ))}
              {filteredTags.length === 0 && (
                <span className="py-2 text-center text-neutral-500 text-sm">
                  {filterLabels.noTagsFound}
                </span>
              )}
            </Container>
          </Loader>
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <Button
            onClick={onClose}
            label={filterLabels.close.value}
            variant="outline"
            color="text"
          >
            {filterLabels.close}
          </Button>
          <Button
            onClick={onClose}
            label={filterLabels.apply.value}
            color="text"
          >
            {filterLabels.apply}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

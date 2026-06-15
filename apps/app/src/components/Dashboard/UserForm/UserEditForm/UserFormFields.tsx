import { Badge } from '@intlayer/design-system/badge';
import { Form, FormInput, FormMultiSelect } from '@intlayer/design-system/form';
import { MultiSelect } from '@intlayer/design-system/select';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

interface UserFormFieldsProps {
  organizations: any[];
  isLastMemberInOrg: (orgId: string) => boolean;
  getOrganizationName: (value: string) => string;
}

export const UserFormFields: FC<UserFormFieldsProps> = ({
  organizations,
  isLastMemberInOrg,
  getOrganizationName,
}) => {
  const { formLabels } = useIntlayer('user-edit-form');

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormInput
        name="name"
        id="user-edit-name-input"
        label={formLabels.name.value}
        placeholder={formLabels.namePlaceholder.value}
        isRequired
      />

      <FormInput
        name="email"
        type="email"
        id="user-edit-email-input"
        label={formLabels.email.value}
        placeholder={formLabels.emailPlaceholder.value}
        isRequired
      />

      <FormMultiSelect
        name="organizationIds"
        id="user-edit-organizations-input"
        label={formLabels.organizations.value}
        placeholder={formLabels.organizationsPlaceholder.value}
        className=""
      >
        <MultiSelect.Trigger
          getBadgeValue={(value) => getOrganizationName(value)}
        >
          <MultiSelect.Input
            placeholder={formLabels.organizationsPlaceholder.value}
          />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.List>
            {organizations.map((org: any) => {
              const isLastMember = isLastMemberInOrg(org.id);
              return (
                <MultiSelect.Item key={org.id} value={org.id}>
                  <div className="flex w-full items-center justify-between">
                    <span>{org.name}</span>
                    {isLastMember && (
                      <Badge
                        variant="outline"
                        color="error"
                        className="ml-2 text-xs"
                      >
                        {formLabels.lastMember}
                      </Badge>
                    )}
                  </div>
                </MultiSelect.Item>
              );
            })}
          </MultiSelect.List>
        </MultiSelect.Content>
      </FormMultiSelect>
    </div>
  );
};

import {
  Badge,
  BadgeColor,
  BadgeVariant,
  Form,
  MultiSelect,
} from '@intlayer/design-system';
import type { FC } from 'react';

interface UserFormFieldsProps {
  formLabels: any;
  organizations: any[];
  isLastMemberInOrg: (orgId: string) => boolean;
  getOrganizationName: (value: string) => string;
}

export const UserFormFields: FC<UserFormFieldsProps> = ({
  formLabels,
  organizations,
  isLastMemberInOrg,
  getOrganizationName,
}) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <Form.Input
      name="name"
      id="user-edit-name-input"
      label={formLabels.name.value}
      placeholder={formLabels.namePlaceholder.value}
      isRequired
    />

    <Form.Input
      name="email"
      type="email"
      id="user-edit-email-input"
      label={formLabels.email.value}
      placeholder={formLabels.emailPlaceholder.value}
      isRequired
    />

    <Form.MultiSelect
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
                      variant={BadgeVariant.OUTLINE}
                      color={BadgeColor.DESTRUCTIVE}
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
    </Form.MultiSelect>
  </div>
);

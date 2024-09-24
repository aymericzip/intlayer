import type { FC } from 'react';

type RequiredStarProps = {
  isRequired?: boolean;
};

export const RequiredStar: FC<RequiredStarProps> = ({ isRequired }) =>
  isRequired ? (
    <span aria-label="Asterisk meaning the field is required">*</span>
  ) : (
    <></>
  );

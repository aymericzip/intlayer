import { OrganizationModel } from '@models/organization.model';
import { UserModel } from '@models/user.model';
import type { Organization } from '@schemas/organization.type';
import type { User } from '@schemas/user.type';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import { getOrganizationFiltersAndPagination } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import type { UserFilters } from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import { logger } from '@/logger';

export const getUsers = async (
  req: Request<FiltersAndPagination<UserFilters>>,
  res: Response
) => {
  // Get the filters and pagination from the request
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  // Get the organizations from the database
  const organizations = await OrganizationModel.find(filters)
    .skip(skip)
    .limit(pageSize);

  // Get the total number of organizations
  const totalItems = await OrganizationModel.countDocuments(filters);

  // Return the formatted organization
  return res.status(200).json({
    success: true,
    data: organizations,
    page,
    page_size: pageSize,
    total_pages: getNumberOfPages(totalItems),
    total_items: totalItems,
  });
};

export const updatePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  let user: User | undefined = res.locals.user;
  const organization: Organization | undefined = res.locals.organization;

  if (!!user && organization) {
    try {
      if (newPassword != '') {
        user = await UserModel.changePassword(
          user._id,
          oldPassword,
          newPassword
        );
        // await mailController.passwordChanged(user, organization);

        logger.info(
          `Password changed - User : Firstname : ${user.firstname}, Lastname : ${user.lastname}, id : ${user._id} `
        );

        if (user) res.status(200).json(user);
        else res.sendStatus(500);
      }
    } catch (err) {
      logger.error(err);
      return res.status(403).json({ erreur: err });
    }
  } else return res.sendStatus(404);
};

export const updateUser = async (req: Request, res: Response) => {
  const { phone, dateOfBirth } = req.body;
  const user = res.locals.user;

  if (user) {
    if (phone) user.phone = phone;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;

    await user.save();

    logger.info(
      `User updated : Firstname : ${user.firstname}, Lastname : ${user.lastname}, id : ${user._id} `
    );

    return res.status(200).json(user);
  } else return res.sendStatus(404);
};

const activeUser = async (user: User) => {
  return await UserModel.updateOne(
    { _id: user._id },
    {
      $set: {
        emailValidated: true,
      },
    }
  );
};

export const validEmail = async (req: Request, res: Response) => {
  const userId = req.params.userId as unknown as User['_id'];
  const secret = req.params.secret as unknown as string;
  const organization: Organization | undefined = res.locals.organization;

  if (organization && Types.ObjectId.isValid(userId.toString())) {
    const user = await UserModel.findById(userId);

    if (user && secret && user.secret === secret) {
      user.emailValidated = true;
      await user.save();

      await activeUser(user);

      logger.info(
        `Email validated - User : Firstname : ${user.firstname}, Lastname : ${user.lastname}, id : ${user._id} `
      );

      return res.status(200).json(user);
    } else return res.sendStatus(404);
  } else return res.sendStatus(404);
};

const makeSecret = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const askResetPassword = async (req: Request, res: Response) => {
  const organization: Organization | undefined = res.locals.organization;

  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user && organization) {
      user.secret = makeSecret(35);
      await user.save();

      // await mailController.resetPassword(user, organization);

      logger.info(
        `Ask changing password - User : Firstname : ${user.firstname}, Lastname : ${user.lastname}, id : ${user._id} `
      );

      res.status(200).json({ emailState: 'Email envoyé', user: user._id });
    } else {
      res.status(200).json({ emailState: 'Email incorrect', user: 'none' });
    }
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const userId = req.params.userId as unknown as User['_id'];
  const secret: string = req.params.secret;
  const password: string = req.body.password;
  const organization: Organization | undefined = res.locals.organization;

  if (!(Types.ObjectId.isValid(userId.toString()) && organization))
    res.sendStatus(404);
  else if (!secret) return res.status(400);
  else {
    try {
      const user = await UserModel.findById(userId);

      if (user) {
        if (secret != user.secret) return res.sendStatus(404);
        else {
          await UserModel.resetPassword(user._id, password);
          logger.info(`${user._id} password changed`);
          // await mailController.passwordChanged(user, organization);
          logger.info(
            `Password changed - User : Firstname : ${user.firstname}, Lastname : ${user.lastname}, id : ${user._id} `
          );

          res.status(200).json(user);
        }
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      res
        .status(400)
        .json({ emailState: 'Not send', user: 'not created', error: err });
    }
  }
};

import { UserType } from '../../../db';

interface IUserViewModel {
  /**
   * ID курса
   */
  readonly id: number;
  /**
   * Заголовок курса
   */
  readonly userName: string;
}

export class UserViewModel implements IUserViewModel {
  /**
   * ID пользователя
   */
  public id: number;
  /**
   * Имя пользователя
   */
  public userName: string;

  public constructor(course: UserType) {
    this.id = course.id;
    this.userName = course.userName;
  }
}
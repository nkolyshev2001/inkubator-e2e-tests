import { CourseType, UserCourseBindingsType, UserType } from '../../../db';

interface IUserCourseBindingViewModel {
  /**
   * ID пользователя
   */
  userId: number;
  /**
   * ID курса
   */
  courseId: number;
  /**
   * Дата создания
   */
  date: Date;
  /**
   * Имя пользователя
   */
  userName: string;
  /**
   * Название курса
   */
  courseTitle: string;
}

export class UserCourseBindingViewModel implements IUserCourseBindingViewModel {
  /**
   * ID пользователя
   */
  public userId: number;
  /**
   * ID курса
   */
  public courseId: number;
  /**
   * Дата создания
   */
  public date: Date;
  /**
   * Имя пользователя
   */
  public userName: string;
  /**
   * Название курса
   */
  public courseTitle: string;

  public constructor(
    userCourseBinding: UserCourseBindingsType,
    user: UserType,
    course: CourseType
  ) {
    this.userId = userCourseBinding.userId;
    this.courseId = userCourseBinding.courseId;
    this.date = userCourseBinding.date;
    this.userName = user.userName;
    this.courseTitle = course.title;
  }
}
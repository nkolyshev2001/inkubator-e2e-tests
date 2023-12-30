import { CourseType } from '../../../db';

interface ICourseViewModel {
  /**
   * ID курса
   */
  readonly id: number;
  /**
   * Заголовок курса
   */
  readonly title: string;
}

export class CourseViewModel implements ICourseViewModel {
  /**
   * ID курса
   */
  public id: number;
  /**
   * Заголовок курса
   */
  public title: string;

  public constructor(course: CourseType) {
    this.id = course.id;
    this.title = course.title;
  }
}